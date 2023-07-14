import React from "react";
import pool from "./Database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function Registerapi(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows, field] = await pool.query(
      "SELECT * FROM users WHERE Uemail = ?",
      [email]
    );
    if (rows.length > 0) {
      console.log("user already exists");
      res.send({ message: "User already exists" });
    } else {
      const [rows, field] = await pool.query(
        "INSERT INTO users (Uname, Uemail, Upassword) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
      res.status(201).json({ message: "User created" });
      console.log("user created");
    }
  }
}
