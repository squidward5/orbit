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

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);

class particles {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = 2 + Math.random() * 3;

        this.speedX = 0.2 + Math.random() * 0.6;
        this.speedY = 0.2 + Math.random() * 0.6;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles2 = Array.from({ length: 120 }, () => new particles());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let d of particles2) {
        d.update();
        d.draw();
    }

    requestAnimationFrame(animate);
}

animate();