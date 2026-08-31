const Payment = require("../models/Payment");
const Order = require("../models/Order");
const Invoice = require("../models/Invoice");

const bakongConfig = require("../config/bakong");

const {
  BakongKHQR,
  IndividualInfo,
  khqrData
} = require("bakong-khqr");

const createPayment = async (req, res) => {
  try {
    const { invoice_id } = req.body;

    if (!invoice_id) {
      return res.status(400).json({
        success: false,
        message: "invoice_id is required"
      });
    }

    const invoice = await Invoice.findById(invoice_id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    if (invoice.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Invoice already paid"
      });
    }

    const order = await Order.findById(invoice.order_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.payment_status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid"
      });
    }

    const paymentAmount = Number(invoice.total);

    if (
      !Number.isFinite(paymentAmount) ||
      paymentAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice total"
      });
    }

    const paymentCurrency =
      String(
        req.body.currency || "KHR"
      )
        .trim()
        .toUpperCase();

    if (
      paymentCurrency !== "KHR" &&
      paymentCurrency !== "USD"
    ) {
      return res.status(400).json({
        success: false,
        message: "Currency must be KHR or USD"
      });
    }

    const existingPayment =
      await Payment.findOne({
        invoice_id: invoice._id,
        status: "pending"
      });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Pending payment already exists",
        data: {
          payment_id: existingPayment._id,
          invoice_id: existingPayment.invoice_id,
          order_id: existingPayment.order_id,
          amount: existingPayment.amount,
          currency: existingPayment.currency,
          payment_method:
            existingPayment.payment_method,
          md5: existingPayment.md5,
          status: existingPayment.status
        }
      });
    }

    const khqr = generateKHQR(
      paymentAmount,
      paymentCurrency
    );

    const qr = khqr.qr;

    const md5 =
      String(khqr.md5).toLowerCase();

    const duplicatePayment =
      await Payment.findOne({ md5 });

    if (duplicatePayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already exists",
        data: {
          payment_id:
            duplicatePayment._id,

          invoice_id:
            duplicatePayment.invoice_id,

          order_id:
            duplicatePayment.order_id,

          amount:
            duplicatePayment.amount,

          currency:
            duplicatePayment.currency,

          payment_method:
            duplicatePayment.payment_method,

          md5:
            duplicatePayment.md5,

          qr,

          status:
            duplicatePayment.status
        }
      });
    }

    const payment =
      await Payment.create({
        invoice_id: invoice._id,

        order_id: order._id,

        payment_method: "KHQR",

        amount: paymentAmount,

        md5,

        status: "pending",

        currency: paymentCurrency
      });

    return res.status(201).json({
      success: true,
      message: "Payment created",
      data: {
        payment_id:
          payment._id,

        invoice_id:
          payment.invoice_id,

        order_id:
          payment.order_id,

        amount:
          payment.amount,

        currency:
          payment.currency,

        payment_method:
          payment.payment_method,

        recipient:
          String(
            bakongConfig.accountId
          ),

        md5:
          payment.md5,

        qr,

        status:
          payment.status
      }
    });

  } catch (error) {
    console.error(
      "Create payment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { md5 } = req.body;

    if (!md5) {
      return res.status(400).json({
        success: false,
        message: "md5 is required"
      });
    }

    const cleanMd5 =
      String(md5)
        .trim()
        .toLowerCase();

    const payment =
      await Payment.findOne({
        md5: cleanMd5
      });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        data: {
          payment_id:
            payment._id,

          invoice_id:
            payment.invoice_id,

          order_id:
            payment.order_id,

          amount:
            payment.amount,

          currency:
            payment.currency,

          payment_method:
            payment.payment_method,

          transaction_id:
            payment.transaction_id,

          transaction_hash:
            payment.transaction_hash,

          from_account_id:
            payment.from_account_id,

          to_account_id:
            payment.to_account_id,

          status:
            "paid"
        }
      });
    }

    const apiUrl =
      String(
        bakongConfig.apiUrl
      ).replace(/\/+$/, "");

    const response =
      await fetch(
        `${apiUrl}/v1/check_transaction_by_md5`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${String(
                bakongConfig.token || ""
              )}`
          },

          body: JSON.stringify({
            md5: payment.md5
          })
        }
      );

    const result =
      await response.json();

    console.log(
      "Bakong verify response:",
      JSON.stringify(
        result,
        null,
        2
      )
    );

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message:
          "Bakong verification failed",
        data: result
      });
    }

    const bakong =
      result.response?.data ||
      result.data ||
      result.response ||
      {};

    const responseCode =
      Number(
        bakong.responseCode ?? 1
      );

    if (responseCode !== 0) {
      return res.status(200).json({
        success: false,
        message:
          bakong.responseMessage ||
          "Payment not completed",

        status:
          "pending",

        data:
          bakong
      });
    }

    const transaction =
      bakong.data || null;

    if (!transaction) {
      return res.status(200).json({
        success: false,
        message:
          "Transaction data not found",

        status:
          "pending"
      });
    }

    const paidAmount =
      Number(
        transaction.amount || 0
      );

    const expectedAmount =
      Number(
        payment.amount
      );

    if (
      paidAmount.toFixed(2) !==
      expectedAmount.toFixed(2)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment amount mismatch",

        expected:
          expectedAmount,

        received:
          paidAmount
      });
    }

    const transactionId =
      transaction.transactionId ||
      transaction.transaction_id ||
      transaction.hash ||
      transaction.transactionHash ||
      null;

    const transactionHash =
      transaction.hash ||
      transaction.transactionHash ||
      transactionId ||
      null;

    const fromAccount =
      transaction.fromAccountId ||
      transaction.from_account_id ||
      "";

    const toAccount =
      transaction.toAccountId ||
      transaction.to_account_id ||
      String(
        bakongConfig.accountId
      );

    payment.status = "paid";

    payment.transaction_id =
      transactionId;

    payment.transaction_hash =
      transactionHash;

    payment.from_account_id =
      fromAccount;

    payment.to_account_id =
      toAccount;

    payment.payment_date =
      new Date();

    await payment.save();

    await Order.findByIdAndUpdate(
      payment.order_id,
      {
        payment_status: "paid",
        status: "confirmed"
      },
      {
        new: true
      }
    );

    await Invoice.findByIdAndUpdate(
      payment.invoice_id,
      {
        status: "paid"
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",

      data: {
        payment_id:
          payment._id,

        invoice_id:
          payment.invoice_id,

        order_id:
          payment.order_id,

        amount:
          paidAmount,

        currency:
          transaction.currency ||
          payment.currency,

        payment_method:
          payment.payment_method,

        transaction_id:
          transactionId,

        transaction_hash:
          transactionHash,

        from_account_id:
          fromAccount,

        to_account_id:
          toAccount,

        status:
          "paid"
      }
    });

  } catch (error) {
    console.error(
      "Verify payment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const generateKHQR = (
  amount,
  currency
) => {

  const khqrCurrency =
    currency === "USD"
      ? khqrData.currency.usd
      : khqrData.currency.khr;

  const billNumber =
    "PAY-" +
    Date.now() +
    "-" +
    Math.floor(
      100 +
      Math.random() * 900
    );

  const optionalData = {
    currency:
      khqrCurrency,

    amount:
      Number(amount),

    billNumber,

    storeLabel:
      "POS Store",

    terminalLabel:
      "Counter 1",

    expirationTimestamp:
      Date.now() +
      10 * 60 * 1000
  };

  const individualInfo =
    new IndividualInfo(
      String(
        bakongConfig.accountId
      ),

      String(
        bakongConfig.merchantName
      ),

      String(
        bakongConfig.city
      ),

      optionalData
    );

  console.log(
    "KHQR config:",
    {
      accountId:
        bakongConfig.accountId,

      merchantName:
        bakongConfig.merchantName,

      merchantCity:
        bakongConfig.city,

      currency,

      amount
    }
  );

  const khqr =
    new BakongKHQR();

  const response =
    khqr.generateIndividual(
      individualInfo
    );

  console.log(
    "KHQR response:",
    response
  );

  if (!response) {
    throw new Error(
      "KHQR response is empty"
    );
  }

  if (
    response.status &&
    Number(
      response.status.code
    ) !== 0
  ) {
    throw new Error(
      response.status.message ||
      "KHQR generation failed"
    );
  }

  const qr =
    response.data?.qr;

  const md5 =
    response.data?.md5;

  if (!qr) {
    throw new Error(
      "KHQR QR code was not generated"
    );
  }

  if (!md5) {
    throw new Error(
      "KHQR MD5 was not generated"
    );
  }

  return {
    qr,

    md5:
      String(md5)
        .toLowerCase()
  };
};

module.exports = {
  createPayment,
  verifyPayment
};