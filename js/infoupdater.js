function updateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });

    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();

function updateBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const updateAllBatteryInfo = () => {
                const level = Math.round(battery.level * 100);
                const isCharging = battery.charging;
                
                document.getElementById('battery-text').textContent = `Battery: ${level}%`;
                
                if (isCharging) {
                    document.getElementById('battery-text').textContent += " (Charging)";
                    document.getElementById('battery-icon').src = "icons/nav/battery.svg";
                } else {
                    document.getElementById('battery-text').textContent += " (Not Charging)";
                    document.getElementById('battery-icon').src = "icons/nav/battery_notcharging.svg";
                }
            };

            updateAllBatteryInfo();

            battery.addEventListener('levelchange', updateAllBatteryInfo);
            battery.addEventListener('chargingchange', updateAllBatteryInfo);
        });
    } else {
        document.getElementById('battery-text').textContent = "Battery: N/A";
    }
}

updateBattery();