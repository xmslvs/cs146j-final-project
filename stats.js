//userKey = localStorage.getItem(userKey)
async function getUserStats(userKey) {
    if (userKey != null) {
        // TODO: set Target_URL first
        response = await fetch(TARGET_URL, {
            method: "POST",
            headers: {
                "userKey": userKey
            }});
        data = await response.json();
        // TODO: write backend so that if user gets userstats, it responds with a list of stats so we can then put that as .textContent into divs;
        }
    }
async function getGlobalStats() {
    // TODO: set Target_URL first
    response = await fetch(TARGET_URL);
    data = await response.json();
    for (let i = 0; i < data.songs.length; i++) {
        song = data.songs[i];
        //TODO; add song stat data to DOM (i.e. Song title, composer, song cover art (if possible), top 3 global highscores)
    }
}

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

let current_song = null; /**universal list*/

function renderGlobalLeaderboard() {
    const tbody = document.getElementById("lbBody");
    const userBest = {};

    songs.forEach(song => {
        song.highscores.forEach(entry => {
            if (!userBest[entry.userName] || entry.score > userBest[entry.userName].score) {
                userBest[entry.userName] = { ...entry, song: song.title };
            }
        });
    });

    const rows = Object.values(userBest).sort((a, b) => b.score - a.score);

    tbody.innerHTML = rows.map((row, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${row.userName}</td>
            <td><span class="song-tag">${row.song}</span></td>
            <td class="score">${row.score.toLocaleString()}</td>
        </tr>
    `).join("");
}
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

let currentCarouselIndex = 0;

function renderCarousel() {
    const song = songs[currentCarouselIndex];
    document.getElementById("song-image").src = song.coverArt || "";
    document.getElementById("song-card-title").textContent = song.title;
    document.getElementById("song-card-author").textContent = "By: " + song.author;
}

function scrollCarousel(dir) {
    currentCarouselIndex = (currentCarouselIndex + dir + songs.length) % songs.length;
    renderCarousel();
}

// DOMContentLoaded 里：
document.addEventListener("DOMContentLoaded", () => {
    renderGlobalLeaderboard();
    renderCarousel();
    showView("global");
});

function showView(view) {
    document.getElementById("universal-lb-view").style.display = view === "global" ? "" : "none";
    document.getElementById("songView").style.display = view === "song" ? "" : "none";

    document.getElementById("btn-global").classList.toggle("active", view === "global");
    document.getElementById("btn-song").classList.toggle("active", view === "song");
}

document.addEventListener("DOMContentLoaded", () => {
    renderGlobalLeaderboard();
    renderCarousel();       
    showView("global");
});