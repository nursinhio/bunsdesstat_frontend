document.addEventListener("DOMContentLoaded", function() {
    fetchPlayers();
});

function fetchPlayers() {
    fetch('http://localhost:8081/api/player/players') 
        .then(response => response.json())
        .then(players => displayPlayers(players))
        .catch(error => console.error("Error loading players:", error));
}

function displayPlayers(players) {
    const playersGrid = document.getElementById("playersGrid");
    playersGrid.innerHTML = ''; 

    players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");

        playerCard.innerHTML = `
            <h2>${player.name}</h2>
            <p>Position: ${player.position}</p>
            <p>Age: ${player.age} years</p>
            <p>Goals: ${player.goals}</p>
            <p>Assists: ${player.assists}</p>
        `;

        playersGrid.appendChild(playerCard);
    });
}
