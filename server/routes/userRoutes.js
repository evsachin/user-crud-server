const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Create a new user
router.post("/", (req, res) => {
  const { name, email, mobile, city, profession, photo } = req.body;
  db.query(
    "INSERT INTO users (name, email, mobile, city, profession, photo) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, mobile, city, profession, photo],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Update user by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, city, profession, photo } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ?, mobile = ?, city = ?, profession = ?, photo = ? WHERE id = ?",
    [name, email, mobile, city, profession, photo, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete user by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});

// Get single user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});


module.exports = router; // ✅ THIS IS IMPORTANT
