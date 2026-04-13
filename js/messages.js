const text = document.getElementById("message");

const messages = [
    "genuinely just happy to be here",
    "what did you just do",
    "some of the frogie's arcade messages GOTTA GO bro 😭🙏",
    "hello world",
    "maxim a hater on god",
    "low life for life cuz im heartless",
    "black leather glove, no sequins",
    "coding is fun! - me, probably",
    "i am a genius",
    "yes king",
    "twin 🥹",
    "thank you thank you thank you",
    "site is still in development, expect bugs and missing features",
    "if you find any bugs, please report them to me",
    "i hope you enjoy the site!",
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

text.innerHTML = getRandomMessage();

text.addEventListener("click", () => {
    text.innerHTML = getRandomMessage();
});