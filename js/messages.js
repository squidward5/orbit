const text = document.getElementById("message");

const messages = [
    { text: "genuinely just happy to be here" },
    { text: "welcome to orbit sonion"},
    { text: "what did you just do" },
    { text: "some of the frogie's arcade messages GOTTA GO bro 😭🙏" },
    { text: "console.log('hello world')" },
    { text: "maxim a hater on god" },
    { text: "low life for life cuz im heartless" },
    { text: "black leather glove, no sequins" },
    { text: "i am a genius" },
    { text: "yes king" },
    { text: "twin 🥹" },
    { text: "thank you thank you thank you" },
    { text: "this site might go mainstream one day, who knows" },
    { text: "y'know why i picked orbit? because it's a cool name" },
    { text: "if you have any suggestions for messages, please let me know" },
    { text: "remaining undetected!"},
    { text: "larp larp larp sahur" },
    { text: "maxim genuinely boutta get slimed out" },
    { text: "this ui is pretty good ngl" },
    { text: "duuuuude noahhh"},
    { text: "so i've heard that if you say the word \"epstein\" you will GENUINELY get iss 💔🙏" },
    { text: "so my district just announced that if you were on a proxy site you would genuinely get oac ✌"},
    { text: "if you click the message, it will change to a new one! try it out!" },
    { text: "love yall <3" },
    { text: "genuinely what do i put here" },
    { text: "goguardian got NOTHING on this 😂😂" },
    { text: "contentkeeper is genuinely one of the worst filters ever created" },
    { text: "hey man!" },
    { text: "i miss you juice wrld i miss you xxxtentacion... you made the world so bright" },
    { text: "some people at my school GENUINELY think that i didn't make this site 😭"},
    { text: "this school GENUINELY thought blocking cdn.jsdelivr.net would block every game"},
    { 
        text: "hey buddy!!", 
        gif: "gifs/happycat.gif" 
    },
    { 
        text: "when was da big ck (charlie kirk) black", 
        gif: "gifs/charlie kirk.png"
    },
    {
        text: "when you genuinely passed the test and you didn't even study",
        gif: "gifs/vibingcat.gif"
    },
    {
        text: "pov: you see the new messages",
        gif: "gifs/pufferfishcat.gif"
    }

];

let lastmsg = -1;


function getRandomMessage() {
    if (messages.length === 1) return messages[0];

    let index;
    do {
        index = Math.floor(Math.random() * messages.length);
    } while (index === lastmsg);

    lastmsg = index;
    return messages[index];
}

function renderGifs(msg) {
    text.innerHTML = `<div class="msg-text">${msg.text}</div>${msg.gif ? `<img src="${msg.gif}" class="msg-gif" style="z-index: 9999;">` : ""}`;
}

renderGifs(getRandomMessage());

text.addEventListener("click", () => {
    renderGifs(getRandomMessage());
});