document.getElementById("roadmapForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Form data
    const topic = document.getElementById("topic").value;
    const duration = document.getElementById("duration").value;
    const division = document.getElementById("division").value;
    const skillLevel = document.getElementById("skillLevel").value;

    const resources = Array.from(document.querySelectorAll("input[name='resources']:checked"))
        .map(checkbox => checkbox.value);

    // Input validation
    if (!topic || !duration || !division || !skillLevel) {
        alert("Please fill in all fields before generating the roadmap.");
        return;
    }

    const data = {
        topic: topic,
        duration: duration,
        division: division,
        skillLevel: skillLevel,
        resources: resources
    };

    const roadmapTable = document.getElementById("roadmapTable");
    roadmapTable.textContent = "Generating your personalized roadmap...";

    fetch('#', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        roadmapTable.innerHTML = `<pre>${JSON.stringify(responseData.roadmap, null, 2)}</pre>`;
        roadmapTable.style.display = "block";
    })
    .catch(error => {
        roadmapTable.textContent = "An error occurred while generating your roadmap. Please try again.";
        console.error("Error:", error);
    });
});