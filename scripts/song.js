const { Player } = TextAliveApp;

const mediaElement = document.querySelector("#media");
if (!mediaElement) {
  console.error(
    "TextAlive player failed to initialize: #media element not found.",
  );
}

const player = new Player({
  app: {
    token: "MMp6OLkimxy48EGl", // Put your actual developer token here
  },
  mediaElement,
});

const song = {
  phrases: [],
};

song.ready = new Promise((resolve) => {
  song._resolveReady = resolve;
});

player.addListener({
  // 1. TextAlive server is ready
  onAppReady(app) {
    // Force the app to load our target song safely
    if (!app.managed) {
      player
        .createFromSongUrl("https://www.youtube.com/watch?v=ygY2qObZv24")
        .then(() => {
          if (typeof player.requestPlay === "function") {
            player.requestPlay().catch((error) => {
              console.warn("TextAlive playback blocked or failed:", error);
            });
          }
        })
        .catch((error) => {
          console.error("Failed to load TextAlive song URL:", error);
        });
    }
  },

  // fires when the video and all text loops are ready.
  onVideoReady(video) {
    // Safely extract the phrases from the player's video asset
    const phrases = player.video.phrases || [];
    // console.log("--- DATA READY ---");
    // console.log("Phrases count:", phrases.length);
    // console.log("Full Phrases List:", phrases);

    // console.log(player);

    phrases.forEach((phrase, index) => {
      const startTime = phrase.startTime;
      song.phrases.push({
        text: phrase.text,
        startTime: startTime,
      });
      setTimeout(() => {
        console.log(`Phrase ${index + 1}: at ${startTime}ms`); // Log each phrase's text and timing
      }, startTime);
    });
    if (song._resolveReady) {
      song._resolveReady();
    }
  },

  // 3. This runs automatically every millisecond during music playback
  onTimeUpdate(position) {
    const currentPhrase = player.findPhrase(position);
  },
});

export default { song, player };
