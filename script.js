
      document.addEventListener("DOMContentLoaded", () => {
        /* ----------------------------------------------------------------------
               1. THEME TOGGLE (Dark / Light persistent preference)
               ---------------------------------------------------------------------- */
        const themeToggleBtn = document.getElementById("theme-toggle");
        const themeIcon = themeToggleBtn.querySelector("i");
        const savedTheme = localStorage.getItem("theme") || "dark";

        function setTheme(theme) {
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("theme", theme);
          if (theme === "light") {
            themeIcon.className = "fa-solid fa-sun";
          } else {
            themeIcon.className = "fa-solid fa-moon";
          }
        }

        // Set initial state
        setTheme(savedTheme);

        themeToggleBtn.addEventListener("click", () => {
          const currentTheme =
            document.documentElement.getAttribute("data-theme");
          setTheme(currentTheme === "dark" ? "light" : "dark");
        });

        /* ----------------------------------------------------------------------
               2. MOBILE HAMBURGER MENU ACCESSIBLE INTERACTION
               ---------------------------------------------------------------------- */
      
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents click from bubbling up
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('is-active');
      navMenu.classList.remove('is-open');
    }
  });

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      navMenu.classList.remove('is-open');
    });
  });
}

        /* ----------------------------------------------------------------------
               3. STICKY NAVBAR & BACK-TO-TOP OBSERVER
               ---------------------------------------------------------------------- */
        const navbar = document.getElementById("navbar");
        const backToTopBtn = document.getElementById("back-to-top");

        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }

          if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
          } else {
            backToTopBtn.classList.remove("visible");
          }
        });

        /* ----------------------------------------------------------------------
               4. ACTIVE NAVIGATION LINK HIGHLIGHTING
               ---------------------------------------------------------------------- */
        const sections = document.querySelectorAll("section[id]");

        function highlightNavOnScroll() {
          const scrollY = window.pageYOffset;

          sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navMatch = document.querySelector(
              `.nav-menu a[href*=${sectionId}]`,
            );

            if (navMatch) {
              if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight
              ) {
                navMatch.classList.add("active");
              } else {
                navMatch.classList.remove("active");
              }
            }
          });
        }

        window.addEventListener("scroll", highlightNavOnScroll);

        /* ----------------------------------------------------------------------
               5. HERO TYPING EFFECT
               ---------------------------------------------------------------------- */
        const typedTextElement = document.getElementById("typed-text");
        const titles = [
          "Full-Stack Applications",
          "Responsive Web Interfaces",
          "Modern Web Solutions",
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeEffect() {
          const currentTitle = titles[titleIndex];

          if (isDeleting) {
            typedTextElement.textContent = currentTitle.substring(
              0,
              charIndex - 1,
            );
            charIndex--;
            typingDelay = 50;
          } else {
            typedTextElement.textContent = currentTitle.substring(
              0,
              charIndex + 1,
            );
            charIndex++;
            typingDelay = 100;
          }

          if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingDelay = 1800; // Pause at end of word
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingDelay = 500;
          }

          setTimeout(typeEffect, typingDelay);
        }

        if (typedTextElement) {
          setTimeout(typeEffect, 1000);
        }

        /* ----------------------------------------------------------------------
               6. PROJECT CATEGORY FILTERING
               ---------------------------------------------------------------------- */
        const filterButtons = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");

        filterButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            // Update active tab button styling
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
              const categories = card.getAttribute("data-category");

              if (filterValue === "all" || categories.includes(filterValue)) {
                card.style.display = "flex";
                setTimeout(() => {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                }, 50);
              } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";
                setTimeout(() => {
                  card.style.display = "none";
                }, 300);
              }
            });
          });
        });

        /* ----------------------------------------------------------------------
               7. COPY EMAIL TO CLIPBOARD WITH FALLBACK
               ---------------------------------------------------------------------- */
        const copyEmailBtn = document.getElementById("copy-email-btn");
        const emailValue = document.getElementById("email-value").textContent;
        const toast = document.getElementById("toast");
        const toastMessage = document.getElementById("toast-message");

        function showToast(msg) {
          toastMessage.textContent = msg;
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }

        copyEmailBtn.addEventListener("click", () => {
          // Clipboard execution
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
              .writeText(emailValue)
              .then(() => showToast("Email copied to clipboard!"))
              .catch(() => fallbackCopyText(emailValue));
          } else {
            fallbackCopyText(emailValue);
          }
        });

        function fallbackCopyText(text) {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand("copy");
            showToast("Email copied to clipboard!");
          } catch (err) {
            showToast("Failed to copy email.");
          }
          document.body.removeChild(textArea);
        }

        /* 8. CONTACT FORM VALIDATION & EMAIL */

        // const DEV_EMAIL = "stanleyaugustine422@gmail.com"; // <-- Ensure your email is here

        // const contactForm = document.getElementById("contact-form");
        // const formFeedback = document.getElementById("form-feedback");

        // function showFormFeedback(message, type) {
        //   if (!formFeedback) {
        //     alert(message);
        //     return;
        //   }

        //   formFeedback.textContent = message;
        //   formFeedback.className = `form-feedback ${type}`;
        // }

        // if (contactForm) {
        //   contactForm.addEventListener("submit", function (e) {
        //     e.preventDefault();

        //     const name = document.getElementById("name").value.trim();
        //     const email = document.getElementById("email").value.trim();
        //     const subject = document.getElementById("subject").value.trim();
        //     const message = document.getElementById("message").value.trim();

        //     if (!name || !email || !subject || !message) {
        //       showFormFeedback("Please fill in all required fields.", "error");
        //       return;
        //     }

        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //     if (!emailRegex.test(email)) {
        //       showFormFeedback("Please enter a valid email address.", "error");
        //       return;
        //     }

        //     const mailtoSubject = encodeURIComponent(
        //       `[Portfolio Inquiry] ${subject}`,
        //     );
        //     const mailtoBody = encodeURIComponent(
        //       `Name: ${name}\n` +
        //         `Client Email: ${email}\n\n` +
        //         `Message:\n${message}`,
        //     );

        //     const mailtoUrl = `mailto:${DEV_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

        //     showFormFeedback(
        //       "Opening your email application. If it doesn't open automatically, please click the email link under 'Email Me' on the left.",
        //       "success",
        //     );

        //     // Safe dynamic link click (Bypasses popup blocker)
        //     const tempLink = document.createElement("a");
        //     tempLink.href = mailtoUrl;
        //     tempLink.style.display = "none";
        //     document.body.appendChild(tempLink);
        //     tempLink.click();
        //     document.body.removeChild(tempLink);
        //   });
        // }

        /* ----------------------------------------------------------------------
               9. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
               ---------------------------------------------------------------------- */
        const fadeElements = document.querySelectorAll(".fade-in");

        const observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0.15,
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("appear");
              observer.unobserve(entry.target); // Animate once
            }
          });
        }, observerOptions);

        fadeElements.forEach((el) => revealObserver.observe(el));

        /* ----------------------------------------------------------------------
               10. DYNAMIC COPYRIGHT YEAR
               ---------------------------------------------------------------------- */
        const yearSpan = document.getElementById("current-year");
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      });
    