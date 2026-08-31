const Permission = require("../models/Permission");

const methodAction = {
  GET: "read",
  POST: "create",
  PUT: "update",
  PATCH: "update",
  DELETE: "delete",
};

const autoPermission = async (app) => {
  const routes = app.locals.apiRoutes || [];

  const permissions = new Set();

  for (const [basePath, router] of routes) {
    const resource = basePath
      .replace(/^\/api\//, "")
      .split("/")[0]
      .replace(/-/g, "_");

    if (!resource) {
      continue;
    }

    const stack = router.stack || [];

    for (const layer of stack) {
      if (!layer.route) {
        continue;
      }

      const routePath = layer.route.path;

      for (const method of Object.keys(layer.route.methods)) {
        const httpMethod = method.toUpperCase();

        if (httpMethod === "GET") {
          let action = "read";

          if (routePath.startsWith("/role/")) {
            action = "read_by_role";
          } else if (routePath.startsWith("/permission/")) {
            action = "read_by_permission";
          }

          permissions.add(`${resource}.${action}`);
          continue;
        }

        const action = methodAction[httpMethod];

        if (!action) {
          continue;
        }

        permissions.add(`${resource}.${action}`);
      }
    }
  }

  for (const permissionName of permissions) {
    const [resource, action] = permissionName.split(".");

    await Permission.findOneAndUpdate(
      {
        name: permissionName,
      },
      {
        $setOnInsert: {
          name: permissionName,
          description: `${action} ${resource}`,
          status: true,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  }

  console.log(`Permissions initialized: ${permissions.size}`);
  console.log([...permissions].sort());
};

module.exports = autoPermission;