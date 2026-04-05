const form = document.getElementById("search-form");
const resultDiv = document.getElementById("result");

let currentSolution = "";
let currentQuestion = null;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const qNum = parseInt(document.getElementById("question-number").value);
    
    if (!qNum || qNum < 1) {
        resultDiv.innerHTML = `<p>Please enter a valid question number</p>`;
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/lc/problems?limit=1&skip=${qNum-1}`);
        const data = await res.json();

        if (!data || !data[0]) {
            resultDiv.innerHTML = `<p>Question not found</p>`;
            return;
        }

        currentQuestion = data[0];
        const solved = JSON.parse(localStorage.getItem('decipherSolved')) || {};

        resultDiv.innerHTML = `
            <h2>${currentQuestion.title}</h2>
            <p>Difficulty: <span style="color: ${currentQuestion.difficulty === 'Hard' ? '#ef4444' : currentQuestion.difficulty === 'Medium' ? '#f59e0b' : '#10b981'}">${currentQuestion.difficulty}</span></p>
            <p>Slug: ${currentQuestion.titleSlug}</p>
            <p>Acceptance Rate: ${(currentQuestion.acRate).toFixed(2)}%</p>

            <p>Status: 
                <span class="${solved[qNum] ? 'solved' : 'unsolved'}">
                    ${solved[qNum] ? "✅ Solved" : "❌ Not Solved"}
                </span>
            </p>

            <div class="btn-group">
                <button onclick="viewSolution()">View Details</button>
                <button onclick="markSolved(${qNum})">Mark as Solved</button>
            </div>
        `;
    } catch (err) {
        resultDiv.innerHTML = `<p style="color: #ef4444">Error: ${err.message}</p>`;
    }
});

async function searchQuestion(qNum) {
    const res = await fetch(`http://localhost:3000/api/lc/problems?limit=1&skip=${qNum-1}`);
    const data = await res.json();
}

// VIEW SOLUTION
function viewSolution() {
    document.getElementById("solution-code").textContent = currentSolution;
}

// MARK SOLVED
async function markSolved(id) {
    // Store locally
    const solved = JSON.parse(localStorage.getItem('decipherSolved')) || {};
    solved[id] = true;
    localStorage.setItem('decipherSolved', JSON.stringify(solved));

    alert("Marked as solved ✅");
}