API_URL = "" + "/login" //todo: set api root url 
async function login(username, password) {
    response = await fetch(TargetURL, {
        method: "POST",
        headers:{
            "Username": username,
            "Password": password
        }});
    data = await response.json();
    // TODO: response should be json object with "validated" bool and "userKey" string. Set up in main-server.js.
    try {
        if (data.validated) {
            localStorage.setItem(UserKey, data.userKey);
            // TODO: redirect to game.html
        } else {
            alert("Login failed. Please try again.");
            //TODO: clear form
        }
    } catch {
        alert("Login resulted in error. Please contact the developer.");
    }
}
async function register(username, password) {
    response = await fetch(TargetURL, {
        method: "POST",
        headers:{
            "Username": username,
            "Password": password
        }});
    data= await response.json();
    // TODO: response should be json object with "validRegistration" bool and "userkey" string. Set up in main-server.js.
    try {
        if (data.validRegistration) {
            localStorage.setItem(userKey, data.userKey);
            // TODO: redirect to game.html
        } else {
            alert("Registration failed. Please try a different username, or a password which is valid (only 0-9 and a-Z are permitted).");
        }
    } catch {
        alert("Registration resulted in error. Please contact the developer.");
    }
}

//TODO: event listeners, preventdefaults etc. 