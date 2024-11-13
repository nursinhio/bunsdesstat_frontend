document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get("team");
    const playerList = document.getElementById("playerList");
    const teamName = document.getElementById("teamName");

    if (teamId) {
      
        fetch(`http://localhost:8081/api/club/getClubById/${teamId}`)
            .then(response => response.json())
            .then(team => {
                teamName.textContent = team.name; 

                
                return fetch(`http://localhost:8081/api/player/getPlayerByClub/${teamId}`);
            })
            .then(response => response.json())
            .then(players => {
                if (players.length === 0) {
                    playerList.innerHTML = "<p>No players available.</p>";
                } else {
                    players.forEach(player => {
                        const playerCard = document.createElement("div");
                        playerCard.classList.add("player-card");

                        const playerName = document.createElement("h3");
                        playerName.textContent = player.name;

                        const playerPosition = document.createElement("p");
                        playerPosition.textContent = `Position: ${player.position}`;

                        const playerAge = document.createElement("p");
                        playerAge.textContent = `Age: ${player.age}`;

                        const playerNationality = document.createElement("p");
                        playerNationality.textContent = `Nationality: ${player.nationality}`;

                        const playerPrice = document.createElement("p");
                        playerPrice.textContent = `Price: €${player.price.toFixed(2)}`;

                        const playerGoals = document.createElement("p");
                        playerGoals.textContent = `Goals: ${player.goals}`;

                        const playerAssists = document.createElement("p");
                        playerAssists.textContent = `Assists: ${player.assists}`;

                        
                        playerCard.appendChild(playerName);
                        playerCard.appendChild(playerPosition);
                        playerCard.appendChild(playerAge);
                        playerCard.appendChild(playerNationality);
                        playerCard.appendChild(playerPrice);
                        playerCard.appendChild(playerGoals);
                        playerCard.appendChild(playerAssists);

                        playerList.appendChild(playerCard);
                    });
                }
            })
            .catch(error => {
                console.error("Error loading team or player list:", error);
                playerList.innerHTML = "<p>Failed to load data.</p>";
            });
    } else {
        playerList.innerHTML = "<p>No team selected.</p>";
    }
});
