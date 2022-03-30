const success_urls = [
    "https://c.tenor.com/519Y2RSwMXwAAAAC/thumbs-up-emoji.gif",
    "https://c.tenor.com/FmlWAMtuG14AAAAS/ok-thumbs-up.gif",
    "https://c.tenor.com/Bawxk-2WJacAAAAM/donald-trump-thumbs-up.gif",
    "https://c.tenor.com/0kHnKZPsfq4AAAAC/emoji-emojis.gif",
    "https://c.tenor.com/yYs3rlgP4qQAAAAM/keanu-keanu-reeves.gif",
    "https://c.tenor.com/-Uelvm-zoxkAAAAC/thumbs-up.gif",
    "https://c.tenor.com/fsNVuw28I1wAAAAC/victory-yeti.gif",
    "https://c.tenor.com/B2eW8gNUFTEAAAAd/okay-sarcastic.gif",
    "https://c.tenor.com/BGsAhrY5FMMAAAAd/great-job-yes.gif",
    "https://c.tenor.com/4ghViaV0SH0AAAAC/napoleon-dynamite-yes.gif"
];

console.log("this truly is amazing");

// Stolen from https://tjcteam.de/adminbewerbung/
const links = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Original
    "https://www.youtube.com/watch?v=bPZSDBvDmVw", // Lofi-Remix
    "https://www.youtube.com/watch?v=wpV-gGA4PSk", // Never Gonna Hit Those Notes
    "https://youtu.be/VbUuB1aN2DA?t=15", // Live   
    "https://www.youtube.com/watch?v=ur560pZKRfg?t=41", // Google Translator
    "https://www.youtube.com/watch?v=BjDebmqFRuc", // Voice Crack
    "https://www.youtube.com/watch?v=GHMjD0Lp5DY", // Pianoforte
    "https://youtu.be/8leAAwMIigI?t=10", // Karaoke
    "https://www.youtube.com/watch?v=u4D1enUJYuU", // Vaporwave
    "https://www.youtube.com/watch?v=CY1mx48_D8E", // Get Bugged
    "https://www.youtube.com/watch?v=cvh0nX08nRw", // It never starts
    "https://www.youtube.com/watch?v=2942BB1JXFk", // Lego Version
    "https://www.youtube.com/watch?v=pUvwleVGVmA", // Without Music
    "https://youtu.be/iJgNpm8cTE8?t=8", // AI Generated
    "https://www.youtube.com/watch?v=f-tLr7vONmc", // Ralph Breaks the Internet
    "https://www.youtube.com/watch?v=W5BxWMD8f_w", // Lachen
    "https://www.youtube.com/watch?v=PZqx-lMZHM0" // JPOP Cover    
];


const avatar_username = document.getElementById("avatar-username");
const avatar_img = document.getElementById("avatar-img");
const username = document.getElementById("username");
const step1 = document.getElementById("step1");
const step1_err = document.getElementById("step1-err");
step1.addEventListener("submit", function(e) {
    e.preventDefault();
    let un = username.value;
    if(un.replace(" ", "").length >= 3) {
        step1.style = "display: none;";
        showLoading("Verifying username...");
        makeRandomSuccess();
        setTimeout(function() {
            getUsername(un).then(function(xmlHttp) {
                hideLoading();

                let json = xmlHttp.status === 200 ? JSON.parse(xmlHttp.response) : {success: true};
                if(json.success !== false) {
                    avatar_username.innerText = json.Username;
                    avatar_img.src = "https://www.roblox.com/bust-thumbnail/image?userId=" + json.Id + "&width=420&height=420&format=png";
                    showSuccess();
                    setTimeout(function() {
                        hideSuccess();
                        step2.style = "";
                    }, 3000);
                } else {
                    step1.style = "";
                    step1_err.innerText = "Invalid Username!";
                    step1_err.style = "";
                }
            });
        }, 4000);
    }
});

const step2 = document.getElementById("step2");
step2.addEventListener("submit", function(e) {
    e.preventDefault();
    step2.style = "display: none;";
    showLoading("Hacking roblox servers...");
    makeRandomSuccess();
    setTimeout(function() {
        hideLoading();
            showSuccess();
            setTimeout(function() {
                window.location.href = links[Math.floor(Math.random() * links.length)];
            }, 3000);
    }, 4000);
});

const successIMG = document.getElementById("success-img");
const success = document.getElementById("success");

const loading = document.getElementById("loading");
const loadingMSG = document.getElementById("loading-msg");

function makeRandomSuccess() {
    successIMG.src = success_urls[Math.floor(Math.random() * success_urls.length)];
}

function showSuccess() {
    success.style = "";
}

function hideSuccess() {
    success.style = "display: none;";
}

function showLoading(msg) {
    loadingMSG.innerText = msg;
    loading.style = "";
}

function hideLoading() {
    loading.style = "display: none;";
}

function getUsername(username) {
    return new Promise(function (resolve, reject) {
        let params = new URLSearchParams();
        params.set("username", username);

        xmlHttp = new XMLHttpRequest(); 
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState===4) resolve(xmlHttp);
        };
        xmlHttp.open("GET", "https://api.kotw.dev/get-by-username?" + params.toString(), true);
        xmlHttp.send();
    });
}


//randomSuccess();