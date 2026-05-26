const { use } = require("react")

userKey = localStorage.getItem(userKey)
async function getStats(userKey) {
    if (userKey != null) {
        response = await fetch(TARGET_URL, {
            method: "POST",
            headers: {
                "userKey": userKey
            }});
        data = await response.json();
        
        }
    }