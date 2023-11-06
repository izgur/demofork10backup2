/**
 * Load environment variables
 */
require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

/**
 * Swagger and OpenAPI
 */
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = swaggerJsDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Demo",
      version: "0.1.0",
      description:
        "Sports **REST API** used for [DevOps academy]",
    },
    tags: [
      {
        name: "Locations",
        description: "Recreational <b>locations</b> in Slovenia.",
      },
      {
        name: "Comments",
        description:
          "<b>Comments</b> for recreation possibilities.",
      },
      {
        name: "Authentication",
        description: "<b>User management</b> and authentication.",
      },
      {
        name: "Events",
        description: "<b>Events</b> around you.",
      },
      {
        name: "EventsComment",
        description: "<b>Comment</b> for events.",
      },
      {
        name: "Sports",
        description: "<b>Sports</b> for events.",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server for testing",
      },
      {
        url: "https://lp-izgur-web-service.onrender.com/api",
        description: "Production server",
      },
      {
        url: "https://web-dev.fly.dev/api",
        description: "Production server FRI",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Codelist: {
          type: "string",
          description:
            "Allowed values for the codelist used in filtering locations.",
          enum: [
            "category",
            "sports",
            "type",
          ],
        },
        ErrorMessage: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Message describing the error.",
            },
          },
          required: ["message"],
        },
      },
    },
  },
  apis: ["./api/models/*.js", "./api/controllers/*.js"],
});

/**
 * Database connection
 */
require("./api/models/db.js");
require("./api/config/passport");

const hbsRouter = require("./hbs/routes/hbs");
const apiRouter = require("./api/routes/api");

/**
 * Create server
 */
const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
/**
 * Static pages
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "angular")));

/**
 * Passport
 */
app.use(passport.initialize());

/**
 * Body parser (application/x-www-form-urlencoded)
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * View engine (HBS) setup
 */
app.set("views", path.join(__dirname, "hbs", "views"));
app.set("view engine", "hbs");
require("./hbs/views/helpers/hbsh.js");

/**
 * HBS routing
 */
app.use("/", hbsRouter);

/**
 * API routing
 */
app.use("/api", apiRouter);

/**
 * Swagger file and explorer
 */
apiRouter.get("/swagger.json", (req, res) =>
  res.status(200).json(swaggerDocument)
);
apiRouter.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

/**
 * Authorization error handler
 */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ message: err.message });
});

/**
 * Start server
 */
app.listen(port, () => {
  console.log(
    `Demo app started in ${
      process.env.NODE_ENV || "development"
    } mode listening on port ${port}!`
  );
});
