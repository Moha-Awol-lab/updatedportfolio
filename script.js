document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Switcher (Dark/Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage or system preferences (Default is Dark Mode)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        let theme = 'dark';
        if (document.body.classList.contains('light-theme')) {
            theme = 'light';
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
        localStorage.setItem('theme', theme);
    });

    // ==========================================
    // 2. Custom Interactive Cursor
    // ==========================================
    const cursor = document.getElementById('custom-cursor');
    const cursorOutline = document.getElementById('custom-cursor-outline');
    
    if (cursor && cursorOutline && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Subtle lag for outline
            cursorOutline.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 250, fill: 'forwards' });
        });

        // Hover scale effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card-premium, .skill-tag, .filter-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--primary)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--cursor-color)';
            });
        });
    }

    // ==========================================
    // 3. Canvas Particle Background
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let numParticles = window.innerWidth < 768 ? 40 : 100;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = document.body.classList.contains('light-theme') ? 'rgba(37, 99, 235, 0.15)' : 'rgba(6, 182, 212, 0.2)';
                ctx.fill();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, idx) => {
                p.update();
                p.draw();

                // Connect close particles
                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = document.body.classList.contains('light-theme') 
                            ? `rgba(37, 99, 235, ${0.12 - dist / 1000})` 
                            : `rgba(6, 182, 212, ${0.15 - dist / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }

    // ==========================================
    // 4. Mobile Bottom Nav - Active link by scroll
    // ==========================================
    const allNavLinks = document.querySelectorAll('.nav-link');

    // ==========================================
    // 5. Active Link Highlight on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Highlight matching link in both desktop and mobile nav
                document.querySelectorAll(`.nav-link[href*=${sectionId}]`).forEach(l => l.classList.add('active'));
            } else {
                document.querySelectorAll(`.nav-link[href*=${sectionId}]`).forEach(l => l.classList.remove('active'));
            }
        });
    });


    // ==========================================
    // 6. Typed.js Setup
    // ==========================================
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                "Software Engineer", 
                "Full-Stack Developer", 
                "Mobile App Developer",
                "Bahir Dar University Graduate"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // ==========================================
    // 7. Stats Counter Up Animation
    // ==========================================
    const statsContainer = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statsContainer && statNumbers.length > 0) {
        let animated = false;

        const countUp = () => {
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const decimals = parseInt(stat.getAttribute('data-decimals')) || 0;
                const duration = 2000; // ms
                let startTime = null;

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const currentVal = progress * target;
                    
                    if (decimals > 0) {
                        stat.textContent = currentVal.toFixed(decimals);
                    } else {
                        stat.textContent = Math.floor(currentVal) + (target === 5 ? '+' : '');
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        stat.textContent = target.toFixed(decimals) + (target === 5 ? '+' : '');
                    }
                };
                requestAnimationFrame(step);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    countUp();
                    animated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }

    // ==========================================
    // 8. Projects Gallery Search & Filter
    // ==========================================
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-premium');

    const filterProjects = () => {
        const query = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = card.getAttribute('data-tech').toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesQuery = title.includes(query) || tags.includes(query);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;

            if (matchesQuery && matchesFilter) {
                card.style.display = 'flex';
                // Trigger quick enter transition
                gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 });
            } else {
                card.style.display = 'none';
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });

    // ==========================================
    // 9. Contact Form Validator
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = contactForm.querySelector('#name').value.trim();
            const sex = contactForm.querySelector('#sex').value;
            const email = contactForm.querySelector('#email').value.trim();
            const phone = contactForm.querySelector('#phone').value.trim();
            const birthday = contactForm.querySelector('#birthday').value;
            const message = contactForm.querySelector('#message').value.trim();

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Support +2519... (standard) or 09... / 07... (Ethiopian local formats)
            const phonePattern = /^(\+2519|\+2517|09|07)\d{8}$/;

            if (!name) {
                e.preventDefault();
                alert("Please enter your name.");
                return;
            }
            if (!sex) {
                e.preventDefault();
                alert("Please select your gender.");
                return;
            }
            if (!email || !emailPattern.test(email)) {
                e.preventDefault();
                alert("Please enter a valid email address.");
                return;
            }
            if (!phone || !phonePattern.test(phone)) {
                e.preventDefault();
                alert("Please enter a valid phone number (e.g. +251938966665 or 0938966665).");
                return;
            }
            if (!birthday) {
                e.preventDefault();
                alert("Please choose your birth date.");
                return;
            }
            if (!message) {
                e.preventDefault();
                alert("Please write a message before sending.");
                return;
            }
            
            // Prevent default post to avoid 501 on local python server
            e.preventDefault();

            // Construct form data for AJAX submission
            const formData = new FormData(contactForm);
            
            // Send request using Fetch/AJAX
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                alert("Thank you! Your message was submitted successfully.");
                contactForm.reset();
            })
            .catch((error) => {
                // Local dev fallback (e.g. Python local server doesn't support POST)
                if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
                    alert("Thank you! Your message was submitted successfully (Local Simulation).");
                    contactForm.reset();
                } else {
                    alert("Submission failed: " + error.message || error);
                }
            });
        });
    }

    // ==========================================
    // 10. GSAP Scroll Animations
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Reveal
        gsap.from('.hero-content > *', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });

        gsap.from('.hero-visual', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)'
        });

        // Scroll reveals for section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // About grid components reveal
        if (document.querySelector('.about-grid')) {
            gsap.from('.about-grid > *', {
                scrollTrigger: {
                    trigger: '.about-grid',
                    start: 'top 80%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });
        }

        // Skills card tags reveal
        gsap.utils.toArray('.skills-category').forEach(cat => {
            gsap.from(cat, {
                scrollTrigger: {
                    trigger: cat,
                    start: 'top 90%'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Project Cards Reveal
        if (document.getElementById('projects-grid')) {
            gsap.from('.project-card-premium', {
                scrollTrigger: {
                    trigger: '#projects-grid',
                    start: 'top 85%'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }
    }

    // ==========================================
    // 11. Footer Current Year
    // ==========================================
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 12. Interactive AI Chatbot Logic
    // ==========================================
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotForm = document.getElementById('chatbot-input-area');
    const chatbotBody = document.getElementById('chatbot-body');
    const quickQuestBtns = document.querySelectorAll('.quick-quest-btn');

    if (chatbotToggle && chatbotPanel && chatbotClose && chatbotForm && chatbotBody) {
        // Toggle Chat Panel
        chatbotToggle.addEventListener('click', () => {
            chatbotPanel.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotPanel.classList.remove('active');
        });

        // Chatbot Knowledgebase Dataset
        const chatbotDataset = {
            greetings: [
                "Hello! How can I assist you today? Feel free to ask about my developer skills, featured projects, or work history.",
                "Hi there! Nice to meet you. Ask me anything about my software engineering experience or B.Sc studies!",
                "Hey! I'm Moha's virtual assistant. I'm here to answer questions about his background and qualifications."
            ],
            skills: [
                "Mohammed is a skilled Full-Stack Developer & Mobile Engineer. His key technologies include:\n\n• **Languages**: Java (OOP), PHP, JavaScript, Python, SQL, HTML5, CSS3\n• **Frameworks**: Laravel (MVC), Flutter (Cross-platform), React, Vue.js\n• **Databases**: MySQL, SQLite\n• **Tools**: Git, GitHub, VS Code, Android Studio"
            ],
            projects: [
                "Mohammed has worked on several featured projects:\n\n1. **SkillLink Marketplace**: A service-provider marketplace built with Laravel, MySQL, and Vue/React.\n2. **Social Hub Platform**: A dynamic social networking app in Laravel & React.\n3. **Smart To-Do Application**: A cross-platform app built with Flutter and SQLite.\n4. **Online Marketing Manager**: An enterprise operations tracker built with PHP & MySQL.\n5. **Association Rule Explorer**: Data mining tool built in Python."
            ],
            education: [
                "Mohammed graduated with a Bachelor of Science (B.Sc) in Information Systems from Bahir Dar University. He scored a GPA of 3.64/4.00 and got 81% on the National Exit Exam. He is also pursuing a BA in Accounting & Finance at Ambassador College (expected graduation: 2027) to expand his financial analytics capabilities!"
            ],
            experience: [
                "Mohammed's professional journey includes:\n\n• **IT Operations Professional** at Ghion Homes Real Estate (Aug 2025 - Sept 2025): Managed local computing infrastructure, software environments, and technical documentation.\n• **Academic Instructor** (Jan 2022 - Jul 2022): Designed and facilitated hands-on educational sessions to improve student grades."
            ],
            contact: [
                "You can get in touch with Mohammed Awol via:\n\n• **Email**: awolmohammed214@gmail.com\n• **Phone**: +251938966665\n• **LinkedIn**: [Mohammed Awol](https://www.linkedin.com/in/mohammed-awol-a0463b343/)\n• **GitHub**: [Moha-Awol-lab](https://github.com/Moha-Awol-lab/)"
            ],
            default: [
                "I'm not sure I understood that perfectly. Try asking about his **skills**, **projects**, **education**, **experience**, or how to **contact** him!"
            ]
        };

        // Render message utility
        const appendMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}-message`;
            // Simple markdown formatter helper for bold, links, and line breaks
            let formattedText = text
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--accent); text-decoration: underline;">$1</a>');
            
            messageDiv.innerHTML = formattedText;
            chatbotBody.appendChild(messageDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        };

        // Render typing indicator utility
        const showTypingIndicator = () => {
            const indicatorDiv = document.createElement('div');
            indicatorDiv.className = 'typing-indicator';
            indicatorDiv.id = 'typing-indicator';
            indicatorDiv.innerHTML = '<span></span><span></span><span></span>';
            chatbotBody.appendChild(indicatorDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            return indicatorDiv;
        };

        // Get Bot Response Logic
        const getBotResponse = (input) => {
            const query = input.toLowerCase().trim();
            
            // 1. Check for specific topics first to avoid false-matching greetings
            if (query.includes('skill') || query.includes('tech') || query.includes('code') || query.includes('language') || query.includes('framework') || query.includes('programming') || query.includes('develop')) {
                return chatbotDataset.skills[0];
            }
            if (query.includes('project') || query.includes('portfolio') || query.includes('work') || query.includes('app') || query.includes('build') || query.includes('made') || query.includes('created')) {
                return chatbotDataset.projects[0];
            }
            if (query.includes('education') || query.includes('study') || query.includes('gpa') || query.includes('university') || query.includes('degree') || query.includes('exam') || query.includes('college') || query.includes('graduate')) {
                return chatbotDataset.education[0];
            }
            if (query.includes('experience') || query.includes('job') || query.includes('career') || query.includes('instructor') || query.includes('ghion') || query.includes('history')) {
                return chatbotDataset.experience[0];
            }
            if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('linkedin') || query.includes('github') || query.includes('call') || query.includes('write') || query.includes('address')) {
                return chatbotDataset.contact[0];
            }

            // 2. Check for greeting keywords using word boundary regex to avoid matching substrings (e.g. "hi" in "his")
            const greetingRegex = /\b(hi|hello|hey|greetings|greet|yo)\b/;
            if (greetingRegex.test(query)) {
                return chatbotDataset.greetings[Math.floor(Math.random() * chatbotDataset.greetings.length)];
            }

            return chatbotDataset.default[0];
        };

        // Handle user input submit
        const handleSendMessage = (messageText) => {
            if (!messageText.trim()) return;

            appendMessage(messageText, 'user');
            chatbotInput.value = '';

            const indicator = showTypingIndicator();

            setTimeout(() => {
                indicator.remove();
                const response = getBotResponse(messageText);
                appendMessage(response, 'bot');
            }, 800);
        };

        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSendMessage(chatbotInput.value);
        });

        // Quick Question Click Handlers
        quickQuestBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const questionText = btn.getAttribute('data-question');
                handleSendMessage(questionText);
            });
        });
    }
});
