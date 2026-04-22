const iframe = document.getElementById("frame");
const params = new URLSearchParams(window.location.search);
let url = params.get("url");

if (url && url.startsWith("/")) {
    url = url.substring(1); // remove leading slash
}

if (url) {
    sessionStorage.setItem("lastGameUrl", url);
}

const lastGame = sessionStorage.getItem("lastGameUrl");
if (lastGame) {
    iframe.src = "./" + lastGame;
}

if (window.location.pathname.endsWith("iframe.html")) {
    history.replaceState({}, document.title, "iframe.html");
}

document.getElementById("r").addEventListener("click", () => {
    iframe.src = iframe.src;
});

document.getElementById("f").addEventListener("click", () => {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
});

document.getElementById("b").addEventListener("click", () => {
    if (iframe.src) {
        window.open(iframe.src, "_blank");
    }
});

document.getElementById("d").addEventListener("click", async () => {
    let gamePath = iframe.getAttribute("src");

    if (!gamePath) {
        createNotification("no game loaded to be downloaded.");
        return;
    }

    try {
        // ensure clean relative path
        gamePath = gamePath.replace("./", "");

        const response = await fetch(gamePath);
        if (!response.ok) throw new Error("Fetch failed");

        const html = await response.text();

        // get title (fallback safe)
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        let title = titleMatch?.[1] || "game";

        // sanitize filename
        const fileName = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/gi, "")
            .trim() || "game";

        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${fileName}.htm`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(blobUrl);

        createNotification("game downloaded!");

    } catch (err) {
        alert("Exporting games will not work since you are running on the file:/// protocol, which browsers block many features from working for security reasons. Go to the g folder and find your game/app in there.");
    }
});

document.getElementById("l").addEventListener("click", async () => {
    if (!iframe.src) {
        createNotification("no game loaded.");
        return;
    }

    try {
        let gamePath = iframe.getAttribute("src");

        if (!gamePath) {
            createNotification("no game loaded.");
            return;
        }

        gamePath = gamePath.replace(window.location.origin, "");
        gamePath = gamePath.replace(/^file:\/\/\/[^/]+/, "");

        const baseUrl = window.location.href.split("?")[0];
        const shareLink = `${baseUrl}?url=${encodeURIComponent(gamePath)}`;

        await navigator.clipboard.writeText(shareLink);
        createNotification("copied link to clipboard!");
    } catch (err) {
        console.error(err);
        createNotification("failed to copy link to clipboard.");
    }
});