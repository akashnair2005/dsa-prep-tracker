const form = document.getElementById("search-form");
const resultDiv = document.getElementById("result");

let currentSolution = "";

    const res = await fetch(`https://dsa-prep-tracker.vercel.app/question/${qNum}`);
    const data = await res.json();

    if (data.error) {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    currentSolution = data.solution;

    resultDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p>Difficulty: ${data.difficulty}</p>
        <p>Time Complexity: ${data.complexity}</p>

        <p>Status: 
            <span class="${data.solved ? 'solved' : 'unsolved'}">
                ${data.solved ? "Solved" : "Not Solved"}
            </span>
        </p>

        <div class="btn-group">
            <button onclick="viewSolution()">View Answer</button>
            <button onclick="markSolved(${qNum})">Mark as Solved</button>
        </div>
    `;
});

// VIEW SOLUTION
function viewSolution() {
    document.getElementById("solution-code").textContent = currentSolution;
}

// MARK SOLVED
async function markSolved(id) {
    await fetch(`https://dsa-prep-tracker.vercel.app/solve/${id}`, {
        method: "POST"
    });

    alert("Marked as solved ✅");
}