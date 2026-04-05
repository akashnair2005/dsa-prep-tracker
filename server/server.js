const express = require("express");
const cors = require("cors");
const lcApi = require("./leetcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET: User Profile Stats
app.get("/api/lc/user/:username", async (req, res) => {
    try {
        const stats = await lcApi.getUserStats(req.params.username);
        if (!stats) return res.status(404).json({ error: "User not found" });
        res.json(stats);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET: Fetch list of LC questions
app.get("/api/lc/problems", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const skip = parseInt(req.query.skip) || 0;
        const problems = await lcApi.getProblemList(limit, skip);
        res.json(problems);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET: Fetch single LC question
app.get("/api/lc/problem/:slug", async (req, res) => {
    try {
        const problem = await lcApi.getProblemDetails(req.params.slug);
        if (!problem) return res.status(404).json({ error: "Problem not found" });
        res.json(problem);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`LeetCode Proxy Server running on http://localhost:${PORT}`);
});

module.exports = app;