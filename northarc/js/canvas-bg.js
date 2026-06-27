/**
 * NorthArc — Scroll-Reactive Neural Network Background
 * Particles and binary streams shift, accelerate, and flow in response to scroll/swipe.
 */

(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };
    let animationId;
    let binaryStreams = [];
    
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        initBinaryStreams();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.35 + 0.25;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(29, 117, 255, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            // Apply scroll velocity to particle movement (particles fly upwards when scrolling down)
            this.x += this.vx;
            this.y += this.vy - scrollVelocity * 0.15;

            // Bounce / wrap coordinates
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            // Mouse interaction - gentle attraction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 0.7;
                    this.y += (dy / dist) * force * 0.7;
                }
            }
        }
    }

    // Binary Streams (Matrix Rain-like effect in deep blue)
    class BinaryStream {
        constructor(x) {
            this.x = x;
            this.y = Math.random() * canvas.height;
            this.speed = Math.random() * 1.2 + 0.4;
            this.fontSize = Math.floor(Math.random() * 5 + 9);
            this.chars = ['0', '1', 'f', 'x', 'a', 'b', 'c', 'd', 'e', '0', '1'];
            this.value = '0';
        }

        draw() {
            ctx.fillStyle = `rgba(29, 117, 255, 0.04)`; // very faint
            ctx.font = `${this.fontSize}px monospace`;
            ctx.fillText(this.value, this.x, this.y);
        }

        update() {
            // Flow speed is modulated by scroll speed and direction
            this.y += this.speed + scrollVelocity * 0.4;
            
            // Periodically randomize character value to make it dynamic
            if (Math.random() < 0.05) {
                this.value = this.chars[Math.floor(Math.random() * this.chars.length)];
            }

            if (this.y > canvas.height) {
                this.y = -20;
            }
            if (this.y < -20) {
                this.y = canvas.height;
            }
        }
    }

    function initParticles() {
        particles = [];
        const area = canvas.width * canvas.height;
        const count = Math.min(Math.floor(area / 9500), 150);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function initBinaryStreams() {
        binaryStreams = [];
        const count = Math.floor(canvas.width / 45); // spacing
        for (let i = 0; i < count; i++) {
            binaryStreams.push(new BinaryStream(i * 45));
        }
    }

    function drawConnections() {
        const maxDist = 140;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(29, 117, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw radial background gradient
        const grad = ctx.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.4, 0,
            canvas.width * 0.5, canvas.height * 0.4, Math.max(canvas.width, canvas.height) * 0.7
        );
        grad.addColorStop(0, '#02050b');
        grad.addColorStop(0.5, '#000000');
        grad.addColorStop(1, '#000000');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decay scroll velocity over time (friction)
        scrollVelocity *= 0.95;

        // Draw and update binary streams in background
        for (const stream of binaryStreams) {
            stream.update();
            stream.draw();
        }

        // Draw particles and lines
        for (const p of particles) {
            p.update();
            p.draw();
        }
        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    // Capture scroll speed and direction
    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        scrollVelocity = currentY - lastScrollY;
        lastScrollY = currentY;
    }, { passive: true });

    // Event listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resize();
        animate();
    });

    // Init
    resize();
    animate();
})();
