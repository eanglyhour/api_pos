const ProductSize =
  require("../../app/models/productSizeModel");

const Product =
  require("../../app/models/productModel");

const ProductSizeController =
  require("../../app/controllers/ProductSizeController");

jest.mock("../../app/models/productSizeModel");
jest.mock("../../app/models/productModel");


describe("ProductSizeController Unit Test", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  // CREATE
  test("create product size", async () => {

    const req = {
      body: {
        product_id: "product123",
        size: "M",
        const_price: 5,
        sell_price: 8,
        stock: 20
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };


    Product.findById.mockResolvedValue({
      _id: "product123"
    });


    ProductSize.findOne.mockResolvedValue(null);


    ProductSize.create.mockResolvedValue({
      _id: "size123",
      product_id: "product123",
      size: "M",
      const_price: 5,
      sell_price: 8,
      stock: 20
    });


    await ProductSizeController.create(
      req,
      res
    );


    expect(Product.findById)
      .toHaveBeenCalledWith("product123");


    expect(ProductSize.findOne)
      .toHaveBeenCalledWith({
        product_id: "product123",
        size: "M"
      });


    expect(ProductSize.create)
      .toHaveBeenCalledWith({
        product_id: "product123",
        size: "M",
        const_price: 5,
        sell_price: 8,
        stock: 20
      });


    expect(res.status)
      .toHaveBeenCalledWith(201);


    const result =
      res.json.mock.calls[0][0];

    expect(result.success)
      .toBe(true);

    expect(result.data.const_price)
      .toBe(5);

    expect(result.data.sell_price)
      .toBe(8);
  });


  // DUPLICATE
  test("duplicate size should return 400", async () => {

    const req = {
      body: {
        product_id: "product123",
        size: "M",
        const_price: 5,
        sell_price: 8,
        stock: 20
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };


    Product.findById.mockResolvedValue({
      _id: "product123"
    });


    ProductSize.findOne.mockResolvedValue({
      _id: "existingSize"
    });


    await ProductSizeController.create(
      req,
      res
    );


    expect(res.status)
      .toHaveBeenCalledWith(400);


    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "This size already exists"
      });


    expect(ProductSize.create)
      .not.toHaveBeenCalled();
  });


  // INVALID PRICE
  test("sell price lower than cost price should return 400", async () => {

    const req = {
      body: {
        product_id: "product123",
        size: "L",
        const_price: 10,
        sell_price: 8,
        stock: 20
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };


    Product.findById.mockResolvedValue({
      _id: "product123"
    });


    ProductSize.findOne.mockResolvedValue(null);


    await ProductSizeController.create(
      req,
      res
    );


    expect(res.status)
      .toHaveBeenCalledWith(400);


    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message:
          "sell_price must be greater than or equal to const_price"
      });


    expect(ProductSize.create)
      .not.toHaveBeenCalled();
  });


  // UPDATE
  test("update product size", async () => {

    const req = {
      params: {
        id: "size123"
      },

      body: {
        size: "L",
        const_price: 6,
        sell_price: 9,
        stock: 50
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };


    // Used by duplicate-size checking
    ProductSize.findById.mockResolvedValue({
      _id: "size123",
      product_id: "product123"
    });


    ProductSize.findOne.mockResolvedValue(null);


    ProductSize.findByIdAndUpdate
      .mockResolvedValue({
        _id: "size123",
        product_id: "product123",
        size: "L",
        const_price: 6,
        sell_price: 9,
        stock: 50
      });


    await ProductSizeController.update(
      req,
      res
    );


    expect(ProductSize.findByIdAndUpdate)
      .toHaveBeenCalledWith(
        "size123",
        {
          size: "L",
          const_price: 6,
          sell_price: 9,
          stock: 50
        },
        {
          new: true,
          runValidators: true
        }
      );


    expect(res.json)
      .toHaveBeenCalled();


    const result =
      res.json.mock.calls[0][0];


    expect(result.success)
      .toBe(true);


    expect(result.message)
      .toBe("Product size updated successfully");


    expect(result.data.size)
      .toBe("L");


    expect(result.data.const_price)
      .toBe(6);


    expect(result.data.sell_price)
      .toBe(9);


    expect(result.data.stock)
      .toBe(50);
  });


  // DELETE
  test("delete product size", async () => {

    const req = {
      params: {
        id: "size123"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };


    ProductSize.findByIdAndDelete
      .mockResolvedValue({
        _id: "size123"
      });


    await ProductSizeController.delete(
      req,
      res
    );


    expect(ProductSize.findByIdAndDelete)
      .toHaveBeenCalledWith("size123");


    expect(res.json)
      .toHaveBeenCalled();


    const result =
      res.json.mock.calls[0][0];


    expect(result.success)
      .toBe(true);


    expect(result.message)
      .toBe("Product size deleted successfully");
  });

});