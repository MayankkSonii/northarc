/**
 * NorthArc — Main Application Logic
 * Handles: Loading screen, navigation, scroll reveals, service filters,
 * solution tabs, agent simulator, chat demo, ROI calculator, OCR demo,
 * tech explorer, process timeline, contact form submission, scroll-to-top.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════════════════
    // 1. LOADING SCREEN
    // ═══════════════════════════════════════════════════════════════════
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => loadingScreen.classList.add('hidden'), 2000);
        });
        // Fallback in case load event already fired
        setTimeout(() => loadingScreen.classList.add('hidden'), 2500);
    }


    // ═══════════════════════════════════════════════════════════════════
    // 2. HEADER — Scroll Sticky + Mobile Nav
    // ═══════════════════════════════════════════════════════════════════
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function onScroll() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 2.5 HERO SCROLLYTELLING LOGIC
    // ═══════════════════════════════════════════════════════════════════
    const heroTrack = document.querySelector('.hero-track');
    const themeBlocks = document.querySelectorAll('.theme-block');
    const neuralSphere = document.querySelector('.neural-sphere');
    
    if (heroTrack && themeBlocks.length > 0) {
        window.addEventListener('scroll', () => {
            const trackRect = heroTrack.getBoundingClientRect();
            // Total scrollable distance inside the hero track
            const scrollDistance = heroTrack.offsetHeight - window.innerHeight;
            let progress = -trackRect.top / scrollDistance;
            
            // Clamp progress
            progress = Math.max(0, Math.min(1, progress));
            
            // Export progress for the canvas background to read
            window.heroScrollProgress = progress;
            
            // Determine active theme
            let activeThemeIndex = 0;
            if (progress > 0.33 && progress <= 0.66) activeThemeIndex = 1;
            if (progress > 0.66) activeThemeIndex = 2;
            
            themeBlocks.forEach((block, index) => {
                if (index === activeThemeIndex) {
                    block.classList.add('active');
                } else {
                    block.classList.remove('active');
                }
            });

            // Visual Transformations on the Sphere
            if (neuralSphere) {
                // Rotate based on scroll progress
                const rotation = progress * 180; // 180 deg rotation
                // Pulse scale
                const scale = 1 + Math.sin(progress * Math.PI) * 0.15;
                
                neuralSphere.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            }
        }, { passive: true });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 3. NAVIGATION — Active Link on Scroll
    // ═══════════════════════════════════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });


    // ═══════════════════════════════════════════════════════════════════
    // 4. SCROLL REVEAL — Intersection Observer
    // ═══════════════════════════════════════════════════════════════════
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ═══════════════════════════════════════════════════════════════════
    // 5. COUNTER ANIMATION — Metrics
    // ═══════════════════════════════════════════════════════════════════
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounters() {
        counters.forEach(counter => {
            const target = counter.getAttribute('data-count');
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const isDecimal = target.includes('.');
            const endVal = parseFloat(target);
            const duration = 2000;
            const startTime = performance.now();

            function tick(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                const current = isDecimal
                    ? (eased * endVal).toFixed(1)
                    : Math.floor(eased * endVal);
                counter.textContent = prefix + current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }

            requestAnimationFrame(tick);
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 6. SERVICES — Category Filter
    // ═══════════════════════════════════════════════════════════════════
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            serviceCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (cat === 'all' || cardCat === cat) {
                    card.style.display = '';
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = 'fadeSlideUp 0.4s var(--ease-out) forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ═══════════════════════════════════════════════════════════════════
    // 7. SOLUTIONS — Tab Switching
    // ═══════════════════════════════════════════════════════════════════
    const solNavBtns = document.querySelectorAll('.sol-nav-btn');
    const solPanels = document.querySelectorAll('.sol-panel');

    solNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-sol');

            solNavBtns.forEach(b => b.classList.remove('active'));
            solPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(`sol-${tab}`);
            if (target) target.classList.add('active');
        });
    });

    if (solNavBtns.length > 0) solNavBtns[0].click();


    // ═══════════════════════════════════════════════════════════════════
    // 8. AGENT SIMULATOR
    // ═══════════════════════════════════════════════════════════════════
    const agentRunBtn = document.getElementById('agent-run-btn');
    const agentSteps = document.querySelectorAll('.agent-step');
    let agentRunning = false;

    if (agentRunBtn) {
        agentRunBtn.addEventListener('click', () => {
            if (agentRunning) return;
            agentRunning = true;
            agentRunBtn.disabled = true;
            agentRunBtn.textContent = '⟳ Executing Pipeline...';

            // Reset all steps
            agentSteps.forEach(s => {
                s.classList.remove('running', 'done');
                const st = s.querySelector('.agent-step-status');
                if (st) { st.textContent = 'idle'; st.className = 'agent-step-status st-idle'; }
            });

            let step = 0;
            const delays = [1800, 2200, 2500, 1600];

            function nextStep() {
                if (step >= agentSteps.length) {
                    agentRunBtn.disabled = false;
                    agentRunBtn.textContent = '▶ Execute Agent Pipeline';
                    agentRunning = false;
                    return;
                }

                // Complete previous step
                if (step > 0) {
                    agentSteps[step - 1].classList.remove('running');
                    agentSteps[step - 1].classList.add('done');
                    const prevSt = agentSteps[step - 1].querySelector('.agent-step-status');
                    if (prevSt) { prevSt.textContent = 'completed'; prevSt.className = 'agent-step-status st-ok'; }
                }

                // Activate current step
                agentSteps[step].classList.add('running');
                const curSt = agentSteps[step].querySelector('.agent-step-status');
                if (curSt) { curSt.textContent = 'processing'; curSt.className = 'agent-step-status st-run'; }

                setTimeout(() => { step++; nextStep(); }, delays[step] || 2000);
            }

            nextStep();
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 9. CHAT DEMO
    // ═══════════════════════════════════════════════════════════════════
    const chatLog = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');

    const chatReplies = {
        default: "I'm NorthArc's virtual demo assistant. For personalized architecture guidance, use our consultation form below.",
        agent: "Our <strong>AI Agents</strong> are autonomous software units that execute multi-step tasks — fetching data from APIs, querying vector stores, reasoning through LLMs, and writing results back to your systems. All with full audit trails.",
        automation: "We replace high-repetition manual workflows with <strong>Intelligent Automation</strong> pipelines — from invoice processing to customer intake routing — cutting operational costs by up to 85%.",
        security: "Security is foundational. We deploy inside <strong>isolated VPCs</strong>, enforce IAM policies, encrypt data at rest and in transit, and build SOC-2 ready audit logging into every pipeline.",
        cost: "Engagements typically start with a <strong>2-week Discovery Sprint</strong> ($8K-$15K) to map your data architecture and build a detailed project roadmap. Full builds range from $25K to $200K+ based on scope.",
        stack: "Our core stack: <strong>Python, FastAPI, LangChain, OpenAI GPT-4, TensorFlow, Docker, Kubernetes</strong> — deployed on AWS or GCP with vector databases (Pinecone, pgvector) for RAG systems.",
        rag: "We build <strong>Retrieval-Augmented Generation</strong> systems that connect your LLMs to proprietary knowledge bases — company wikis, technical docs, CRM data — providing accurate, cited responses.",
        data: "Our <strong>Data Science</strong> practice handles everything from exploratory analysis and feature engineering to building production-grade ML models for classification, regression, and anomaly detection.",
    };

    function findReply(text) {
        const q = text.toLowerCase();
        if (q.includes('agent')) return chatReplies.agent;
        if (q.includes('automat')) return chatReplies.automation;
        if (q.includes('secur') || q.includes('safety') || q.includes('complian')) return chatReplies.security;
        if (q.includes('cost') || q.includes('price') || q.includes('budget') || q.includes('consult')) return chatReplies.cost;
        if (q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('tool')) return chatReplies.stack;
        if (q.includes('rag') || q.includes('knowledge') || q.includes('retriev')) return chatReplies.rag;
        if (q.includes('data') || q.includes('analytic') || q.includes('ml')) return chatReplies.data;
        return chatReplies.default;
    }

    function addChatMsg(html, role) {
        if (!chatLog) return;
        const div = document.createElement('div');
        div.className = `chat-msg ${role}`;
        div.innerHTML = html;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function handleChat() {
        if (!chatInput) return;
        const val = chatInput.value.trim();
        if (!val) return;
        addChatMsg(val, 'user');
        chatInput.value = '';

        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot';
        typingDiv.innerHTML = '<em style="color:var(--text-muted)">Thinking...</em>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            addChatMsg(findReply(val), 'bot');
        }, 900);
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', handleChat);
    if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleChat(); });


    // ═══════════════════════════════════════════════════════════════════
    // 10. ROI CALCULATOR
    // ═══════════════════════════════════════════════════════════════════
    const sFte = document.getElementById('roi-fte');
    const sVol = document.getElementById('roi-vol');
    const sComp = document.getElementById('roi-comp');
    const vFte = document.getElementById('roi-fte-val');
    const vVol = document.getElementById('roi-vol-val');
    const vComp = document.getElementById('roi-comp-val');
    const rHours = document.getElementById('roi-hours');
    const rSave = document.getElementById('roi-savings');

    function calcROI() {
        if (!sFte || !sVol || !sComp) return;

        const ftes = parseInt(sFte.value);
        const vol = parseInt(sVol.value);
        const comp = parseInt(sComp.value);

        vFte.textContent = ftes;
        const volLabels = ['100 GB', '500 GB', '1 TB', '5 TB', '10 TB+'];
        vVol.textContent = volLabels[vol - 1] || '1 TB';
        const compLabels = ['Low', 'Medium', 'High'];
        vComp.textContent = compLabels[comp - 1] || 'Medium';

        const potential = [0.30, 0.55, 0.78][comp - 1];
        const volMult = 0.8 + vol * 0.08;
        const hours = Math.round(ftes * 1800 * potential * volMult);
        const savings = Math.round(hours * 55);

        animateNumber(rHours, hours, '');
        animateNumber(rSave, savings, '$');
    }

    function animateNumber(el, target, prefix) {
        if (!el) return;
        const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
        const duration = 500;
        const t0 = performance.now();

        function tick(now) {
            const p = Math.min((now - t0) / duration, 1);
            const val = Math.floor(p * (target - start) + start);
            el.textContent = prefix + val.toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    if (sFte) { sFte.addEventListener('input', calcROI); sVol.addEventListener('input', calcROI); sComp.addEventListener('input', calcROI); calcROI(); }


    // ═══════════════════════════════════════════════════════════════════
    // 11. OCR DEMO
    // ═══════════════════════════════════════════════════════════════════
    const ocrBtn = document.getElementById('ocr-run-btn');
    const ocrOutput = document.getElementById('ocr-output');
    let ocrRunning = false;

    if (ocrBtn && ocrOutput) {
        ocrBtn.addEventListener('click', () => {
            if (ocrRunning) return;
            ocrRunning = true;
            ocrBtn.disabled = true;
            ocrBtn.textContent = '⟳ Scanning...';
            ocrOutput.textContent = 'Detecting layout boundaries...';

            const steps = [
                { delay: 800, text: 'Detecting layout boundaries...\nClassifying table segments...' },
                { delay: 1600, text: 'Detecting layout boundaries...\nClassifying table segments...\nExtracting key-value pairs...' },
                { delay: 2800, text: JSON.stringify({
                    document_type: "invoice",
                    confidence: 0.994,
                    vendor: "Acme ML Corp",
                    date: "2026-06-15",
                    items: [{ desc: "GPU Compute Nodes H100", qty: 4, total: 148000 }],
                    subtotal: 148000,
                    tax: 11840,
                    grand_total: 159840
                }, null, 2) }
            ];

            steps.forEach(({ delay, text }) => {
                setTimeout(() => {
                    ocrOutput.textContent = text;
                    if (delay === steps[steps.length - 1].delay) {
                        ocrBtn.disabled = false;
                        ocrBtn.textContent = '▶ Run OCR Scan';
                        ocrRunning = false;
                    }
                }, delay);
            });
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 12. TECH STACK EXPLORER
    // ═══════════════════════════════════════════════════════════════════
    const techItems = document.querySelectorAll('.tech-item');
    const techTitle = document.getElementById('tech-title');
    const techCat = document.getElementById('tech-cat');
    const techDesc = document.getElementById('tech-desc');

    const techDatabase = {
        python: { title: 'Python', cat: 'Core Language', desc: 'The foundational language powering all our AI, data science, and machine learning systems. We write clean, production-grade Python — from high-performance data pipelines to asyncio-based API services.' },
        openai: { title: 'OpenAI', cat: 'Foundation Models', desc: 'We integrate GPT-4o, GPT-4 Turbo, and embedding models for advanced reasoning, contextual document parsing, structured data generation, and custom agent orchestration with function calling.' },
        langchain: { title: 'LangChain & LangGraph', cat: 'Agent Orchestration', desc: 'The primary framework for building our multi-step AI agents. We design stateful reasoning loops, tool-calling pipelines, and retrieval-augmented generation chains using LangChain and LangGraph.' },
        tensorflow: { title: 'TensorFlow & PyTorch', cat: 'Deep Learning', desc: 'Used for training custom neural networks — image classifiers, time-series forecasters, anomaly detectors, and NLP models — tailored to your proprietary data and deployment constraints.' },
        fastapi: { title: 'FastAPI', cat: 'API Layer', desc: 'Our API framework of choice. We bundle ML inference engines, agent endpoints, and data services into ultra-low-latency, auto-documented, production-ready REST and WebSocket APIs.' },
        aws: { title: 'Amazon Web Services', cat: 'Cloud Infrastructure', desc: 'Enterprise-grade hosting using SageMaker for ML, ECS/EKS for containers, S3 for storage, RDS for databases, Lambda for serverless — all within secure VPC architectures with IAM governance.' },
        gcp: { title: 'Google Cloud Platform', cat: 'Cloud & Vertex AI', desc: 'Leveraged for BigQuery data warehousing, Vertex AI model deployment, Cloud Run serverless containers, and high-throughput batch processing pipelines for AI workloads.' },
        docker: { title: 'Docker', cat: 'Containerization', desc: 'Every system we build runs in Docker containers — ensuring identical environments across development, staging, and production. Eliminates configuration drift and enables rapid deployment cycles.' },
        kubernetes: { title: 'Kubernetes', cat: 'Orchestration & Scale', desc: 'For enterprise clients, we deploy on Kubernetes clusters — enabling auto-scaling, self-healing, rolling updates, and GPU workload distribution for high-availability AI systems.' },
        vectordb: { title: 'Vector Databases', cat: 'AI Memory Layer', desc: 'We use Pinecone, Milvus, Weaviate, and pgvector to build semantic search and RAG architectures — indexing millions of document embeddings for instant, context-aware AI retrieval.' },
    };

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const key = item.getAttribute('data-tech');
            const data = techDatabase[key];
            if (!data) return;

            techItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const card = document.querySelector('.tech-detail');
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';

            setTimeout(() => {
                techTitle.textContent = data.title;
                techCat.textContent = data.cat;
                techDesc.textContent = data.desc;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200);
        });
    });

    if (techItems.length > 0) techItems[0].click();


    // ═══════════════════════════════════════════════════════════════════
    // 13. PROCESS TIMELINE
    // ═══════════════════════════════════════════════════════════════════
    const processNodes = document.querySelectorAll('.process-node');
    const processLine = document.querySelector('.process-line');
    let processAnimated = false;

    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !processAnimated) {
                processAnimated = true;
                animateProcess();
            }
        });
    }, { threshold: 0.2 });

    const processTrack = document.querySelector('.process-track');
    if (processTrack) processObserver.observe(processTrack);

    function animateProcess() {
        processNodes.forEach((node, i) => {
            setTimeout(() => {
                node.classList.add('lit');
                if (processLine) {
                    const pct = (i / (processNodes.length - 1)) * 90;
                    if (window.innerWidth > 1024) {
                        processLine.style.width = `${pct}%`;
                    } else {
                        processLine.style.height = `${pct}%`;
                    }
                }
            }, i * 500);
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 14. CONTACT FORM — Submit to Backend
    // ═══════════════════════════════════════════════════════════════════
    const contactForm = document.getElementById('inquiry-form');
    const formStatusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const payload = {
                name: document.getElementById('f-name').value.trim(),
                email: document.getElementById('f-email').value.trim(),
                company: document.getElementById('f-company').value.trim(),
                phone: document.getElementById('f-phone').value.trim(),
                service: document.getElementById('f-service').value,
                requirement: document.getElementById('f-requirement').value.trim(),
            };

            // Validate
            if (!payload.name || !payload.email || !payload.company || !payload.requirement) {
                formStatusMsg.style.color = '#ff5f57';
                formStatusMsg.textContent = 'Please complete all required fields.';
                return;
            }

            // Submit animation
            submitBtn.disabled = true;
            submitBtn.textContent = 'Establishing Secure Connection...';
            formStatusMsg.style.color = 'var(--blue-400)';
            formStatusMsg.textContent = 'Encrypting payload...';

            try {
                const res = await fetch('https://formspree.io/f/mlgybqgr', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });

                if (res.ok) {
                    formStatusMsg.style.color = '#28c840';
                    formStatusMsg.textContent = `✓ Consultation request secured. We'll reach out within 24 hours.`;
                    submitBtn.textContent = 'Request Submitted';
                    contactForm.reset();
                } else {
                    const data = await res.json();
                    throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Submission failed.');
                }

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Book a Consultation';
                    formStatusMsg.textContent = '';
                }, 5000);
            } catch (err) {
                formStatusMsg.style.color = '#ff5f57';
                formStatusMsg.textContent = `Error: ${err.message}`;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Book a Consultation';
            }
        });
    }


    // ═══════════════════════════════════════════════════════════════════
    // 15. SCROLL TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════════
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
