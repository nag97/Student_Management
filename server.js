const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./models/Student");

const app = express();

app.use(express.json());
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

app.post("/Students", async (req, res) => {
  const student = await Student.create({
    name: req.body.name,
    age: req.body.age,
    branch: req.body.branch,
  });
  console.log(student);
  res.status(201).json(student);
});

app.put("/students/name/:name", async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { name: req.params.name },
    { branch: req.body.branch },
    { new: true },
  );
  res.json(student);
});

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
      message: "Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Student Management API is running.");
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

app.get("/getCourse/:name", async (req, res) => {
  const course = await Student.findOne({ name: req.params.name });
  // res.json(course);
  res.send(course);
});
