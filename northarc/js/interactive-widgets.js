document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. Solution Tabs & Demos switcher
    // ----------------------------------------------------------------
    const solutionBtns = document.querySelectorAll('.solutions-btn');
    const solutionContents = document.querySelectorAll('.solution-content');

    solutionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Deactivate all
            solutionBtns.forEach(b => b.classList.remove('active'));
            solutionContents.forEach(c => c.classList.remove('active'));

            // Activate current
            btn.classList.add('active');
            const targetContent = document.getElementById(`sol-${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Initialize first solution tab
    if (solutionBtns.length > 0) {
        solutionBtns[0].click();
    }


    // ----------------------------------------------------------------
    // 2. Interactive AI Agent Simulator
    // ----------------------------------------------------------------
    const agentBtn = document.getElementById('run-agent-btn');
    const agentNodes = document.querySelectorAll('#agent-simulator-box .agent-node');
    let isAgentRunning = false;

    if (agentBtn) {
        agentBtn.addEventListener('click', () => {
            if (isAgentRunning) return;
            isAgentRunning = true;
            agentBtn.disabled = true;
            agentBtn.textContent = 'Agent Executing...';

            // Reset nodes
            agentNodes.forEach(node => {
                node.classList.remove('active', 'completed');
                const label = node.querySelector('.agent-status-label');
                label.textContent = 'waiting';
                label.className = 'agent-status-label status-waiting';
            });

            // Step timeline
            let currentStep = 0;

            function runStep() {
                if (currentStep >= agentNodes.length) {
                    agentBtn.disabled = false;
                    agentBtn.textContent = 'Run Agent Simulation';
                    isAgentRunning = false;
                    return;
                }

                // Mark previous as completed
                if (currentStep > 0) {
                    const prevNode = agentNodes[currentStep - 1];
                    prevNode.classList.remove('active');
                    prevNode.classList.add('completed');
                    const prevLabel = prevNode.querySelector('.agent-status-label');
                    prevLabel.textContent = 'completed';
                    prevLabel.className = 'agent-status-label status-done';
                }

                // Activate current node
                const node = agentNodes[currentStep];
                node.classList.add('active');
                const label = node.querySelector('.agent-status-label');
                label.textContent = 'running';
                label.className = 'agent-status-label status-running';

                // Random delay for simulation feel
                const delays = [1500, 2000, 2500, 1800];
                setTimeout(() => {
                    currentStep++;
                    runStep();
                }, delays[currentStep] || 2000);
            }

            runStep();
        });
    }


    // ----------------------------------------------------------------
    // 3. Mock Chat Assistant Widget
    // ----------------------------------------------------------------
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if (chatSend && chatInput && chatLog) {
        function addMessage(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${sender}`;
            bubble.innerHTML = text;
            chatLog.appendChild(bubble);
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        function handleSend() {
            const val = chatInput.value.trim();
            if (!val) return;

            addMessage(val, 'user');
            chatInput.value = '';

            // Simulate typing response
            setTimeout(() => {
                let reply = "I'm a virtual demo assistant for **NorthArc**. For custom architecture builds, please book a direct consultation below!";
                const q = val.toLowerCase();

                if (q.includes('agent') || q.includes('automation')) {
                    reply = "Our custom **AI Agents** connect directly to your APIs. They handle structured tasks like customer intake, competitive analysis, and data mapping automatically.";
                } else if (q.includes('security') || q.includes('safety') || q.includes('data')) {
                    reply = "Security is our top priority. We implement SOC2-ready pipelines, secure vector stores, and isolated cloud hosting configurations (AWS/GCP VPCs) for all client systems.";
                } else if (q.includes('cost') || q.includes('price') || q.includes('consulting')) {
                    reply = "Engagements begin with a **2-week discovery sprint** to map data requirements, followed by modular production building. Let's schedule a session to estimate your exact project timeline!";
                } else if (q.includes('stack') || q.includes('technology') || q.includes('python')) {
                    reply = "We construct scalable systems using **Python, FastAPI, OpenAI, LangChain, and Docker/Kubernetes** orchestration layers to prevent vendor lock-in.";
                }

                addMessage(reply, 'system');
            }, 1000);
        }

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }


    // ----------------------------------------------------------------
    // 4. ROI Forecast Calculator Widget
    // ----------------------------------------------------------------
    const sliderFte = document.getElementById('calc-fte');
    const sliderVolume = document.getElementById('calc-volume');
    const sliderComplexity = document.getElementById('calc-complexity');

    const valFte = document.getElementById('val-fte');
    const valVolume = document.getElementById('val-volume');
    const valComplexity = document.getElementById('val-complexity');

    const resultSavings = document.getElementById('result-savings');
    const resultHours = document.getElementById('result-hours');

    if (sliderFte && sliderVolume && sliderComplexity) {
        function calculateROI() {
            const ftes = parseInt(sliderFte.value);
            const volume = parseInt(sliderVolume.value); // 1 = 100GB, 2=500GB, 3=1TB, 4=5TB, 5=10TB
            const complexity = parseFloat(sliderComplexity.value); // 1 = low, 2 = medium, 3 = high

            // Display UI values
            valFte.textContent = ftes;
            
            const volumeLabels = ["100 GB", "500 GB", "1 TB", "5 TB", "10 TB+"];
            valVolume.textContent = volumeLabels[volume - 1];

            const complexityLabels = ["Low Automation Complexity", "Medium Automation Complexity", "High/Enterprise Complexity"];
            valComplexity.textContent = complexityLabels[Math.floor(complexity) - 1];

            // ROI logic
            // Average worker cost $75,000/yr, average 1800 hrs/yr.
            // Automation potential: Low complexity = 30%, Med = 55%, High = 75%
            const automationPotential = [0.30, 0.55, 0.78][Math.floor(complexity) - 1];
            // Volume multiplier for complexity
            const volumeMultiplier = 0.8 + (volume * 0.08);

            const hoursSaved = Math.round(ftes * 1800 * automationPotential * volumeMultiplier);
            const annualSavings = Math.round(hoursSaved * 55); // value computed at $55/hr blend

            // Animate counter changes
            animateValue(resultHours, parseInt(resultHours.textContent.replace(/,/g, '')) || 0, hoursSaved, 500, '');
            animateValue(resultSavings, parseInt(resultSavings.textContent.replace(/[$,]/g, '')) || 0, annualSavings, 500, '$');
        }

        function animateValue(obj, start, end, duration, prefix = '') {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentVal = Math.floor(progress * (end - start) + start);
                obj.textContent = prefix + currentVal.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        sliderFte.addEventListener('input', calculateROI);
        sliderVolume.addEventListener('input', calculateROI);
        sliderComplexity.addEventListener('input', calculateROI);

        // Initial trigger
        calculateROI();
    }


    // ----------------------------------------------------------------
    // 5. Interactive Tech Stack Explorer
    // ----------------------------------------------------------------
    const techItems = document.querySelectorAll('.tech-item');
    const techTitle = document.getElementById('tech-detail-title');
    const techCategory = document.getElementById('tech-detail-cat');
    const techDesc = document.getElementById('tech-detail-desc');

    const techData = {
        python: {
            title: "Python",
            category: "Core Language",
            desc: "The foundational language for all AI, Data Science, and Machine Learning applications. We construct bulletproof backend logic and numerical computation layers utilizing clean, PEP-8 compliant Python architectures."
        },
        openai: {
            title: "OpenAI GPT Models",
            category: "Generative AI",
            desc: "We leverage state-of-the-art language models (GPT-4o, GPT-4, Embeddings) to build advanced agent logic, contextual document parsers, and custom chat portals with precise instruction execution."
        },
        langchain: {
            title: "LangChain",
            category: "Agent Framework",
            desc: "The premier framework for orchestrating LLM tool calling, structured reasoning loops, and multi-agent workflows. We design modular agent pipelines using LangChain & LangGraph to solve complex operations."
        },
        tensorflow: {
            title: "TensorFlow / PyTorch",
            category: "Deep Learning",
            desc: "Used to design, train, and deploy custom neural networks, regression forecast pipelines, and computer vision classification engines suited to your proprietary offline datasets."
        },
        fastapi: {
            title: "FastAPI",
            category: "Service API Layer",
            desc: "A high-performance, asynchronous web server framework in Python. We bundle machine learning inference pipes into ultra-low latency, auto-documented, enterprise REST/WebSocket APIs."
        },
        aws: {
            title: "Amazon Web Services (AWS)",
            category: "Cloud Infrastructure",
            desc: "The gold standard for enterprise hosting. We engineer secure architectures using SageMaker, ECS/EKS, S3, RDS, IAM controls, and isolated VPC networks for robust data governance."
        },
        gcp: {
            title: "Google Cloud Platform (GCP)",
            category: "Cloud & Vertex AI",
            desc: "Excellent platform for high-throughput AI pipelines. We leverage BigQuery for serverless data warehousing and Vertex AI for deployment scaling, matching client workload needs."
        },
        docker: {
            title: "Docker Containers",
            category: "Deployment",
            desc: "Standardized environments ensuring your models execute identically in development, staging, and final enterprise production nodes. Prevents configuration drift and speeds deployment."
        },
        kubernetes: {
            title: "Kubernetes (K8s)",
            category: "Orchestration & Scale",
            desc: "Allows microservice systems, scaling web APIs, and dynamic GPU training workers to auto-scale, self-heal, and distribute workload loads without client systems interruption."
        },
        vectordb: {
            title: "Vector Databases",
            category: "AI Memory Layer",
            desc: "Utilizing databases like Pinecone, Milvus, and pgvector to enable Retrieval-Augmented Generation (RAG). Indexes millions of document vectors for instant semantic searches."
        }
    };

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const techKey = item.getAttribute('data-tech');
            const data = techData[techKey];

            if (data) {
                // Deactivate current active item
                techItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Animate content replacement
                const container = document.querySelector('.tech-detail-card');
                container.style.opacity = 0;
                container.style.transform = 'translateY(5px)';

                setTimeout(() => {
                    techTitle.textContent = data.title;
                    techCategory.textContent = data.category;
                    techDesc.textContent = data.desc;
                    container.style.opacity = 1;
                    container.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    });

    // Trigger first item initial display
    if (techItems.length > 0) {
        techItems[0].click();
    }
});
