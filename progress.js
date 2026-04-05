const container = document.getElementById("progress-container");

async function loadProgress() {
    // Load from local storage
    const solvedData = JSON.parse(localStorage.getItem('decipherSolved')) || {};

    let html = "<h2>Your Progress</h2>";
    let solvedCount = 0;

    // Fetch all problems and show which are solved
    try {
        const res = await fetch("http://localhost:3000/api/lc/problems?limit=20&skip=0");
        const problems = await res.json();

        html += `<p>Total Solved: ${Object.keys(solvedData).length}</p>`;
        html += "<div style='margin-top: 20px;'>";

        problems.forEach((problem, index) => {
            const qNum = index + 1;
            const isSolved = solvedData[qNum] ? true : false;
            if (isSolved) solvedCount++;
            
            html += `
                <p style="margin: 10px 0; padding: 10px; background: ${isSolved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)'}; border-left: 3px solid ${isSolved ? '#10b981' : '#6b7280'}; border-radius: 4px;">
                    <a href="problem.html?slug=${problem.titleSlug}" style="color: #60a5fa; text-decoration: none;">Q${qNum}: ${problem.title}</a>
                    <span style="float: right; ${isSolved ? 'color: #10b981' : 'color: #ef4444'}">
                        ${isSolved ? "✅ Solved" : "❌ Not Solved"}
                    </span>
                </p>
            `;
        });

        html += "</div>";
    } catch (err) {
        html += `<p style="color: #ef4444">Error loading progress: ${err.message}</p>`;
    }

    container.innerHTML = html;
}

loadProgress();