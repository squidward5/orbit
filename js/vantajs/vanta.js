let orbitVantaEffect = null;

function setVantaEnabled(enabled) {
    if (enabled && !orbitVantaEffect) {
        orbitVantaEffect = VANTA.FOG({
            el: ".vanta",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x104040,
            midtoneColor: 0x082020,
            lowlightColor: 0x041010,
            baseColor: 0x000000,
            blurFactor: 0.7,
            speed: 2,
            zoom: 1.5,
        });
    } else if (!enabled && orbitVantaEffect) {
        orbitVantaEffect.destroy();
        orbitVantaEffect = null;
    }
}

document.addEventListener("backgroundSettingChanged", (event) => {
    setVantaEnabled(event.detail.useVanta);
});

const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");
setVantaEnabled((savedSettings.background || "vanta") === "vanta");