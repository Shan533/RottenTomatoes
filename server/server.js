const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const usersRoute = require("./routes/usersRoute");
const schoolsRoute = require("./routes/schoolsRoute");
const imagesRoute = require("./routes/imagesRoute");
const programsRoute = require("./routes/programsRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const filtersRoute = require("./routes/filtersRoute");
const oauthRoute = require("./routes/oauthRoute");

app.use("/api/users", usersRoute);
app.use("/api/schools", schoolsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/programs", programsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/filters", filtersRoute);
app.use("/api/oauth", oauthRoute);

const port = process.env.PORT || 8000;

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Node JS Server started on port ${port}`));
