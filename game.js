const { Player } = TextAliveApp;
key = "MMp6OLkimxy48EGl"; // issa's API key for TextAlive API

// Simple song list for cycling, can be expanded to fetch from a server
const songs = [
  {
    title: "World is Mine",
    image: "images/Hatsune_miku_v6.webp",
    url: "https://www.youtube.com/watch?v=YBEW95N2Lu4",
  },
  {
    title: "Sample Song 2",
    image: "images/miku-bg1.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

let currentSongIndex = 0;

function updateSongCard() {
  const titleEl = document.getElementById("song-card-title");
  const imgEl = document.getElementById("song-image");
  if (titleEl) titleEl.textContent = songs[currentSongIndex].title;
  if (imgEl) imgEl.src = songs[currentSongIndex].image;
  // if TextAlive player exists, load the song URL
  try {
    if (
      typeof player !== "undefined" &&
      player &&
      songs[currentSongIndex].url
    ) {
      player.createFromSongUrl(songs[currentSongIndex].url);
    }
  } catch (e) {
    // ignore if player isn't ready yet
  }
}

function renderSidebarList() {
  const listRoot = document.getElementById("song-list");
  if (!listRoot) return;
  listRoot.innerHTML = songs
    .map(
      (song) =>
        `<div class="sidebar-item"><img src="${song.image}" alt="${song.title}" /><span>${song.title}</span></div>`,
    )
    .join("");
}

function runWhenReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

runWhenReady(() => {
  // wire arrow buttons
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const songCard = document.getElementById("song-card");
  const sidebar = document.getElementById("song-sidebar");

  if (prev)
    prev.addEventListener("click", () => {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      updateSongCard();
    });
  if (next)
    next.addEventListener("click", () => {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongCard();
    });
  if (songCard && sidebar)
    songCard.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

  updateSongCard();
  renderSidebarList();
});

// show current word in "#text" container
const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text").textContent = unit.text;
  }
};

// Create TextAlive Player
const player = new Player({ app: { token: key } });

player.addListener({
  onAppReady: (app) => {
    if (!app.songUrl) {
      // create player from song url
      // load current song from our list by default
      const url =
        (songs[currentSongIndex] && songs[currentSongIndex].url) ||
        "https://www.youtube.com/watch?v=YBEW95N2Lu4";
      player.createFromSongUrl(url);
    }
    if (!app.managed) {
      //showControls();
    }
  },
});

player.addListener({
  // called when video object is loaded and ready
  onVideoReady: (v) => {
    console.log(player.data.song);
    // set each word's "animate" property
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
  },
});
