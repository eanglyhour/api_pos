const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerSpec = require("./app/config/swagger");
const passport = require("./app/config/passport");

const categoryRoutes = require("./app/routes/categoryRoutes");
const productRoutes = require("./app/routes/productRoutes");
const productSizeRoutes = require("./app/routes/productSizeRoutes");
const productImageRoutes = require("./app/routes/productImageRoutes");
const orderRoutes = require("./app/routes/orderRoutes");
const orderItemRoutes = require("./app/routes/orderItemRoutes");
const invoiceRoutes = require("./app/routes/invoiceRoutes");
const paymentRoutes = require("./app/routes/paymentRoutes");
const roleRoutes = require("./app/routes/roleRoutes");
const rolePermissionRoutes = require("./app/routes/rolePermissionRoutes");
const permissionRoutes = require("./app/routes/permissionRoutes");
const authRoutes = require("./app/routes/authRoutes");

//middleware
const errorMiddleware = require("./app/middleware/error.middleware");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

const routes = [
  ["/api/auth", authRoutes],
  ["/api/categories", categoryRoutes],
  ["/api/products", productRoutes],
  ["/api/product-sizes", productSizeRoutes],
  ["/api/product-images", productImageRoutes],
  ["/api/orders", orderRoutes],
  ["/api/order-items", orderItemRoutes],
  ["/api/invoices", invoiceRoutes],
  ["/api/payments", paymentRoutes],
  ["/api/roles", roleRoutes],
  ["/api/role-permissions", rolePermissionRoutes],
  ["/api/permissions", permissionRoutes],
];

for (const [path, router] of routes) {
  app.use(path, router);
}

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.locals.apiRoutes = routes;
app.use(errorMiddleware);
module.exports = app;