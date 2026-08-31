const Product = require("../../app/models/productModel");
const ProductSize = require("../../app/models/productSizeModel");

const ProductController =
  require("../../app/controllers/ProductController");

jest.mock("../../app/models/productModel");
jest.mock("../../app/models/productSizeModel");


describe("ProductController Unit Test", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  // CREATE
  test("create product", async () => {

    const req = {
      body: {
        category_id: "category123",
        name: "Basic T-Shirt"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Product.create.mockResolvedValue({
      _id: "product123",
      category_id: "category123",
      name: "Basic T-Shirt"
    });

    await ProductController.create(req, res);

    expect(Product.create)
      .toHaveBeenCalledWith({
        category_id: "category123",
        name: "Basic T-Shirt"
      });

    expect(res.status)
      .toHaveBeenCalledWith(201);

    expect(res.json)
      .toHaveBeenCalled();

    const result =
      res.json.mock.calls[0][0];

    expect(result.success)
      .toBe(true);

    expect(result.data.name)
      .toBe("Basic T-Shirt");
  });


  // GET BY ID
  test("get product by id", async () => {

    const req = {
      params: {
        id: "product123"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Product.findById.mockReturnValue({
      populate: jest.fn().mockReturnThis(),

      lean: jest.fn().mockResolvedValue({
        _id: "product123",
        name: "Basic T-Shirt"
      })
    });

    ProductSize.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([
        {
          size: "S",
          const_price: 4,
          sell_price: 7,
          stock: 10
        },
        {
          size: "M",
          const_price: 5,
          sell_price: 8,
          stock: 20
        },
        {
          size: "L",
          const_price: 6,
          sell_price: 9,
          stock: 20
        }
      ])
    });

    await ProductController.getById(req, res);

    expect(Product.findById)
      .toHaveBeenCalledWith("product123");

    expect(ProductSize.find)
      .toHaveBeenCalledWith({
        product_id: "product123"
      });

    expect(res.json)
      .toHaveBeenCalled();

    const result =
      res.json.mock.calls[0][0];

    expect(result.success)
      .toBe(true);

    expect(result.data.name)
      .toBe("Basic T-Shirt");

    expect(result.data.sizes)
      .toHaveLength(3);

    expect(result.data.sizes[0].const_price)
      .toBe(4);

    expect(result.data.sizes[0].sell_price)
      .toBe(7);

    expect(result.data.total_stock)
      .toBe(50);
  });


  // UPDATE
  test("update product", async () => {

    const req = {
      params: {
        id: "product123"
      },

      body: {
        category_id: "category123",
        name: "Premium T-Shirt"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Product.findByIdAndUpdate.mockResolvedValue({
      _id: "product123",
      category_id: "category123",
      name: "Premium T-Shirt"
    });

    await ProductController.update(req, res);

    expect(Product.findByIdAndUpdate)
      .toHaveBeenCalledWith(
        "product123",
        {
          category_id: "category123",
          name: "Premium T-Shirt"
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
      .toBe("Product updated successfully");

    expect(result.data.name)
      .toBe("Premium T-Shirt");
  });


  // DELETE
  test("delete product", async () => {

    const req = {
      params: {
        id: "product123"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Product.findByIdAndDelete.mockResolvedValue({
      _id: "product123"
    });

    ProductSize.deleteMany.mockResolvedValue({
      deletedCount: 3
    });

    await ProductController.delete(req, res);

    expect(Product.findByIdAndDelete)
      .toHaveBeenCalledWith("product123");

    expect(ProductSize.deleteMany)
      .toHaveBeenCalledWith({
        product_id: "product123"
      });

    expect(res.json)
      .toHaveBeenCalled();

    const result =
      res.json.mock.calls[0][0];

    expect(result.success)
      .toBe(true);

    expect(result.message)
      .toBe("Product deleted successfully");
  });

});