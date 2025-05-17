document.addEventListener('DOMContentLoaded', function () {
  // --- Typed.js initialization ---
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ["Web Designer", "Information Systems Student", "Tech Enthusiast"],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true
    });
  }

  // --- Navbar toggler (mobile menu) ---
  const navToggler = document.querySelector('.nav-toggler');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggler && navMenu) {
    navToggler.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggler.classList.toggle('active');
    });
  }

  // --- Smooth scrolling for navigation links ---
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const navbarHeight = document.querySelector('.navbar').offsetHeight;

      if (targetElement) {
        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }

      // Close mobile menu after clicking
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggler.classList.remove('active');
      }
    });
  });

  // --- Contact form validation (supports Netlify submission) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      if (!validateContactForm()) {
        event.preventDefault(); // Prevent submit if validation fails
      }
    });
  }

  // Validation function for contact form fields
  function validateContactForm() {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const sex = contactForm.querySelector('select[name="sex"]').value;
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const phone = contactForm.querySelector('input[name="phone"]').value.trim();
    const birthdate = contactForm.querySelector('input[name="birthday"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^\+2519\d{8}$/; // Ethiopian phone number format

    if (!name) return showError('name', "Name must be filled out.");
    if (!sex) return showError('sex', "Please select your sex.");
    if (!email || !emailPattern.test(email)) return showError('email', "Please enter a valid email address.");
    if (!phone || !phonePattern.test(phone)) return showError('phone', "Please enter a valid Ethiopian phone number starting with '+2519'.");
    if (!birthdate) return showError('birthday', "Please enter your birth date.");
    if (!message) return showError('message', "Please enter a message.");

    return true;
  }

  // Display error alert and focus the input
  function showError(fieldName, message) {
    alert(message);
    contactForm.querySelector(`[name="${fieldName}"]`)?.focus();
    return false;
  }

  // --- Set current year in footer dynamically ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Highlight active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    const scrollY = window.pageYOffset;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 50;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  });
});
