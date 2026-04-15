const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "0";
canvas.style.opacity = "1";

let width, height;
let particles = [];

let particlesEnabled = true;
let particleOpacity = 1;
let targetOpacity = 1;
let fullyHidden = !particlesEnabled;

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

particlesEnabled = settings.particles;
targetOpacity = particlesEnabled ? 1 : 0;

// resize
function resize() {
    const dpr = window.devicePixelRatio || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// particles
function createParticles() {
    const count = Math.floor((width * height) / 8000);
    particles = Array.from({ length: count }, () => new Particle());
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.size = 0.5 + Math.random() * 1.5;

        this.speedX = 0.2 + Math.random() * 0.6;
        this.speedY = 0.2 + Math.random() * 0.6;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        if (this.y > height) this.y = 0;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );

        gradient.addColorStop(0, `rgba(255,255,255,${particleOpacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleResize() {
    const prevW = width || window.innerWidth;
    const prevH = height || window.innerHeight;

    resize();

    const scaleX = width / prevW;
    const scaleY = height / prevH;

    for (let p of particles) {
        p.x *= scaleX;
        p.y *= scaleY;
    }

    createParticles();
}

window.addEventListener("resize", handleResize);

function animate() {
    ctx.clearRect(0, 0, width, height);

    particleOpacity += (targetOpacity - particleOpacity) * 0.3;
    canvas.style.opacity = particleOpacity;

    if (particleOpacity < 0.1 && targetOpacity === 0 && !fullyHidden) {
        fullyHidden = true;
        canvas.style.display = "none";
    }

    if (targetOpacity === 1 && fullyHidden) {
        fullyHidden = false;
        canvas.style.display = "block";
    }

    if (!fullyHidden) {
        for (let p of particles) {
            p.update();
            p.draw();
        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener("settingsChanged", (e) => {
    particlesEnabled = e.detail.particles;
    targetOpacity = particlesEnabled ? 1 : 0;
});

resize();
createParticles();
animate();