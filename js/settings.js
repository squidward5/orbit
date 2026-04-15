document.addEventListener("DOMContentLoaded", () => {
    const defaultSettings = {
        antiClose: false,
        particles: true,
        infodisplay: true,
    };

    const saved = JSON.parse(localStorage.getItem("settings")) || {};

    const settings = {
        ...defaultSettings,
        ...saved
    };

    let allowExit = false;

    function saveSettings() {
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    function beforeUnloadHandler(e) {
        if (allowExit) return;

        e.preventDefault();
        e.returnValue = "";
    }

    function applySettings() {
        window.removeEventListener("beforeunload", beforeUnloadHandler);

        if (settings.antiClose) {
            window.addEventListener("beforeunload", beforeUnloadHandler);
        }

        const info = document.getElementById("info");
        if (info) {
            info.style.opacity = settings.infodisplay ? "1" : "0";
            info.style.pointerEvents = settings.infodisplay ? "auto" : "none";
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

    updateUI();
    applySettings();

    window.__setAllowExit = (value) => {
        allowExit = value;
    };
});