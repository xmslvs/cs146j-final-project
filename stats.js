//userKey = localStorage.getItem(userKey)
// async function getUserStats(userKey) {
//     if (userKey != null) {
//         // TODO: set Target_URL first
//         response = await fetch(TARGET_URL, {
//             method: "POST",
//             headers: {
//                 "userKey": userKey
//             }});
//         data = await response.json();
//         // TODO: write backend so that if user gets userstats, it responds with a list of stats so we can then put that as .textContent into divs;
//         }
//     }
// async function getGlobalStats() {
//     // TODO: set Target_URL first
//     response = await fetch(TARGET_URL);
//     data = await response.json();
//     for (let i = 0; i < data.songs.length; i++) {
//         song = data.songs[i];
//         //TODO; add song stat data to DOM (i.e. Song title, composer, song cover art (if possible), top 3 global highscores)
//     }
// }

//for now, use this instead

songs = [
    {
        title: "World is Mine",
        author: "kz (livetune)",
        coverArt: "/images/micmiku.png",
        highscores: [
            {
                userName: "mikufan1",
                score: 201890
            },
            {
                userName: "teto",
                score: 180219
            },
            {
                userName: "alan",
                score: 102840
            },
        ]
    },
        {
        title: "Caramelldansen",
        author: "anonymous",
        coverArt: "/images/Hatsune_miku_v6.webp",
        highscores: [
            {
                userName: "mikufan1",
                score: 491290
            },
            {
                userName: "teto",
                score: 3904392
            },
            {
                userName: "alan",
                score: 291290
            },
        ]
    },
]
document.addEventListener("DOMContentLoaded", () => {
    const songlist = document.querySelector("#leaderboardContainer");

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        
        const newSong = document.createElement("div");
        newSong.classList.add("song-card");

        const highscoresHTML = song.highscores && song.highscores.length > 0
            ? song.highscores.map(entry => `<li>${entry.userName}: ${entry.score.toLocaleString()}</li>`).join("")
            : "<li>No highscores yet!</li>";

        newSong.innerHTML = `
            <div class="song-info-layout">
                ${song.coverArt ? `<img src="${song.coverArt}" alt="${song.title} cover" class="song-cover" />` : ''}
                <div class="song-details">
                    <h2 class="song-title">${song.title}</h2>
                    <p class="song-composer">By: ${song.author}</p>
                </div>
                <div class="song-leaderboard">
                    <h3>Global Highscores</h3>
                    <ol>
                        ${highscoresHTML}
                    </ol>
                </div>
            </div>
        `;

        songlist.appendChild(newSong);
    }
});