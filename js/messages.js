const text = document.getElementById("message");

const messages = [
    { text: "genuinely just happy to be here" },
    { text: "what did you just do" },
    { text: "some of the frogie's arcade messages GOTTA GO bro 😭🙏" },
    { text: "console.log('hello world')" },
    { text: "maxim a hater on god" },
    { text: "low life for life cuz im heartless" },
    { text: "black leather glove, no sequins" },
    { text: "coding is fun! - me, probably" },
    { text: "i am a genius" },
    { text: "yes king" },
    { text: "twin 🥹" },
    { text: "thank you thank you thank you" },
    { text: "this site might go mainstream one day, who knows" },
    { text: "this is a message" },
    { text: "y'know why i picked orbit? because it's a cool name" },
    { text: "if you have any suggestions for messages, please let me know" },
    { text: "larp larp larp sahur" },
    { text: "maxim genuinely boutta get slimed out" },
    { text: "this ui is pretty good ngl" },
    { text: "this is a message" },
    { text: "so i've heard that if you say the word \"epstein\" you will GENUINELY get iss 💔🙏" },
    { text: "if you click the message, it will change to a new one! try it out!" },
    { text: "love yall <3" },
    { text: "genuinely what do i put here" },
    { text: "goguardian got NOTHING on this site" },
    { text: "contentkeeper is a joke" },
    { 
        text: "hey buddy!!", 
        gif: "gifs/happycat.gif" 
    },
    { 
        text: "me when bro tells me to hop on brawlhalla", 
        gif: "gifs/charlie kirk.png"
    },
    {
        text: "when you genuinely just vibing",
        gif: "gifs/vibingcat.gif"
    },
    {
        text: "when you see the new messages",
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
    text.innerHTML = `<div class="msg-text">${msg.text}</div>${msg.gif ? `<img src="${msg.gif}" class="msg-gif">` : ""}`;
}

renderGifs(getRandomMessage());

text.addEventListener("click", () => {
    renderGifs(getRandomMessage());
});