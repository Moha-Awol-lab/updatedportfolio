document.addEventListener('DOMContentLoaded', function () {
    // Typed.js initialization for Home section
    if (document.querySelector('.typed-text')) {
        var typed = new Typed('.typed-text', {
            strings: ["Web Designer", "Information Systems Student", "Tech Enthusiast"],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true
        });
    }

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering fixed navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
             // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggler.classList.remove('active');
            }
        });
    });

    // Navbar Toggler for mobile
    const navToggler = document.querySelector('.nav-toggler');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggler && navMenu) {
        navToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggler.classList.toggle('active');
        });
    }


    // Contact Form Validation (your existing logic adapted)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            if (validateContactForm()) {
                // If validation is successful:
                // 1. You can use FormData to gather data
                // const formData = new FormData(contactForm);
                // for (var pair of formData.entries()) {
                //     console.log(pair[0]+ ': ' + pair[1]);
                // }
                // 2. Submit data via AJAX to a backend or service (e.g., Formspree, Netlify Forms)
                // For now, just an alert.
                alert("Form submitted successfully! (This is a demo - data not actually sent)");
                contactForm.reset(); // Optionally reset the form
            }
        });
    }

    function validateContactForm() {
        var name = contactForm.querySelector('input[name="name"]').value.trim();
        var sex = contactForm.querySelector('select[name="sex"]').value;
        var email = contactForm.querySelector('input[name="E-mail"]').value.trim();
        var phone = contactForm.querySelector('input[name="rollno"]').value.trim();
        var birthdate = contactForm.querySelector('input[name="birthday"]').value.trim();
        var message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name) {
            alert("Name must be filled out.");
            contactForm.querySelector('input[name="name"]').focus();
            return false;
        }
        if (!sex) {
            alert("Please select your sex.");
            contactForm.querySelector('select[name="sex"]').focus();
            return false;
        }
        if (!email) {
            alert("Email must be filled out.");
            contactForm.querySelector('input[name="E-mail"]').focus();
            return false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            contactForm.querySelector('input[name="E-mail"]').focus();
            return false;
        }
        if (!phone) {
            alert("Phone number must be filled out.");
            contactForm.querySelector('input[name="rollno"]').focus();
            return false;
        }
        const phonePattern = /^\+2519\d{8}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid Ethiopian phone number starting with '+2519' followed by 8 digits.");
            contactForm.querySelector('input[name="rollno"]').focus();
            return false;
        }
        if (!birthdate) {
            alert("Please enter your birth date.");
            contactForm.querySelector('input[name="birthday"]').focus();
            return false;
        }
        if (!message) {
            alert("Please enter a message.");
            contactForm.querySelector('textarea[name="message"]').focus();
            return false;
        }
        return true;
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbarHeight - 50; // Adjusted offset
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }


});