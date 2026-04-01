const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const questions = require("./questions");

let progress = {};

// GET QUESTION
app.get("/question/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (questions[id]) {
        res.json({
            ...questions[id],
            next: questions[id + 1] ? id + 1 : null,
            solved: progress[id] ? true : false
        });
    } else {
        res.json({ error: "Question not found" });
    }
});

// MARK SOLVED
app.post("/solve/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (questions[id]) {
        progress[id] = true;
        res.json({ message: "Marked as solved" });
    } else {
        res.json({ error: "Invalid ID" });
    }
});

// GET PROGRESS
app.get("/progress", (req, res) => {
    res.json(progress);
});

module.exports = app;