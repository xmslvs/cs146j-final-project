const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.get('/login', (req, res)=>{
    // TODO: process POST request;
    // check if username exists
    // if exists, check if the password associated with the username matches the password input
    // if matches, respond with: 
    // status 200 
    // userkey as output (userkey is a unique alphanumeric identifier for each user; similar to a session token)
    // held currency (stored server-side to avoid client-side manipulation)
    // held accessoreis (stored server-side to avoid client-side manipulation)
    // store session token into server-side database
    // if errors for some reason, respond with status 404
});

app.get('/register', (req, res)=>{
    // TODO:
    // check if username exists
    // if doesnt exist, check if password is valid
    // if password is valid, then write those into server-side database, then create a userkey and store it into database as well.
    // return status 200 and userkey as output
    // if error, respond status 404
})

app.get('/userStats', (req, res)=>{
    // TODO:
    // check if userkey is valid
    // if valid, return user-associated songStats
    // else return 404
})

app.get('/globalStats', (req, res)=>{
    // TODO:
    // return global song data
})
app.get('/pullOnce', (req, res)=>{
    // TODO:
    // if currency is greater than pullCost (both stored server-side to avoid manipulation);
    // return one accessory
    // update currency for user stored in server db
})
app.get('/pullTen', (req, res)=>{
    // TODO:
    // same as pullOnce but for 10 items.
})

// database structure plan:
// users = [
//     {
//         username: "user1",
//         password: "abcdef123",
//         userKey: "a121n163", // creates new userKey on every session for increased security
//         lastAlive: "05-22-2026 08:12:34", // if lastAlive > 30min, set userKey back to null
//         heldCurrency: 1049,
//         heldAccessories: [1, 14, 39, ...] // ids to held accessory items
//         songStats: [
//             {
//                 songTitle: "miku miku ni shiteageru",
//                 highscore: 130929,
//                 playCount: 21
//             },
//             {additional songs...}
//         ]
//     },
//     {additional users...}
// ]
//
// globalStats = [
//     {
//         songTitle: "miku miku ni shiteageru",
//         highscores: [
//             {
//                 player: "alan",
//                 score: 309121,
//             },
//             {
//                 player: "alan's alt",
//                 score: 293104,
//             },
//             {
//                 player: "notAlan",
//                 score: 287901,
//             }
//         ]
//     },
//     {additional songs...}
// ]
// accessories = [
//     {
//         id: 1,
//         name: "miku twintails",
//         imageSrc: "/images/accessories/1.png"
//     },
//     {additional accessories...}
// ]
            