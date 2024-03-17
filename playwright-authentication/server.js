const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 9091;
const SECRET_KEY = "techysam"; // Change this to a secure secret key

app.use(bodyParser.json());
app.use(cors());

// Sample users data (for demo purposes)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);

  // Set token as a cookie
  res.cookie("token", token, { httpOnly: true });
  res.json({ token });
});

// Public endpoint - accessible without login token
app.get("/public", (req, res) => {
  res.json({ message: "This is a public endpoint. No login token required." });
});

// Restricted endpoints - require login token
app.get("/restricted1", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the restricted endpoint 1!" });
});

app.get("/restricted2", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the restricted endpoint 2!" });
});

app.get("/restricted3", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the restricted endpoint 3!" });
});

app.post("/logout", verifyToken, (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  // Send a response instructing the client to remove the token
  res.status(200).json({ message: "Logout successful", clearToken: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
