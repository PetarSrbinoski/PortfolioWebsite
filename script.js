document.addEventListener("DOMContentLoaded", () => {
    /* ===== Theme Setup ===== */
    const root = document.documentElement;
    const themeToggle = document.querySelector(".theme-toggle");

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
        root.setAttribute("data-theme", storedTheme);
    } else {
        const prefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    function toggleTheme() {
        const current = root.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    /* ===== Mobile Navigation Toggle ===== */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* ===== Background Animation Circles ===== */
    const animationContainer = document.getElementById("background-animation");
    if (animationContainer) {
        const numberOfCircles = 7;

        for (let i = 0; i < numberOfCircles; i++) {
            const circle = document.createElement("div");
            circle.classList.add("circle");

            const size = Math.floor(Math.random() * 80) + 40; // 40–120px
            const left = Math.random() * 100; // 0–100%
            const delay = Math.random() * 25; // 0–25s
            const duration = 24 + Math.random() * 26; // 24–50s

            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.left = `${left}%`;
            circle.style.bottom = `-${size + 60}px`;
            circle.style.animationDelay = `${delay}s`;
            circle.style.animationDuration = `${duration}s`;

            animationContainer.appendChild(circle);
        }

        const hero = document.querySelector(".hero");
        if (hero) {
            hero.addEventListener("mousemove", (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const maxMove = 10;
                animationContainer.style.transform = `translate3d(${x * maxMove}px, ${y * maxMove}px, 0)`;
            });
        }
    }

    /* ===== Section Reveal on Scroll ===== */
    const contentSections = document.querySelectorAll(".content-section");
    if (contentSections.length) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.18,
            }
        );

        contentSections.forEach((section) => revealObserver.observe(section));
    }

    /* ===== Scroll Spy (Active Nav Link) ===== */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    if (navLinks.length && sections.length) {
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        navLinks.forEach((link) => {
                            if (link.getAttribute("href") === `#${id}`) {
                                link.classList.add("active");
                            } else {
                                link.classList.remove("active");
                            }
                        });
                    }
                });
            },
            {
                root: null,
                threshold: 0.4,
            }
        );

        sections.forEach((section) => spyObserver.observe(section));
    }

    /* ===== Project Filter Chips ===== */
    const filterChips = document.querySelectorAll(".filter-chip");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterChips.length && projectCards.length) {
        filterChips.forEach((chip) => {
            chip.addEventListener("click", () => {
                const filter = chip.getAttribute("data-filter");

                filterChips.forEach((c) => c.classList.remove("active"));
                chip.classList.add("active");

                projectCards.forEach((card) => {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }
});
