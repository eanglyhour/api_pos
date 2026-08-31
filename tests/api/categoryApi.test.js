const request = require("supertest");

const app = require("../../app");

require("./setup");

const Category =
  require("../../app/models/categoryModel");

jest.mock("../../app/models/categoryModel");


describe("Category API Test", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  // GET ALL
  test("GET /api/categories", async () => {

    const mockData = [
      {
        _id: "1",
        name: "Electronics",
        description: "Electronic products",
        status: true
      }
    ];

    Category.find.mockResolvedValue(mockData);

    const response =
      await request(app)
        .get("/api/categories");

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data)
      .toEqual(mockData);
  });


  // GET BY ID
  test("GET /api/categories/:id", async () => {

    const mockCategory = {
      _id: "1",
      name: "Electronics",
      description: "Electronic products",
      status: true
    };

    Category.findById
      .mockResolvedValue(mockCategory);

    const response =
      await request(app)
        .get("/api/categories/1");

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.data)
      .toEqual(mockCategory);
  });


  // POST
  test("POST /api/categories", async () => {

    const data = {
      name: "Food",
      description: "Food products",
      status: true
    };

    const created = {
      _id: "2",
      ...data
    };

    Category.create
      .mockResolvedValue(created);

    const response =
      await request(app)
        .post("/api/categories")
        .send(data);

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.data)
      .toEqual(created);
  });


  // POST VALIDATION
  test("POST without name", async () => {

    const response =
      await request(app)
        .post("/api/categories")
        .send({
          description: "Food products"
        });

    expect(response.statusCode)
      .toBe(400);

    expect(response.body.success)
      .toBe(false);
  });


  // PUT
  test("PUT /api/categories/:id", async () => {

    const data = {
      name: "Computer",
      description: "Computer products",
      status: true
    };

    const updated = {
      _id: "1",
      ...data
    };

    Category.findByIdAndUpdate
      .mockResolvedValue(updated);

    const response =
      await request(app)
        .put("/api/categories/1")
        .send(data);

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.data)
      .toEqual(updated);
  });


  // DELETE
  test("DELETE /api/categories/:id", async () => {

    const deleted = {
      _id: "1",
      name: "Computer"
    };

    Category.findByIdAndDelete
      .mockResolvedValue(deleted);

    const response =
      await request(app)
        .delete("/api/categories/1");

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);
  });


  // NOT FOUND
  test("GET non-existing category", async () => {

    Category.findById
      .mockResolvedValue(null);

    const response =
      await request(app)
        .get("/api/categories/999");

    expect(response.statusCode)
      .toBe(404);

    expect(response.body.success)
      .toBe(false);
  });

});