/**
 * NorthArc — 3D Neural Constellation Gyroscope Visual
 * Renders an active, rotating 3D neural node network on the hero canvas.
 * Interactive rotation tilts based on cursor coordinates.
 */

(function () {
    const canvas = document.getElementById('hero-neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let nodes = [];
    let connections = [];
    let pulses = [];
    
    // Slow drift rotation angles when mouse is inactive
    let angleX = 0.002;
    let angleY = 0.003;
    let targetAngleX = 0.002;
    let targetAngleY = 0.003;
    
    const perspective = 300;
    let animationId;

    function resize() {
        const rect = canvas.parentNode.getBoundingClientRect();
        width = canvas.width = rect.width || 450;
        height = canvas.height = rect.height || 450;
    }

    class Node3D {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.baseSize = Math.random() * 2 + 2.5; // size
        }

        project() {
            const scale = perspective / (perspective + this.z);
            const px = width / 2 + this.x * scale;
            const py = height / 2 + this.y * scale;
            const size = this.baseSize * scale;
            
            // Brightness and opacity based on depth (z coordinate)
            const alpha = (perspective - this.z) / (perspective * 1.5);
            return { x: px, y: py, size: size, alpha: Math.min(1, Math.max(0.15, alpha)) };
        }

        rotate(ax, ay) {
            // Rotate Y axis
            let cosY = Math.cos(ay);
            let sinY = Math.sin(ay);
            let x1 = this.x * cosY - this.z * sinY;
            let z1 = this.z * cosY + this.x * sinY;

            // Rotate X axis
            let cosX = Math.cos(ax);
            let sinX = Math.sin(ax);
            let y2 = this.y * cosX - z1 * sinX;
            let z2 = z1 * cosX + this.y * sinX;

            this.x = x1;
            this.y = y2;
            this.z = z2;
        }
    }

    function init() {
        nodes = [];
        const numNodes = 26;
        const radius = Math.min(width, height) * 0.38;

        // Spherical distribution of nodes (Fibonacci lattice mapping for uniform layout)
        for (let i = 0; i < numNodes; i++) {
            const theta = Math.acos(1 - 2 * (i + 0.5) / numNodes);
            const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            nodes.push(new Node3D(x, y, z));
        }

        // Connect nodes to closest neighbors
        connections = [];
        for (let i = 0; i < nodes.length; i++) {
            const dists = [];
            for (let j = 0; j < nodes.length; j++) {
                if (i === j) continue;
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                dists.push({ index: j, dist: d });
            }
            dists.sort((a, b) => a.dist - b.dist);
            // Connect to nearest 2 neighbors
            for (let k = 0; k < 2; k++) {
                // Prevent duplicate connection definitions
                const duplicate = connections.some(c => (c.from === i && c.to === dists[k].index) || (c.from === dists[k].index && c.to === i));
                if (!duplicate) {
                    connections.push({ from: i, to: dists[k].index });
                }
            }
        }
    }

    class Pulse {
        constructor(conn) {
            this.conn = conn;
            this.progress = 0;
            this.speed = Math.random() * 0.012 + 0.008;
            this.direction = Math.random() > 0.5 ? 1 : -1; // path direction
            if (this.direction === -1) this.progress = 1;
        }

        update() {
            if (this.direction === 1) {
                this.progress += this.speed;
                return this.progress >= 1;
            } else {
                this.progress -= this.speed;
                return this.progress <= 0;
            }
        }
    }

    function update() {
        // Rotate nodes slightly based on drift/target
        angleX += (targetAngleX - angleX) * 0.04;
        angleY += (targetAngleY - angleY) * 0.04;

        for (const n of nodes) {
            n.rotate(angleX, angleY);
        }

        // Spawn signal pulses along connections
        if (Math.random() < 0.05 && connections.length > 0) {
            const idx = Math.floor(Math.random() * connections.length);
            pulses.push(new Pulse(connections[idx]));
        }

        // Update pulses
        for (let i = pulses.length - 1; i >= 0; i--) {
            if (pulses[i].update()) {
                pulses.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Project all nodes
        const projected = nodes.map(n => n.project());

        // Sort by Z index to draw back-to-front (painter's algorithm)
        const order = nodes.map((n, i) => ({ index: i, z: n.z })).sort((a, b) => b.z - a.z);

        // Draw connections
        ctx.lineWidth = 1;
        for (const conn of connections) {
            const p1 = projected[conn.from];
            const p2 = projected[conn.to];

            const alpha = Math.min(p1.alpha, p2.alpha) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(29, 117, 255, ${alpha})`;
            ctx.stroke();
        }

        // Draw pulses
        for (const p of pulses) {
            const p1 = projected[p.conn.from];
            const p2 = projected[p.conn.to];

            const px = p1.x + (p2.x - p1.x) * p.progress;
            const py = p1.y + (p2.y - p1.y) * p.progress;
            const alpha = Math.min(p1.alpha, p2.alpha);

            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(77, 166, 255, ${alpha})`;
            ctx.fill();
        }

        // Draw nodes in Z-order
        for (const ord of order) {
            const p = projected[ord.index];
            
            // Draw outer glow ring
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(29, 117, 255, ${p.alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw core node
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.strokeStyle = `rgba(29, 117, 255, ${p.alpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();
        }
    }

    function tick() {
        update();
        draw();
        animationId = requestAnimationFrame(tick);
    }

    // Dynamic rotation angle deflection based on mouse offset from center
    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        targetAngleY = dx * 0.00001;
        targetAngleX = dy * 0.00001;
    });

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resize();
        init();
        tick();
    });

    // Start
    resize();
    init();
    tick();
})();
