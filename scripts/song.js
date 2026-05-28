const { Player } = TextAliveApp;
key = "MMp6OLkimxy48EGl"; // issa's API key for TextAlive API

const player = new Player({
  app: { token: key },
  mediaElement: document.querySelector("#media"),
});

console.log("Player initialized:", player);

// player.addListener({
//   onAppReady(app) {
//     player.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202");
//   },
//   onVideoReady(video) {
//     console.log("Video is ready:", video);
//   },
// });

// player.addListener({
//   onAppReady(app) {
//     console.log("App ready. Loading song with lyrics...");

//     // We provide BOTH the song video URL and the specific TextAlive lyric data URL
//     player.createFromSongUrl(
//       "[https://piapro.jp/t/Nsek/20210204123145](https://piapro.jp/t/Nsek/20210204123145)",
//     );
//   },

//   onVideoReady(video) {
//     console.log("--- Video Data Loaded ---");
//     // Do not just log the whole object; explicitly check the properties
//     console.log(
//       "Total Phrases found:",
//       video.phrases ? video.phrases.length : 0,
//     );

//     if (video.phrases && video.phrases.length > 0) {
//       console.log("Sample Lyric Text:", video.phrases[0].text);
//     }
//   },
// });

player.addListener({
  onAppReady(app) {
    console.log("App ready. Loading official master track...");

    // Using an official AIST TextAlive asset ID package
    player.createFromSongUrl("https://www.youtube.com/watch?v=ygY2qObZv24", {
      video: {
        // This specific ID points to the official "King" by Kanaria lyric map
        lyricId: 52085,
        lyricUrl: "https://piapro.jp/t/IpWw/20210203231713",
      },
    });
  },

  onVideoReady(video) {
    console.log("--- Video Ready Triggered ---");

    // Check the raw lyric text array directly
    if (video.lyrics) {
      console.log("Raw text data exists:", video.lyrics.text);
    }

    // Force a data refresh check
    const phrases = video.phrases || [];
    console.log("Phrases count:", phrases.length);

    if (phrases.length > 0) {
      console.log("Success! First line:", phrases[0].text);
    }
  },
});
