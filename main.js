const { Player } = TextAliveApp;
key = "MMp6OLkimxy48EGl";

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
      player.createFromSongUrl("https://www.youtube.com/watch?v=YBEW95N2Lu4");
    }
    if (!app.managed) {
      // 再生コントロールを表示
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

