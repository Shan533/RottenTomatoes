const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const schoolsRoute = require("./routes/schoolsRoute");
const imagesRoute = require("./routes/imagesRoute");
const programsRoute = require("./routes/programsRoute");

app.use("/api/users", usersRoute);
app.use("/api/schools", schoolsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/programs", programsRoute);

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node JS Server started on port ${port}`));
