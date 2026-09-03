const iframe = document.getElementById("frame");
const params = new URLSearchParams(window.location.search);
let url = params.get("url");

if (url && url.startsWith("/")) {
    url = url.substring(1);
}

if (url) {
    sessionStorage.setItem("lastGameUrl", url);
}

const lastGame = sessionStorage.getItem("lastGameUrl");
if (lastGame) {
    iframe.src = "./" + lastGame;
}

if (window.location.pathname.includes("iframe.html")) {
    history.replaceState({}, document.title, "iframe.html");
}

let hoveredTooltip = null;

function setupTooltip(imgId, defaultText) {
    const img = document.getElementById(imgId);
    if (!img) return null;

    let wrapper = img.parentElement;
    if (!wrapper.classList.contains("btn-wrapper")) {
        wrapper = document.createElement("div");
        wrapper.className = "btn-wrapper";
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
    }

    // Create tooltip
    let tooltip = wrapper.querySelector(".tooltip");
    if (!tooltip) {
        tooltip = document.createElement("span");
        tooltip.className = "tooltip";
        tooltip.dataset.defaultText = defaultText;
        tooltip.textContent = defaultText;
        wrapper.appendChild(tooltip);
    }

    wrapper.addEventListener("mouseenter", () => {
        if (hoveredTooltip && hoveredTooltip !== tooltip) {
            hoveredTooltip.textContent = hoveredTooltip.dataset.defaultText;
        }
        hoveredTooltip = tooltip;
    });

    return tooltip;
}

const refreshTooltip = setupTooltip("r", "refresh");
const fullscreenTooltip = setupTooltip("f", "fullscreen");
const openTabTooltip = setupTooltip("b", "open in a new tab");
const downloadTooltip = setupTooltip("d", "download");
const linkTooltip = setupTooltip("l", "copy link");

document.getElementById("r")?.addEventListener("click", () => {
    iframe.src = iframe.src;
    if (refreshTooltip) refreshTooltip.textContent = "refreshed!";
});

document.getElementById("f")?.addEventListener("click", () => {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
});


function handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if (isFullscreen) {
        document.body.classList.add("fullscreen-active");
    } else {
        document.body.classList.remove("fullscreen-active");
    }
}

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);

document.getElementById("b")?.addEventListener("click", () => {
    if (iframe.src) {
        let newWindow = window.open("about:blank", "_blank");
        if (newWindow) {
            newWindow.location.href = iframe.src;
        }
    }       
});

// Download button event[cite: 1]
document.getElementById("d")?.addEventListener("click", () => {
    if (iframe.src) {
        const iframeUrl = iframe.src;
        
        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Game</title>
            <style>
                html, body {
                    width: 100vw;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                iframe {
                    width: 100vw;
                    height: 100vh;
                    border: none;
                    display: block;
                }
            </style>
        </head>
        <body>
            <iframe src="${iframeUrl}"></iframe>
        </body>
        </html>`;
        
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "game.html";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);

        if (downloadTooltip) downloadTooltip.textContent = "download started!";
    }
});

document.getElementById("l")?.addEventListener("click", async () => {
    if (!iframe.src) return;

    try {
        let gamePath = iframe.getAttribute("src");
        if (!gamePath) return;

        gamePath = gamePath.replace(window.location.origin, "");
        gamePath = gamePath.replace(/^file:\/\/\/[^/]+/, "");

        const baseUrl = window.location.href.split("?")[0];
        const shareLink = `${baseUrl}?url=${encodeURIComponent(gamePath)}`;

        await navigator.clipboard.writeText(shareLink);
        if (linkTooltip) linkTooltip.textContent = "link copied!";
    } catch (err) {
        console.error(err);
    }
});

const sidebarAd1 = document.getElementById("sidebarad1");
const sidebarAd2 = document.getElementById("sidebarad2");

if (iframe) {
    if (sidebarAd1) sidebarAd1.style.display = "none";
    if (sidebarAd2) sidebarAd2.style.display = "none";
}