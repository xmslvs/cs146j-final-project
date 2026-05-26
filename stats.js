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

const currentPlayer = "mikufan1";

function renderPlayerScores() {
    const container = document.getElementById("player-scores");

    const playerSongs = songs.map(song => {
        const playerEntry = song.highscores.find(e => e.userName === currentPlayer);
        return { song, score: playerEntry ? playerEntry.score : null };
    })
    .filter(row => row.score !== null)
    .sort((a, b) => b.score - a.score); // 👈 按分数从高到低

    container.innerHTML = playerSongs.map(({ song, score }) => `
        <div class="player-score-card">
            ${song.coverArt ? `<img src="${song.coverArt}" alt="${song.title}" />` : ''}
            <div class="player-score-info">
                <h3>${song.title}</h3>
                <p>By: ${song.author}</p>
            </div>
            <div class="player-score-num">
                ${score.toLocaleString()}
            </div>
        </div>
    `).join("");
}
function openModal(index) {
    currentModalIndex = index;
    renderModal();
    document.getElementById("songModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("songModal").style.display = "none";
}

function renderModal() {
    const song = songs[currentModalIndex];

    const sortedScores = [...song.highscores].sort((a, b) => b.score - a.score);

    
    const highscoresHTML = sortedScores.length > 0
        ? sortedScores.map((entry, i) => `
            <li>
                <span class="modal-rank">${i + 1}</span>
                <span class="modal-username">${entry.userName}</span>
                <span class="modal-score">${entry.score.toLocaleString()}</span>
            </li>
          `).join("")
        : "<li>No highscores yet!</li>";

    document.getElementById("modal-title").textContent = song.title + " - Highscores";
    document.getElementById("modal-songname").textContent = song.title;
    document.getElementById("modal-author").textContent = "By: " + song.author;
    document.getElementById("modal-cover").src = song.coverArt || "";
    document.getElementById("modal-scores").innerHTML = highscoresHTML;
}

let currentCarouselIndex = 0;
const currentUser = "mikufan1";

function renderCarousel() {
    const song = songs[currentCarouselIndex];
    document.getElementById("song-image").src = song.coverArt || "";
    document.getElementById("song-card-title").textContent = song.title;
    document.getElementById("song-card-author").textContent = "By: " + song.author;
    const userEntry = song.highscores.find(e => e.userName === currentUser);
    document.getElementById("song-card-score").textContent = userEntry
        ? "Your best: " + userEntry.score.toLocaleString()
        : "No score yet!";
}
function scrollCarousel(dir) {
    currentCarouselIndex = (currentCarouselIndex + dir + songs.length) % songs.length;
    renderCarousel();
}

function showView(view) {
    document.getElementById("player-lb-view").style.display = view === "player" ? "" : "none";
    document.getElementById("songView").style.display = view === "song" ? "" : "none";
    document.getElementById("btn-player").classList.toggle("active", view === "player");
    document.getElementById("btn-song").classList.toggle("active", view === "song");
}

document.addEventListener("DOMContentLoaded", () => {
    renderPlayerScores();
    renderCarousel();
    showView("player");
});
