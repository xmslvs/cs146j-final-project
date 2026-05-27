// userKey = localStorage.getItem(userKey);
async function pullOnce() {
    response = await fetch(TARGET_URL, {
        method: "POST",
        headers: {
            "userKey": userKey
        },
    });
    data = await response.json();
}
async function pullTen() {
    response = await fetch(TARGET_URL, {
        method: "POST",
        headers: {
            "userKey": userKey
        },
    });
    data = await response.json();
}