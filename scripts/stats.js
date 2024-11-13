document.addEventListener("DOMContentLoaded", () => {
    fetchPlayers();

    document.getElementById("applyFilter").addEventListener("click", applyFilters);
});

function fetchPlayers() {
    fetch("http://localhost:8081/api/player/players") 
        .then(response => response.json())
        .then(players => {
            
            window.allPlayers = players;
            displayPlayers(players);
        })
        .catch(error => console.error("Error loading players:", error));
}

function applyFilters() {
    const position = document.getElementById("position").value;
    const minAge = parseInt(document.getElementById("minAge").value) || 0;
    const maxAge = parseInt(document.getElementById("maxAge").value) || 100;
    const minGoals = parseInt(document.getElementById("minGoals").value) || 0;

    const filterRequests = [];

    if (position) {
        filterRequests.push(fetch(`http://localhost:8081/api/player/getPlayersByPosition/${position}`)
            .then(res => res.json()));
    }

    filterRequests.push(fetch(`http://localhost:8081/api/player/getPlayersByAge?min=${minAge}&max=${maxAge}`)
        .then(res => res.json()));

    filterRequests.push(fetch(`http://localhost:8081/api/player/getPlayersByAmountOfGoals?min=${minGoals}&max=1000`)
        .then(res => res.json()));

  
    Promise.all(filterRequests)
        .then(results => {
            const [positionPlayers = [], agePlayers = [], goalsPlayers = []] = results;

            let filteredPlayers = positionPlayers;
            if (agePlayers.length) {
                filteredPlayers = filteredPlayers.filter(player =>
                    agePlayers.some(agePlayer => agePlayer.id === player.id));
            }
            if (goalsPlayers.length) {
                filteredPlayers = filteredPlayers.filter(player =>
                    goalsPlayers.some(goalPlayer => goalPlayer.id === player.id));
            }

            displayPlayers(filteredPlayers);
        })
        .catch(error => console.error("Error filtering players:", error));
}

function displayPlayers(players) {
    const playersGrid = document.getElementById("playersGrid");
    playersGrid.innerHTML = ''; 
    if (players.length === 0) {
        playersGrid.innerHTML = "<p>Players not found.</p>";
        return;
    }

    players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");

        playerCard.innerHTML = `
            <h3>${player.name}</h3>
            <p>Position: ${player.position}</p>
            <p>Age: ${player.age} лет</p>
            <p>Goals: ${player.goals}</p>
            <p>Assists: ${player.assists}</p>
        `;

        playersGrid.appendChild(playerCard);
    });
}
