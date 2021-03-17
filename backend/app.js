const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

/* Initializations */
const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(fileUpload());

/* Routes */
app.use("/api", require("./routes/upload.routes.js"));

module.exports = app;
