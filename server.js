const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());


// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });


// GET ALL STUDENTS
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// GET ONE STUDENT
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// ADD STUDENT
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create({
      name: req.body.name,
      age: req.body.age,
      branch: req.body.branch,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// UPDATE STUDENT
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        branch: req.body.branch,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// DELETE STUDENT
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// HOME
app.get("/", (req, res) => {
  res.send("Student Management API is running.");
});