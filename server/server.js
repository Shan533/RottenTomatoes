const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const session = require("express-session");
const { OAuth2Client } = require('google-auth-library');

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

const usersRoute = require("./routes/usersRoute");
const schoolsRoute = require("./routes/schoolsRoute");
const imagesRoute = require("./routes/imagesRoute");
const programsRoute = require("./routes/programsRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const filtersRoute = require("./routes/filtersRoute");

app.use("/api/users", usersRoute);
app.use("/api/schools", schoolsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/programs", programsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/filters", filtersRoute);

// Google OAuth routes
app.get('/auth/google', (req, res) => {
    const redirectUri = `${req.protocol}://${req.get('host')}/auth/google/callback`; // Construct the redirect URI
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile'],
        redirect_uri: redirectUri, // Add the redirect URI here
    });
    console.log("Authorization URL:", authUrl); // Log the URL
    res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const redirectUri = `${req.protocol}://${req.get('host')}/auth/google/callback`; // Construct the redirect URI
  try {
      const { tokens } = await client.getToken({ code, redirect_uri: redirectUri }); // Include redirect_uri here
      client.setCredentials(tokens);
      req.session.tokens = tokens; // Save tokens in session
      res.redirect('/'); // Redirect to your desired route after login
  } catch (error) {
      console.error("Error retrieving access token", error);
      res.status(500).json({ error: "Failed to retrieve access token" });
  }
});

const port = process.env.PORT || 8080;

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Node Server started on port ${port}`));
