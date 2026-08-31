const Category =
  require("../../app/models/categoryModel");

const CategoryController =
  require("../../app/controllers/CategoryController");

jest.mock("../../app/models/categoryModel");


describe("CategoryController Unit Test", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  // GET ALL
  test("get all categories", async () => {

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockData = [
      {
        _id: "1",
        name: "Electronics",
        description: "Electronic products",
        status: true
      }
    ];

    Category.find
      .mockResolvedValue(mockData);

    await CategoryController.getAll(
      req,
      res
    );

    expect(Category.find)
      .toHaveBeenCalledTimes(1);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        data: mockData
      });
  });


  // GET BY ID
  test("get category by id", async () => {

    const req = {
      params: {
        id: "1"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockCategory = {
      _id: "1",
      name: "Electronics",
      description: "Electronic products",
      status: true
    };

    Category.findById
      .mockResolvedValue(mockCategory);

    await CategoryController.getById(
      req,
      res
    );

    expect(Category.findById)
      .toHaveBeenCalledWith("1");

    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        data: mockCategory
      });
  });


  // NOT FOUND
  test("get category by id - not found", async () => {

    const req = {
      params: {
        id: "999"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Category.findById
      .mockResolvedValue(null);

    await CategoryController.getById(
      req,
      res
    );

    expect(Category.findById)
      .toHaveBeenCalledWith("999");

    expect(res.status)
      .toHaveBeenCalledWith(404);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "Category not found"
      });
  });


  // CREATE
  test("create category", async () => {

    const req = {
      body: {
        name: "Food",
        description: "Food products",
        status: true
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockCategory = {
      _id: "2",
      name: "Food",
      description: "Food products",
      status: true
    };

    Category.create
      .mockResolvedValue(mockCategory);

    await CategoryController.create(
      req,
      res
    );

    expect(Category.create)
      .toHaveBeenCalledWith({
        name: "Food",
        description: "Food products",
        status: true
      });

    expect(res.status)
      .toHaveBeenCalledWith(201);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        data: mockCategory
      });
  });


  // CREATE VALIDATION
  test("create category without name", async () => {

    const req = {
      body: {
        description: "Food products",
        status: true
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await CategoryController.create(
      req,
      res
    );

    expect(res.status)
      .toHaveBeenCalledWith(400);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "Name is required"
      });

    expect(Category.create)
      .not.toHaveBeenCalled();
  });


  // UPDATE
  test("update category", async () => {

    const req = {
      params: {
        id: "1"
      },

      body: {
        name: "Computer",
        description: "Computer products",
        status: true
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const updatedCategory = {
      _id: "1",
      name: "Computer",
      description: "Computer products",
      status: true
    };

    Category.findByIdAndUpdate
      .mockResolvedValue(updatedCategory);

    await CategoryController.update(
      req,
      res
    );

    expect(Category.findByIdAndUpdate)
      .toHaveBeenCalledWith(
        "1",
        {
          name: "Computer",
          description: "Computer products",
          status: true
        },
        {
          new: true,
          runValidators: true
        }
      );

    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        data: updatedCategory
      });
  });


  // UPDATE NOT FOUND
  test("update category - not found", async () => {

    const req = {
      params: {
        id: "999"
      },

      body: {
        name: "Computer",
        description: "Computer products",
        status: true
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Category.findByIdAndUpdate
      .mockResolvedValue(null);

    await CategoryController.update(
      req,
      res
    );

    expect(res.status)
      .toHaveBeenCalledWith(404);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "Category not found"
      });
  });


  // DELETE
  test("delete category", async () => {

    const req = {
      params: {
        id: "1"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const deletedCategory = {
      _id: "1",
      name: "Electronics"
    };

    Category.findByIdAndDelete
      .mockResolvedValue(deletedCategory);

    await CategoryController.delete(
      req,
      res
    );

    expect(Category.findByIdAndDelete)
      .toHaveBeenCalledWith("1");

    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        message: "Category deleted successfully"
      });
  });


  // DELETE NOT FOUND
  test("delete category - not found", async () => {

    const req = {
      params: {
        id: "999"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Category.findByIdAndDelete
      .mockResolvedValue(null);

    await CategoryController.delete(
      req,
      res
    );

    expect(res.status)
      .toHaveBeenCalledWith(404);

    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "Category not found"
      });
  });

});