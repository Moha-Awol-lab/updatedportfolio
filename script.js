// Make sure Typed.js is included in HTML before this script
// <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
  // Typed.js initialization
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ["Web Designer", "Information Systems Student", "Tech Enthusiast"],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true
    });
  }

  // Form submit handler
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => alert("Thank you for your submission"))
        .catch(error => alert(error));
    });
  }

  // Smooth scrolling
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

      // Close mobile menu
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggler.classList.remove('active');
      }
    });
  });

  // Navbar toggler
  const navToggler = document.querySelector('.nav-toggler');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggler && navMenu) {
    navToggler.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggler.classList.toggle('active');
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateContactForm()) {
        alert("Form submitted successfully! (This is a demo - data not actually sent)");
        contactForm.reset();
      }
    });
  }

  function validateContactForm() {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const sex = contactForm.querySelector('select[name="sex"]').value;
    const email = contactForm.querySelector('input[name="E-mail"]').value.trim();
    const phone = contactForm.querySelector('input[name="rollno"]').value.trim();
    const birthdate = contactForm.querySelector('input[name="birthday"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^\+2519\d{8}$/;

    if (!name) return showError('name', "Name must be filled out.");
    if (!sex) return showError('sex', "Please select your sex.");
    if (!email || !emailPattern.test(email)) return showError('E-mail', "Please enter a valid email address.");
    if (!phone || !phonePattern.test(phone)) return showError('rollno', "Please enter a valid Ethiopian phone number starting with '+2519'.");
    if (!birthdate) return showError('birthday', "Please enter your birth date.");
    if (!message) return showError('message', "Please enter a message.");

    return true;
  }

  function showError(name, message) {
    alert(message);
    contactForm.querySelector(`[name="${name}"]`).focus();
    return false;
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    let scrollY = window.pageYOffset;
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
