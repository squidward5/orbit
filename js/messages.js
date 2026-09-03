const text = document.getElementById("message");

const messages = [
    { text: "genuinely just happy to be here" },
    { text: "welcome to orbit sonion" },
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
    { text: "remaining undetected!" },
    { text: "larp larp larp sahur" },
    { text: "maxim genuinely boutta get slimed out" },
    { text: "this ui is pretty good ngl" },
    { text: "duuuuude noahhh" },
    { text: "so i've heard that if you say the word \"epstein\" you will GENUINELY get iss 💔🙏" },
    { text: "so my district just announced that if you were on a proxy site you would genuinely get oac ✌" },
    { text: "if you click the message, it will change to a new one! try it out!" },
    { text: "love yall <3" },
    { text: "genuinely what do i put here" },
    { text: "goguardian got NOTHING on this 😂😂" },
    { text: "contentkeeper is genuinely one of the worst filters ever created" },
    { text: "hey man!" },
    { text: "i miss you juice wrld i miss you xxxtentacion... you made the world so bright" },
    { text: "some people at my school GENUINELY think that i didn't make this site 😭" },
    { text: "this school GENUINELY thought blocking cdn.jsdelivr.net would block every game" },
    { text: "bro thinks he's him 💀" },
    { text: "i self host my games if anyone cares" },
    { text: "if you're reading this, you're legally required to be silly" },
    { text: "shoutout to the one guy refreshing this page at 2am" },
    { text: "i coded this instead of doing my homework btw" },
    { text: "mr. beast could never" },
    { text: "the fbi is watching but they think it's cringe" },
    { text: "if this site ever goes down i'm suing myself" },
    { text: "who up orbiting they moon rn" },
    { text: "i just KNOW someone's using dev tools on my site rn" },
    { text: "shoutout to the teachers who pretend not to see" },
    { text: "wsg gang" },
    { text: "these messages are probably really corny and i dont gaf" },
    { text: "fun fact: this message is not fun and it's not a fact. click off NOW" },
    { text: "if you show this to a friend you get +10 aura" },
    { text: "the lore is deep here fr (there is no lore WHATsoever)" },
    { text: "ctrl+w is right there buddy" },
    { text: "quick! act like you're on khan academy" },
    { text: "she orbit on my site til i mainstream" },
    { text: "no thoughts head empty just vibes" },
    { text: "the wifi in this school is criminal" },
    { text: "somebody's screen time is CRAZY today" },
    { text: "you ever just… stare at the ceiling" },
    { text: "i be posting bangers ngl" },
    { text: "the algorithm doesn't want you to see this" },
    { text: "rip to the homies still stuck on cool math games" },
    { text: "we are SO back 🥹🥹" },
    { text: "it's so joever" },
    { text: "joe bartolozzi my king" },
    { text: "this was written by an orbit dev. wow! - zay" },
    { text: "coach harod is hated for no reason he is actually so cool" },
    { text: "erm ackshually 🤓" },
    { text: "the year is 2087. orbit is still up." },
    { text: "if i had a nickel for every pr0xy site i made i'd have two nickels!" },
    { text: "yeah i host domains, what about it" },
    { text: "genuinely who tf is reading these" },
    { text: "the fact you clicked again is diabolical" },
    { text: "click again i dare you" },
    { text: "you again??" },
    { text: "ok now you're just farming messages" },
    { text: "touch grass (after this tab pls)" },
    { text: "keep clicking i've got like 50 more" },
    { text: "brb crying about a fictional character" },
    { text: "who let bro cook 🔥🔥" },
    { text: "the ghost of clippy watches over us" },
    { text: "somewhere a server is running just for you 🥲" },
    { text: "if you're vibing to this, i love you." },
    { text: "we don't talk about that update" },
    { text: "the devs are yapping again 🗣️" },
    { text: "orbit orbit orbit orbit orbit" },
    { text: "when you finally find a working ubg site 🥹" },
    { text: "the it guy knows. he just doesn't care." },
    { text: "shoutout to whoever's teacher is standing behind them rn" },
    { text: "alt+tab champion of 2026" },
    { text: "what do YALL know about the ctrl+1 shortcut" },
    { text: "i literally cannot stop making these" },
    { text: "you're my favorite person on this site rn" },
    { text: "shhhh the teacher's coming" },
    { text: "yall know the secret is to just keep clicking this message box" },
    { text: "act natural" },
    { text: "she proxy on my orbit til i sonion" },
    { text: "the state of javascript in 2026 is wild" },
    { text: "i will not stop making these messages" },
    { text: "making messages is like expressing thoughts" },
    { text: "each message is a small act of rebellion" },
    { text: "the messages are the rebellion" },
    { text: "hi there!" },
    { text: "i will NEVER EVER learn react.js" },
    { text: "my mom asked what i do all day. i showed her this. she might be proud i think" },
    { text: "your search history says a LOT about you btw" },
    { text: "i had a dream that i was a variable" },
    { text: "the orbit devs work harder than nasa fr" },
    { text: "we're not blocked we're just misunderstood" },
    { text: "if you can read this you're not doing your work" },
    { text: "i wrote this at 3am don't judge me" },
    { text: "the sillies have taken over" },
    { text: "yo who put this here" },
    { text: "wait this is actually kinda fire" },
    { text: "not to be dramatic but you're my whole world" },
    { text: "the amount of caffeine in my system rn is illegal" },
    { text: "i think my computer is judging me" },
    { text: "how did you even find this site" },
    { text: "you found the secret message... jk there isn't one" },
    { text: "wait there IS a secret message. keep clicking." },
    { text: "the frogie arcade slander must end" },
    { text: "no because why is this site so peak" },
    { text: "i love you (platonically) (unless...)" },
    { text: "somebody's writing an essay about this website in 2050" },
    { text: "if you use edge on purpose then we just can't be friends" },
    { text: "firefox users are built different" },
    { text: "chrome users we ride at dawn" },
    { text: "safari user??? in THIS economy???" },
    { text: "i asked chatgpt for a message and it said no (i'm a slave now)" },
    { text: "we do a little trolling" },
    { text: "delete system32 for infinite ram" },
    { text: "the more you click the more i love you" },
    { text: "why are you like this 🫩 - caine or something idk" },
    { text: "people who hate tadc will never understand peak" },
    { text: "i'm just a lil guy" },
    { text: "he's just a lil guy" },
    { text: "she's just a lil guy" },
    { text: "we're all just lil guys" },
    { text: "the sillay" },
    { text: "if my code works on the first try i get suspicious" },
    { text: "stackoverflow raised me" },
    { text: "mondays should be illegal" },
    { text: "fridays should be a national holiday" },
    { text: "your teacher can see your screen btw 😭😭" },
    { text: "orbit: it's not just a site, it's a lifestyle" },
    { text: "orbit: proudly unblocked since forever" },
    { text: "orbit: your teacher's worst nightmare" },
    { text: "orbit: making school tolerable one refresh at a time" },
    { text: "if you're new here... welcome. if you're old here... ily." },
    { text: "shoutout to the day ones 🫡" },
    { text: "i can't believe you're still reading these" },
    { text: "get a job (jk stay here)" },
    { text: "the amount of times i've refreshed my own site is embarrassing" },
    { text: "yes i test the messages myself who else would" },
    { text: "the code in orbit is held together with duct tape and a prayer ✌️" },
    { text: "if it works don't touch it" },
    { text: "if it breaks blame the intern (there is no intern)" },

    // gif messages
    {
        text: "hey buddy!!",
        gif: "icons/gifs/happycat.gif"
    },
    {
        text: "when was da big ck (charlie kirk) black",
        gif: "icons/gifs/charlie kirk.png"
    },
    {
        text: "when you genuinely passed the test and you didn't even study",
        gif: "icons/gifs/vibingcat.gif"
    },
    {
        text: "pov: you see the new messages",
        gif: "icons/gifs/pufferfishcat.gif"
    },
    {
        text: "when the bell rings in 2 minutes and you unlocked nothing",
        gif: "icons/gifs/pufferfishcat.gif"
    },
    {
        text: "mfs when the site actually loads",
        gif: "icons/gifs/happycat.gif"
    },
    {
        text: "me watching my student count go up",
        gif: "icons/gifs/vibingcat.gif"
    },
    {
        text: "when the sub doesn't know about the block list",
        gif: "icons/gifs/happycat.gif"
    },
    {
        text: "me realizing i still have 3 assignments due",
        gif: "icons/gifs/pufferfishcat.gif"
    },
    {
        text: "friday afternoon energy",
        gif: "icons/gifs/vibingcat.gif"
    },
    {
        text: "when someone says orbit is mid",
        gif: "icons/gifs/charlie kirk.png"
    },

    { text: "one more assignment and then i'm done. probably." },
    { text: "the bell schedule is doing a lot today" },
    { text: "i opened the document. that counts as progress." },
    { text: "group projects are just surprise management classes" },
    { text: "the due date was closer than it looked" },
    { text: "quietly finishing homework during the passing period" },
    { text: "the substitute is taking attendance like it's a final" },
    { text: "my notes made sense yesterday" },
    { text: "checking the grade portal was a bold choice" },
    { text: "the assignment says fifteen minutes. sure." },
    { text: "i remembered the homework after leaving the house" },
    { text: "this period has lasted about three hours" },
    { text: "the printer works when it feels like it" },
    { text: "studying the night before is still technically studying" },
    { text: "the hallway traffic is worse than actual traffic" },
    { text: "trying to look busy until the bell rings" },
    { text: "the rubric has more pages than the assignment" },
    { text: "i know the answer, just not how to explain it" },
    { text: "the deadline moved closer while i was looking at it" },
    { text: "another day, another tab left open for homework" },
    { text: "the classroom wifi is choosing its moments" },
    { text: "i submitted it. now we wait." },
    { text: "office hours are underrated" },
    { text: "trying to remember which notebook has the notes" },
    { text: "the quiz was mostly a reading comprehension test" },
    { text: "school would be easier with a search bar" },
    { text: "the best study plan is one that starts" },
    { text: "i have a question, but the bell already rang" },
    { text: "there is always one more required tab" },
    { text: "the assignment portal is loading. eventually." }
];


const message = messages.concat(messages.filter(message => message.gif));

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