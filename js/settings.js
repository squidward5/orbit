document.addEventListener("DOMContentLoaded", () => {
    const defaultSettings = {
        antiClose: false,
        particles: true,
        infodisplay: true,
        background: "images/bg.png",
        messages: true,
        cursor: true,
        overlay: true,
        deledao: false,
    };


    const saved = JSON.parse(localStorage.getItem("settings")) || {};

    const settings = {
        ...defaultSettings,
        ...saved
    };

    let antiCloseEnabled = false;
    let hasInteracted = false;

    function saveSettings() {
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    function beforeUnloadHandler(e) {
        if (allowExit) return;

        e.preventDefault();
        e.returnValue = "";
    }
    

    function enableAntiCloseIfNeeded() {
        if (settings.antiClose && hasInteracted && !antiCloseEnabled) {
            window.addEventListener("beforeunload", beforeUnloadHandler);
            antiCloseEnabled = true;
        } else if ((!settings.antiClose || !hasInteracted) && antiCloseEnabled) {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            antiCloseEnabled = false;
        }
    }

    ["click", "keydown", "touchstart"].forEach(event => {
        document.addEventListener(event, () => {
            hasInteracted = true;
            enableAntiCloseIfNeeded();
        }, { once: true });
    });

    function applySettings() {
        enableAntiCloseIfNeeded();

        if (settings.cursor) {
            document.body.classList.add("custom-cursor");
        } else {
            document.body.classList.remove("custom-cursor");
        }

        const info = document.getElementById("info");
        if (info) {
            info.style.opacity = settings.infodisplay ? "1" : "0";
            info.style.pointerEvents = settings.infodisplay ? "auto" : "none";
        }

        document.body.style.backgroundImage = `url(${settings.background})`;

        const msgs = document.getElementById("message");
        if (msgs) {
            msgs.style.display = settings.messages ? "block" : "none";
        }

        const deledao = document.getElementById("noiseoverlay");

        if (deledao) {
            deledao.style.opacity = settings.deledao ? "0.6" : "0"
        }

        document.body.classList.toggle("hide-overlay", !settings.overlay);
        
        const cloakSelect = document.getElementById("cloakSelect");

        const cloaks = {
            none: { title: "orbit", icon: "icons/nav/logo.svg" },
            google: { title: "Google", icon: "images/cloaks/Google.ico" },
            canvas: { title: "Dashboard", icon: "images/cloaks/Canvas.ico" },
            drive: { title: "Home - Google Drive", icon: "images/cloaks/Google Drive.png" },
            wayground: { title: "Wayground", icon: "images/cloaks/Wayground.ico" },
            aware: { title: "Student", icon: "images/cloaks/Aware.png" },
            deltamath: { title: "DeltaMath Student Application", icon: "images/cloaks/DeltaMath.ico" },
            legendsoflearning: { title: "Awakening", icon: "images/cloaks/Legends of Learning.ico" },
            hac: { title: "Classwork", icon: "images/cloaks/HAC.ico" },
            gguhoh: { title: "Uh oh!", icon: "images/cloaks/BlockedGG.png" },
            ggrestricted: { title: "Restricted", icon: "images/cloaks/RestrictedGG.png" },
            contentkeeper: { title: "ContentKeeper", icon: "images/cloaks/ContentKeeper.ico" },
            kahoot: { title: "Kahoot!", icon: "images/cloaks/Kahoot!.ico" },
            blooket: { title: "Blooket", icon: "images/cloaks/Blooket.ico" },
            gimkit: { title: "Gimkit", icon: "images/cloaks/Gimkit.png" },
            nearpod: { title: "Nearpod", icon: "images/cloaks/Nearpod.ico" },
            outlook: { title: "Outlook", icon: "images/cloaks/Outlook.ico" },
            britannica: { title: "Britannica", icon: "images/cloaks/Britannica.ico" },
            gale: { title: "Resources", icon: "images/cloaks/Gale.ico" },
            typingclub: { title: "edclub", icon: "images/cloaks/edclub.png" },
            gizmos: { title: "Gizmos", icon: "images/cloaks/Gizmos.png" },
            quill: { title: "Quill", icon: "images/cloaks/Quill.ico" },
            reflexmath: { title: "Student App", icon: "images/cloaks/ReflexMath.ico" },
            desmos: { title: "Desmos", icon: "images/cloaks/Desmos.ico" },
            canva: { title: "Canva", icon: "images/cloaks/Canva.ico" },
        };

        function setCloak(type) {
            const cloak = cloaks[type];
            if (!cloak) return;

            document.title = cloak.title;

            document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

            const link = document.createElement("link");
            link.rel = "icon";
            link.href = cloak.icon;
            document.head.appendChild(link);

            localStorage.setItem("tabCloak", type);
        }

        const savedCloak = localStorage.getItem("tabCloak");

        if (savedCloak) {
            setCloak(savedCloak);
            if (cloakSelect) {
                cloakSelect.value = savedCloak;
            }
        }

        if (cloakSelect) {
            cloakSelect.addEventListener("change", (e) => {
                setCloak(e.target.value);
            });
        }

        document.dispatchEvent(
            new CustomEvent("settingsChanged", {
                detail: { ...settings }
            })
        );
    }

    function parseValue(value) {
        if (value === "true") return true;
        if (value === "false") return false;
        if (!isNaN(value)) return Number(value);
        return value;
    }

    function updateUI() {
        document.querySelectorAll("[data-setting]").forEach(btn => {
            const setting = btn.dataset.setting;
            let value = parseValue(btn.dataset.value);

            btn.classList.toggle("active", settings[setting] === value);
        });

        document.querySelectorAll("[data-bg]").forEach(el => {
            el.classList.toggle(
                "active",
                settings.background === el.dataset.bg
            );
        });
    }

    document.querySelectorAll("[data-setting]").forEach(btn => {
        btn.addEventListener("click", () => {
            const setting = btn.dataset.setting;
            let value = parseValue(btn.dataset.value);

            settings[setting] = value;

            saveSettings();
            updateUI();
            applySettings();
        });
    });

    document.querySelectorAll("[data-bg]").forEach(el => {
        el.addEventListener("click", () => {
            settings.background = el.dataset.bg;

            saveSettings();
            applySettings();
            updateUI();
        });
    });

    updateUI();
    applySettings();

    window.__setAllowExit = (value) => {
        allowExit = value;
    };
});

// cloak popup
const cloakBtn = document.getElementById("cloak");

if (cloakBtn) {
    cloakBtn.addEventListener("click", () => {
        const newTab = window.open("about:blank", "_blank");
        if (!newTab) return;

        newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: hidden;
                  }
                  iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                  }
                </style>
              </head>
              <body>
                <iframe src="${window.location.href}"></iframe>
              </body>
            </html>
        `);

        newTab.document.close();
    });
}

let allowExit = false;

