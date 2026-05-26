serKey = localStorage.getItem(userKey)
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
