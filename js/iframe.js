const iframe = document.getElementById("frame");
const params = new URLSearchParams(window.location.search);
const url = params.get("url");

if (url) {
    sessionStorage.setItem("lastGameUrl", url);
}

const lastGame = sessionStorage.getItem("lastGameUrl");
if (lastGame) {
    iframe.src = lastGame;
}

if (window.location.pathname.endsWith("iframe.html")) {
    history.replaceState({}, document.title, "/iframe.html");
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
    const iframeSrc = iframe.src;

    if (!iframeSrc) {
        createNotification("no game loaded to be downloaded.");
        return;
    }

    try {
        const response = await fetch(iframeSrc);
        if (!response.ok) throw new Error("Fetch failed");

        const html = await response.text();
        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        let fileName = iframeSrc.split("/").pop().split("?")[0];
        fileName = fileName.replace(/\.html?$/i, "").replace(/[^a-z0-9_-]/gi, "");

        a.href = blobUrl;
        a.download = (fileName || "game") + ".html";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (err) {
        createNotification("this game cannot be downloaded due to browser security (CORS).");
        console.error(err);
    }
});

document.getElementById("l").addEventListener("click", async () => {
    if (iframe.src) {
        const urlthing = new URL(iframe.src, window.location.origin);
        const path = urlthing.pathname + urlthing.search;
        const link = `${window.location.origin}/iframe.html?url=${encodeURIComponent(path)}`;

        try {
            await navigator.clipboard.writeText(link);
            createNotification("copied link to clipboard!");
        } catch (err) {
            console.error(err);
            createNotification("failed to copy link to clipboard. check console");
        }
    }
});
