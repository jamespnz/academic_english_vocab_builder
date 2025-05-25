<script>
document.addEventListener("DOMContentLoaded", function () {
    const wordDisplay = document.getElementById("word-display");
    const buttonContainer = document.getElementById("button-container");

    wordDisplay.style.display = "none";

    fetch("vocab_list1.csv")
        .then(response => response.text())
        .then(csvData => {
            const parsedData = Papa.parse(csvData, { header: true }).data;
            let categories = {};

            parsedData.forEach(row => {
                const category = row["Category"]?.trim();
                if (!category) return;

                if (!categories[category]) categories[category] = [];
                categories[category].push({
                    English: row["English"],
                    Japanese: row["Japanese"]
                });
            });

            // Create a button for each category
            Object.keys(categories).forEach(category => {
                const button = document.createElement("button");
                button.innerText = category;

                button.onclick = () => {
                    displayWords(categories[category]);
                    wordDisplay.style.display = "block";
                };

                buttonContainer.appendChild(button);
            });

            // Optional: Show All button
            const allButton = document.createElement("button");
            allButton.innerText = "Show All Words";
            allButton.onclick = () => {
                displayWords(parsedData);
                wordDisplay.style.display = "block";
            };
            buttonContainer.appendChild(allButton);
        })
        .catch(error => console.error("Error loading CSV:", error));
});

function displayWords(wordList) {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = "";

    if (!wordList || wordList.length === 0) {
        wordDisplay.innerHTML = "<p>No data found.</p>";
        return;
    }

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    ["English", "Japanese"].forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    wordList.forEach(row => {
        const tr = document.createElement("tr");
        ["English", "Japanese"].forEach(col => {
            const td = document.createElement("td");
            td.innerText = row[col] || "⚠";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    wordDisplay.appendChild(table);
}
</script>
