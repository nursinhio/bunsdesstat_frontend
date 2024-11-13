document.addEventListener("DOMContentLoaded", () => {
    const teamsGrid = document.getElementById("teamsGrid");

   
    fetch("http://localhost:8081/api/club/clubs")
        .then(response => response.json())
        .then(teams => {
            teams.forEach(team => {
                const teamCard = document.createElement("div");
                teamCard.classList.add("team-card");

                teamCard.innerHTML = `
                    <a href="../indexes/team-player.html?team=${encodeURIComponent(team.id)}">
                        <img src="${team.logoUrl}" alt="${team.name}" class="team-logo">
                        <h2>${team.name}</h2>
                    </a>
                `;
                teamsGrid.appendChild(teamCard);
            });
        })
        .catch(error => {
            console.error("Error loading teams list:", error);
            teamsGrid.innerHTML = "<p>Failed to load the teams list.</p>";
        });
});
