document.addEventListener("DOMContentLoaded", () => {
    const defaultSettings = {
        antiClose: false,
        particles: true,
        infodisplay: true,
        background: "vanta",
        messages: true,
        cursor: true,
        overlay: true,
        deledao: false,
        deledaoOpacity: 0.6,
        tabhider: false,
    };

    const saved = JSON.parse(localStorage.getItem("settings")) || {};

    const settings = {
        ...defaultSettings,
        ...saved
    };

    const backgroundPathMigrations = {
        "images/bg.png": "icons/backgrounds/Dark.png",
        "images/Waves.webp": "icons/backgrounds/Waves.webp",
        "images/Beach.webp": "icons/backgrounds/Beach.webp",
        "images/Mountains.webp": "icons/backgrounds/Mountains.webp"
    };

    if (backgroundPathMigrations[settings.background]) {
        settings.background = backgroundPathMigrations[settings.background];
        saveSettings();
    }

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

    function setupCustomSelect(select, onChange) {
        if (!select || select.classList.contains("custom-select-native")) return;

        select.addEventListener("change", onChange);

        const customSelect = document.createElement("div");
        customSelect.className = "custom-select";
        select.parentNode.insertBefore(customSelect, select);
        customSelect.appendChild(select);
        select.classList.add("custom-select-native");

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "custom-select-trigger";
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        customSelect.insertBefore(trigger, select);

        const optionsMenu = document.createElement("div");
        optionsMenu.className = "custom-select-options";
        optionsMenu.setAttribute("role", "listbox");
        customSelect.appendChild(optionsMenu);

        const syncCustomSelect = () => {
            const selectedOption = select.options[select.selectedIndex];
            trigger.textContent = selectedOption ? selectedOption.textContent : "Select";
            optionsMenu.querySelectorAll(".custom-select-option").forEach(option => {
                option.classList.toggle("selected", option.dataset.value === select.value);
            });
        };

        Array.from(select.options).forEach(option => {
            const customOption = document.createElement("button");
            customOption.type = "button";
            customOption.className = "custom-select-option";
            customOption.dataset.value = option.value;
            customOption.textContent = option.textContent;
            customOption.addEventListener("click", () => {
                select.value = option.value;
                select.dispatchEvent(new Event("change", { bubbles: true }));
                optionsMenu.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
            });
            optionsMenu.appendChild(customOption);
        });

        select.addEventListener("change", syncCustomSelect);
        trigger.addEventListener("click", () => {
            const isOpen = optionsMenu.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(isOpen));
        });
        document.addEventListener("click", (event) => {
            if (!customSelect.contains(event.target)) {
                optionsMenu.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
            }
        });
        syncCustomSelect();
    }

    function syncOpacitySlider(slider) {
        const min = Number(slider.min);
        const max = Number(slider.max);
        const value = Number(slider.value);
        const progress = (value - min) / (max - min);
        const knobRadius = 9;
        const position = knobRadius + (slider.clientWidth - knobRadius * 2) * progress;

        slider.style.setProperty("--slider-progress", `${progress * 100}%`);
        slider.parentElement.style.setProperty("--slider-position", `${position}px`);

        const sliderTooltip = slider.parentElement.querySelector(".slider-tooltip");
        if (sliderTooltip) {
            sliderTooltip.textContent = `${Math.round(value * 100)}%`;
        }
    }

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

        document.body.style.backgroundImage = settings.background === "vanta"
            ? "none"
            : `url(${settings.background})`;
        document.dispatchEvent(new CustomEvent("backgroundSettingChanged", {
            detail: { useVanta: settings.background === "vanta" }
        }));

        const msgs = document.getElementById("message");
        if (msgs) {
            msgs.style.display = settings.messages ? "block" : "none";
        }

        const deledao = document.getElementById("noiseoverlay");
        const deledaoOpacity = document.getElementById("deledaoOpacity");

        if (deledao) {
            deledao.style.opacity = settings.deledao ? String(settings.deledaoOpacity) : "0";
        }

        if (deledaoOpacity) {
            deledaoOpacity.value = String(settings.deledaoOpacity);
            syncOpacitySlider(deledaoOpacity);
        }

        document.body.classList.toggle("hide-overlay", !settings.overlay);
        
        const cloakSelect = document.getElementById("cloakSelect");
        const backgroundSelect = document.getElementById("backgroundSelect");

        if (settings.tabhider) {
            if (!tabHider) {
                tabHider = document.createElement("div");
                tabHider.id = "tabHider";
                document.body.appendChild(tabHider);

                document.addEventListener("visibilitychange", handleTabHider);
            }
        } else {
            document.removeEventListener("visibilitychange", handleTabHider);

            if (tabHider) {
                tabHider.remove();
                tabHider = null;
            }
        }

        const cloaks = {
            none: { title: "orbit", icon: "icons/nav/logo.svg" },
            google: { title: "Google", icon: "icons/cloaks/Google.ico" },
            canvas: { title: "Dashboard", icon: "icons/cloaks/Canvas.ico" },
            drive: { title: "Home - Google Drive", icon: "icons/cloaks/Google Drive.png" },
            wayground: { title: "Wayground", icon: "icons/cloaks/Wayground.ico" },
            aware: { title: "Student", icon: "icons/cloaks/Aware.png" },
            deltamath: { title: "DeltaMath Student Application", icon: "icons/cloaks/DeltaMath.ico" },
            legendsoflearning: { title: "Awakening", icon: "icons/cloaks/Legends of Learning.ico" },
            hac: { title: "Classwork", icon: "icons/cloaks/HAC.ico" },
            gguhoh: { title: "Uh oh!", icon: "icons/cloaks/BlockedGG.png" },
            ggrestricted: { title: "Restricted", icon: "icons/cloaks/RestrictedGG.png" },
            contentkeeper: { title: "ContentKeeper", icon: "icons/cloaks/ContentKeeper.ico" },
            kahoot: { title: "Kahoot!", icon: "icons/cloaks/Kahoot!.ico" },
            blooket: { title: "Blooket", icon: "icons/cloaks/Blooket.ico" },
            gimkit: { title: "Gimkit", icon: "icons/cloaks/Gimkit.png" },
            nearpod: { title: "Nearpod", icon: "icons/cloaks/Nearpod.ico" },
            outlook: { title: "Outlook", icon: "icons/cloaks/Outlook.ico" },
            britannica: { title: "Britannica", icon: "icons/cloaks/Britannica.ico" },
            gale: { title: "Resources", icon: "icons/cloaks/Gale.ico" },
            typingclub: { title: "edclub", icon: "icons/cloaks/edclub.png" },
            gizmos: { title: "Gizmos", icon: "icons/cloaks/Gizmos.png" },
            quill: { title: "Quill", icon: "icons/cloaks/Quill.ico" },
            reflexmath: { title: "Student App", icon: "icons/cloaks/ReflexMath.ico" },
            desmos: { title: "Desmos", icon: "icons/cloaks/Desmos.ico" },
            canva: { title: "Canva", icon: "icons/cloaks/Canva.ico" },
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

        setupCustomSelect(cloakSelect, (e) => setCloak(e.target.value));

        if (backgroundSelect) {
            backgroundSelect.value = settings.background;
            setupCustomSelect(backgroundSelect, (e) => {
                settings.background = e.target.value;
                saveSettings();
                applySettings();
                updateUI();
            });
        }

        if (deledaoOpacity) syncOpacitySlider(deledaoOpacity);

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

    const deledaoOpacity = document.getElementById("deledaoOpacity");
    const sliderControl = deledaoOpacity?.parentElement;

    deledaoOpacity?.addEventListener("pointerdown", () => {
        sliderControl.classList.add("is-dragging");
    });
    deledaoOpacity?.addEventListener("pointerup", () => {
        sliderControl.classList.remove("is-dragging");
    });
    deledaoOpacity?.addEventListener("pointercancel", () => {
        sliderControl.classList.remove("is-dragging");
    });

    deledaoOpacity?.addEventListener("input", (event) => {
        const value = Math.round(Number(event.target.value) / 0.05) * 0.05;
        event.target.value = String(value);
        settings.deledaoOpacity = value;
        saveSettings();
        applySettings();
    });

    window.addEventListener("resize", () => {
        if (deledaoOpacity) syncOpacitySlider(deledaoOpacity);
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

let tabHider = null;

function handleTabHider() {
    if (!tabHider) return;

    if (document.hidden) {
        tabHider.style.transition = "none";
        tabHider.classList.add("show");
        tabHider.style.cursor = "pointer";

        tabHider.offsetHeight;

        tabHider.style.transition = "opacity 250ms ease";
    } else {
        if (tabHider.classList.contains("show")) {
            const onHiderClick = () => {
                tabHider.classList.remove("show");
            };
            tabHider.addEventListener("click", onHiderClick, { once: true });
        }
    }
}