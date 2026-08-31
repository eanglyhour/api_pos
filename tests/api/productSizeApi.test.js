const request = require("supertest");

const app = require("../../app");

require("./setup");

const Product = require("../../app/models/productModel");
const ProductSize = require("../../app/models/productSizeModel");

describe("Product Size API", () => {

  let product;


  beforeEach(async () => {

    product = await Product.create({
      category_id: "66c123456789abcdef123456",
      name: "Basic T-Shirt"
    });

  });


  // CREATE SIZE
  test("POST /api/product-sizes", async () => {

    const response = await request(app)
      .post("/api/product-sizes")
      .send({
        product_id: product._id,
        size: "M",
        const_price: 5,
        sell_price: 8,
        stock: 20
      });

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data.size)
      .toBe("M");

    expect(response.body.data.const_price)
      .toBe(5);

    expect(response.body.data.sell_price)
      .toBe(8);

    expect(response.body.data.stock)
      .toBe(20);
  });


  // GET ALL
  test("GET /api/product-sizes", async () => {

    await ProductSize.create([
      {
        product_id: product._id,
        size: "S",
        const_price: 4,
        sell_price: 7,
        stock: 10
      },
      {
        product_id: product._id,
        size: "M",
        const_price: 5,
        sell_price: 8,
        stock: 20
      }
    ]);

    const response = await request(app)
      .get("/api/product-sizes");

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data)
      .toHaveLength(2);

    expect(response.body.data[0].const_price)
      .toBeDefined();

    expect(response.body.data[0].sell_price)
      .toBeDefined();
  });


  // GET BY ID
  test("GET /api/product-sizes/:id", async () => {

    const size = await ProductSize.create({
      product_id: product._id,
      size: "L",
      const_price: 6,
      sell_price: 9,
      stock: 20
    });

    const response = await request(app)
      .get(`/api/product-sizes/${size._id}`);

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data.size)
      .toBe("L");

    expect(response.body.data.const_price)
      .toBe(6);

    expect(response.body.data.sell_price)
      .toBe(9);

    expect(response.body.data.stock)
      .toBe(20);
  });


  // UPDATE
  test("PUT /api/product-sizes/:id", async () => {

    const size = await ProductSize.create({
      product_id: product._id,
      size: "M",
      const_price: 5,
      sell_price: 8,
      stock: 20
    });

    const response = await request(app)
      .put(`/api/product-sizes/${size._id}`)
      .send({
        size: "M",
        const_price: 6,
        sell_price: 10,
        stock: 50
      });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data.size)
      .toBe("M");

    expect(response.body.data.const_price)
      .toBe(6);

    expect(response.body.data.sell_price)
      .toBe(10);

    expect(response.body.data.stock)
      .toBe(50);
  });


  // DELETE
  test("DELETE /api/product-sizes/:id", async () => {

    const size = await ProductSize.create({
      product_id: product._id,
      size: "M",
      const_price: 5,
      sell_price: 8,
      stock: 20
    });

    const response = await request(app)
      .delete(`/api/product-sizes/${size._id}`);

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    const deleted =
      await ProductSize.findById(size._id);

    expect(deleted)
      .toBeNull();
  });


  // DUPLICATE SIZE
  test("POST duplicate size should fail", async () => {

    await ProductSize.create({
      product_id: product._id,
      size: "M",
      const_price: 5,
      sell_price: 8,
      stock: 20
    });

    const response = await request(app)
      .post("/api/product-sizes")
      .send({
        product_id: product._id,
        size: "M",
        const_price: 6,
        sell_price: 9,
        stock: 30
      });

    expect(response.statusCode)
      .toBe(400);

    expect(response.body.message)
      .toBe("This size already exists");
  });


  // INVALID PRICE
  test("POST size with sell_price lower than const_price should fail", async () => {

    const response = await request(app)
      .post("/api/product-sizes")
      .send({
        product_id: product._id,
        size: "XL",
        const_price: 10,
        sell_price: 8,
        stock: 20
      });

    expect(response.statusCode)
      .toBe(400);

    expect(response.body.success)
      .toBe(false);
  });

});