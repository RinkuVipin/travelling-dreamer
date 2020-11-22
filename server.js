const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRouter = require("./routing/places-route");
const usersRouter = require("./routing/users-route");
const HttpError = require("./models/http-error");

const url = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@cluster0.kiihp.mongodb.net/${
  process.env.DB_NAME
}?retryWrites=true&w=majority`;
const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

//CORS policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Oops! Something went Wrong.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {
      console.log("Removed the File due to some error");
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Oops! Something went wrong",
  });
});

mongoose.set("useCreateIndex", true);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => console.log(error));
