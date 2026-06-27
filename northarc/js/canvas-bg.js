(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;
    let time = 0;
    
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    let targetX, targetY;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // The gyroscopic sphere is on the right side on desktop, center on mobile
        targetX = window.innerWidth > 768 ? canvas.width * 0.75 : canvas.width * 0.5;
        targetY = canvas.height * 0.5;
        initParticles();
    }

    class RiverParticle {
        constructor() {
            this.reset();
            // Randomize starting Y to fill the screen initially
            this.y = Math.random() * canvas.height; 
            for(let i=0; i<40; i++) {
                this.history.push({x: this.x, y: this.y});
            }
        }
        
        reset() {
            // Spawn mostly at the top left/center
            this.x = (Math.random() * canvas.width * 0.9) - 100;
            this.y = -20 - Math.random() * 150;
            this.vx = Math.random() * 0.8 + 0.2; // gentle drift right
            this.vy = Math.random() * 1.5 + 1.0; // gentle fall
            
            // Extremely delicate, thin lines
            this.size = Math.random() * 0.6 + 0.1; 
            this.baseAlpha = Math.random() * 0.3 + 0.05;
            
            this.noiseOffset = Math.random() * 1000;
            
            this.history = [];
            this.active = true;
        }

        update() {
            if (!this.active) return;
            
            // Wavy river flow using sine waves
            let wave = Math.sin(this.y * 0.003 + time * 0.005 + this.noiseOffset);
            
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let pullStrength = 0;
            if (dist < 600) {
                // Smooth gravitational pull towards the core
                pullStrength = Math.pow((600 - dist) / 600, 2) * 0.035;
                
                // Add a swirling (tangential) force when close
                if (dist < 300) {
                    const angle = Math.atan2(dy, dx);
                    // 90 degrees tangent
                    const tangentX = Math.cos(angle + Math.PI/2);
                    const tangentY = Math.sin(angle + Math.PI/2);
                    this.vx += tangentX * pullStrength * 0.8;
                    this.vy += tangentY * pullStrength * 0.8;
                }
            }
            
            this.vx += (wave * 0.015) + (dx * pullStrength * 0.01);
            this.vy += (dy * pullStrength * 0.01);
            
            // Fluid friction
            this.vx *= 0.985;
            this.vy *= 0.985;
            
            // Keep flowing downwards if not heavily pulled
            if (this.vy < 0.5 && pullStrength < 0.005) {
                this.vy += 0.02;
            }
            
            // Scroll interactivity
            this.y -= scrollVelocity * 0.15;
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.history.push({x: this.x, y: this.y});
            if (this.history.length > 45) { // Long elegant tails
                this.history.shift();
            }
            
            // Reset if it hits the core or falls way off screen
            if (dist < 25 || this.y > canvas.height + 150 || this.x > canvas.width + 150) {
                this.reset();
            }
        }
        
        draw() {
            if (!this.active || this.history.length < 2) return;
            
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            
            for (let i = 1; i < this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            
            // The tail is a delicate, faint line
            ctx.strokeStyle = `rgba(120, 190, 255, ${this.baseAlpha})`;
            ctx.lineWidth = this.size;
            ctx.stroke();
            
            // The head is a tiny bright spark of data
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 240, 255, ${this.baseAlpha + 0.3})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // Dense enough to look like a river, sparse enough to be delicate
        const count = Math.floor((canvas.width * canvas.height) / 7500); 
        for (let i = 0; i < count; i++) {
            particles.push(new RiverParticle());
        }
    }

    function animate() {
        // Very deep, elegant dark background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const grad = ctx.createRadialGradient(
            targetX, targetY, 0,
            canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height)
        );
        grad.addColorStop(0, '#040b1a'); // Faint deep blue glow around the processing core
        grad.addColorStop(1, '#010205'); // Deep midnight black edges
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        scrollVelocity *= 0.9;
        time += 1;

        // Draw a subtle "event horizon" absorption glow at the core
        ctx.beginPath();
        ctx.arc(targetX, targetY, 90, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, 90);
        coreGrad.addColorStop(0, 'rgba(29, 117, 255, 0.08)');
        coreGrad.addColorStop(0.5, 'rgba(29, 117, 255, 0.03)');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fill();

        for (let p of particles) {
            p.update();
            p.draw();
        }

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        scrollVelocity = currentY - lastScrollY;
        lastScrollY = currentY;
    }, { passive: true });

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resize();
        animate();
    });

    resize();
    animate();
})();
