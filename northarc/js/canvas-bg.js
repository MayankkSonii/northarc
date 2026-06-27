(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let dataLines = [];
    let dataPulses = [];
    let animationId;
    
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const colors = {
        pulse: 'rgba(77, 166, 255, 1)',
        pulseGlow: 'rgba(29, 117, 255, 0.6)',
        line: 'rgba(41, 98, 255, 0.1)'
    };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initDataLines();
    }

    class DataLine {
        constructor(y, angle) {
            this.y = y;
            this.baseY = y;
            this.angle = angle; // Slight angle for dynamism
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(0, this.y);
            ctx.lineTo(canvas.width, this.y + Math.tan(this.angle) * canvas.width);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        update() {
            // Slight vertical shift based on scroll for interactivity
            this.y = this.baseY - scrollVelocity * 0.1;
            // Gradually return to base Y (spring effect)
            this.y += (this.baseY - this.y) * 0.05;
        }
    }

    class DataPulse {
        constructor(line) {
            this.line = line;
            this.direction = Math.random() > 0.5 ? 1 : -1;
            this.x = this.direction === 1 ? -100 : canvas.width + 100;
            this.speed = (Math.random() * 10 + 5) * this.direction;
            this.length = Math.random() * 200 + 50;
            this.thickness = Math.random() * 1.5 + 1;
            this.active = true;
        }

        update() {
            // Scroll velocity affects horizontal speed slightly
            let currentSpeed = this.speed;
            if (scrollVelocity !== 0) {
                 currentSpeed += (scrollVelocity * 0.05 * this.direction);
            }
            
            this.x += currentSpeed;
            
            if ((this.direction === 1 && this.x > canvas.width + this.length + 100) ||
                (this.direction === -1 && this.x < -this.length - 100)) {
                this.active = false;
            }
        }

        draw() {
            const currentY = this.line.y + Math.tan(this.line.angle) * this.x;
            const tailX = this.x - this.length * this.direction;
            const tailY = this.line.y + Math.tan(this.line.angle) * tailX;

            ctx.beginPath();
            ctx.moveTo(this.x, currentY);
            ctx.lineTo(tailX, tailY);
            
            // Gradient for the pulse (bright head, fading tail)
            const gradient = ctx.createLinearGradient(this.x, currentY, tailX, tailY);
            gradient.addColorStop(0, colors.pulse);
            gradient.addColorStop(1, 'transparent');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.thickness;
            ctx.shadowBlur = 12;
            ctx.shadowColor = colors.pulseGlow;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
        }
    }

    function initDataLines() {
        dataLines = [];
        dataPulses = [];
        const numLines = Math.floor(canvas.height / 45); // Spacing between lines
        for (let i = 0; i < numLines; i++) {
            // Horizontal lines with random slight angles to create a perspective mesh
            const y = (i * 45) + (Math.random() * 20 - 10);
            const angle = (Math.random() - 0.5) * 0.12; 
            dataLines.push(new DataLine(y, angle));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark background gradient
        const grad = ctx.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, Math.max(canvas.width, canvas.height) * 0.8
        );
        grad.addColorStop(0, '#040914'); 
        grad.addColorStop(1, '#000000');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        scrollVelocity *= 0.92; // scroll friction

        // Draw underlying circuit lines
        for (let line of dataLines) {
            line.update();
            line.draw();
        }

        // Spawn new data pulses periodically
        if (Math.random() < 0.15) {
            const randomLine = dataLines[Math.floor(Math.random() * dataLines.length)];
            dataPulses.push(new DataPulse(randomLine));
        }

        // Update & draw pulses
        for (let i = dataPulses.length - 1; i >= 0; i--) {
            dataPulses[i].update();
            dataPulses[i].draw();
            if (!dataPulses[i].active) {
                dataPulses.splice(i, 1);
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
