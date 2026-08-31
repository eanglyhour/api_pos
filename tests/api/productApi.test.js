const request = require("supertest");

const app = require("../../app");

require("./setup");

const Product = require("../../app/models/productModel");
const ProductSize = require("../../app/models/productSizeModel");

describe("Product API", () => {

  let categoryId;

  beforeEach(() => {
    categoryId = "66c123456789abcdef123456";
  });


  // CREATE
  test("POST /api/products - create product", async () => {

    const response = await request(app)
      .post("/api/products")
      .send({
        category_id: categoryId,
        name: "Basic T-Shirt"
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.name)
      .toBe("Basic T-Shirt");

    expect(response.body.data.category_id)
      .toBe(categoryId);
  });


  // GET ALL
  test("GET /api/products - get products", async () => {

    await Product.create({
      category_id: categoryId,
      name: "Basic T-Shirt"
    });

    const response = await request(app)
      .get("/api/products");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data)
      .toHaveLength(1);
  });


  // GET BY ID
  test("GET /api/products/:id - get product", async () => {

    const product = await Product.create({
      category_id: categoryId,
      name: "Basic T-Shirt"
    });

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
      },
      {
        product_id: product._id,
        size: "L",
        const_price: 6,
        sell_price: 9,
        stock: 20
      }
    ]);

    const response = await request(app)
      .get(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data.name)
      .toBe("Basic T-Shirt");

    expect(response.body.data.sizes)
      .toHaveLength(3);

    expect(response.body.data.total_stock)
      .toBe(50);

    // Check size price
    expect(response.body.data.sizes[0].const_price)
      .toBe(4);

    expect(response.body.data.sizes[0].sell_price)
      .toBe(7);
  });


  // UPDATE
  test("PUT /api/products/:id - update product", async () => {

    const product = await Product.create({
      category_id: categoryId,
      name: "Basic T-Shirt"
    });

    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send({
        category_id: categoryId,
        name: "Premium T-Shirt"
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.data.name)
      .toBe("Premium T-Shirt");
  });


  // DELETE
  test("DELETE /api/products/:id - delete product", async () => {

    const product = await Product.create({
      category_id: categoryId,
      name: "Basic T-Shirt"
    });

    await ProductSize.create({
      product_id: product._id,
      size: "M",
      const_price: 5,
      sell_price: 8,
      stock: 20
    });

    const response = await request(app)
      .delete(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success)
      .toBe(true);

    const deletedProduct =
      await Product.findById(product._id);

    expect(deletedProduct)
      .toBeNull();

    const sizes =
      await ProductSize.find({
        product_id: product._id
      });

    expect(sizes)
      .toHaveLength(0);
  });


  // NOT FOUND
  test("GET /api/products/:id - product not found", async () => {

    const fakeId =
      "66c123456789abcdef123456";

    const response = await request(app)
      .get(`/api/products/${fakeId}`);

    expect(response.statusCode)
      .toBe(404);

    expect(response.body.success)
      .toBe(false);
  });

});