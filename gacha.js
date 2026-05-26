currency = localStorage.getItem(currency);
userKey = localStorage.getItem(userKey);
async function pullGacha(numPulls) {
    response = await fetch(TARGET_URL, {
        method: "POST",
        headers: {
            "userKey": userKey
        },
        body: {
            "currency": currency,
            "numPulls": numPulls
        }
    });
    data = await response.json();
    // TODO: handle validity logic
}