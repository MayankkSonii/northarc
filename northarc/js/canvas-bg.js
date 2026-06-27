(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let dataPackets = [];
    let impactRipples = [];
    let bgNodes = [];
    let animationId;
    
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const colors = {
        primary: 'rgba(29, 117, 255, 1)',
        secondary: 'rgba(77, 166, 255, 0.8)',
        glow: 'rgba(29, 117, 255, 0.2)'
    };

    let centerX, centerY;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        initBgNodes();
    }

    // Background network nodes (slow, ambient)
    class BgNode {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy - scrollVelocity * 0.1; // subtle scroll effect
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    }

    // Data packets flowing towards the center
    class DataPacket {
        constructor() {
            this.reset();
        }
        
        reset() {
            // Spawn on the edges
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0) { this.x = Math.random() * canvas.width; this.y = -10; } // top
            else if (edge === 1) { this.x = canvas.width + 10; this.y = Math.random() * canvas.height; } // right
            else if (edge === 2) { this.x = Math.random() * canvas.width; this.y = canvas.height + 10; } // bottom
            else { this.x = -10; this.y = Math.random() * canvas.height; } // left
            
            this.speed = Math.random() * 2 + 1;
            this.size = Math.random() * 2 + 1.5;
            this.active = true;
            this.trail = [];
        }

        update() {
            if (!this.active) return;
            
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Accelerate as it gets closer
            const currentSpeed = this.speed + (1000 / Math.max(dist, 50));
            
            this.x += (dx / dist) * currentSpeed;
            this.y += (dy / dist) * currentSpeed - scrollVelocity * 0.15;
            
            this.trail.push({x: this.x, y: this.y});
            if (this.trail.length > 20) {
                this.trail.shift();
            }
            
            if (dist < 40) {
                // Impact!
                this.active = false;
                impactRipples.push(new Ripple(centerX, centerY));
            }
        }
        
        draw() {
            if (!this.active) return;
            
            // Draw trail
            if (this.trail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (let i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
                ctx.strokeStyle = colors.glow;
                ctx.lineWidth = this.size;
                ctx.stroke();
            }
            
            // Draw packet
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.primary;
            ctx.shadowBlur = 15;
            ctx.shadowColor = colors.primary;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Impact ripples
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 40;
            this.alpha = 0.8;
            this.speed = Math.random() * 1.5 + 1;
        }
        
        update() {
            this.radius += this.speed;
            this.alpha -= 0.015;
        }
        
        draw() {
            if (this.alpha <= 0) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(29, 117, 255, ${this.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    function initBgNodes() {
        bgNodes = [];
        const count = Math.floor((canvas.width * canvas.height) / 12000);
        for (let i = 0; i < count; i++) {
            bgNodes.push(new BgNode());
        }
    }

    function drawBgConnections() {
        const maxDist = 150;
        for (let i = 0; i < bgNodes.length; i++) {
            for (let j = i + 1; j < bgNodes.length; j++) {
                const dx = bgNodes[i].x - bgNodes[j].x;
                const dy = bgNodes[i].y - bgNodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(bgNodes[i].x, bgNodes[i].y);
                    ctx.lineTo(bgNodes[j].x, bgNodes[j].y);
                    ctx.strokeStyle = `rgba(29, 117, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw radial background gradient (sleek, professional dark mode)
        const grad = ctx.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height) * 0.8
        );
        grad.addColorStop(0, '#040914'); 
        grad.addColorStop(1, '#000000');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        scrollVelocity *= 0.95;

        // Draw ambient network
        for (let n of bgNodes) {
            n.update();
            ctx.beginPath();
            ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(77, 166, 255, 0.4)';
            ctx.fill();
        }
        drawBgConnections();

        // Spawn new data packets
        if (Math.random() < 0.1) {
            dataPackets.push(new DataPacket());
        }

        // Update & draw packets
        for (let i = dataPackets.length - 1; i >= 0; i--) {
            dataPackets[i].update();
            dataPackets[i].draw();
            if (!dataPackets[i].active) {
                dataPackets.splice(i, 1);
            }
        }

        // Update & draw impact ripples
        for (let i = impactRipples.length - 1; i >= 0; i--) {
            impactRipples[i].update();
            impactRipples[i].draw();
            if (impactRipples[i].alpha <= 0) {
                impactRipples.splice(i, 1);
            }
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
