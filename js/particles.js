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

let width, height;
let particles2 = [];
let oldWidth = window.innerWidth;
let oldHeight = window.innerHeight;

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

function createParticles() {
    const count = Math.floor((width * height) / 8000);
    particles2 = Array.from({ length: count }, () => new Particle());
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

        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.y > height) this.y = 0;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );

        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleResize() {
    const prevW = oldWidth;
    const prevH = oldHeight;

    resize();

    const scaleX = width / prevW;
    const scaleY = height / prevH;

    for (let p of particles2) {
        p.x *= scaleX;
        p.y *= scaleY;
        p.speedX *= scaleX;
        p.speedY *= scaleY;
    }

    oldWidth = width;
    oldHeight = height;
}

window.addEventListener("resize", handleResize);

setInterval(resize, 500);

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles2) {
        p.update();
        p.draw();
    }

    requestAnimationFrame(animate);
}

resize();
createParticles();
animate();