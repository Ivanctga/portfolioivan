/* ============================================
   PORTFOLIO — main.js
   Ivan Lopes | Front-End Developer
   ============================================ */

/*=============== HEADER SHADOW ON SCROLL ===============*/
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/*=============== MOBILE NAVIGATION ===============*/
const navToggle     = document.getElementById('nav-toggle');
const navMobile     = document.getElementById('nav-mobile');
const navMobileClose = document.getElementById('nav-mobile-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMobile.classList.add('open'));
}

if (navMobileClose) {
  navMobileClose.addEventListener('click', () => navMobile.classList.remove('open'));
}

// Close mobile nav when any link is clicked
if (navMobile) {
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
  });
}

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active-link', isActive);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

/*=============== SCROLL UP BUTTON ===============*/
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  scrollUpBtn.classList.toggle('show', window.scrollY >= 400);
});

/*=============== REVEAL ELEMENTS ON SCROLL ===============*/
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

/*=============== CONTACT FORM — EmailJS ===============*/
const contactForm    = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = 'Enviando…';
    btn.disabled = true;

    try {
      /*
       * INSTRUÇÕES PARA ATIVAR O ENVIO REAL:
       * 1. Crie uma conta em https://www.emailjs.com/
       * 2. Configure um serviço e um template
       * 3. Substitua as strings abaixo com suas credenciais
       * 4. Remova a linha "await new Promise..." e descomente a chamada emailjs
       *
       * await emailjs.sendForm(
       *   'SEU_SERVICE_ID',
       *   'SEU_TEMPLATE_ID',
       *   '#contact-form',
       *   'SUA_PUBLIC_KEY'
       * );
       */

      // Simulação de envio para demo (remova quando integrar o EmailJS)
      await new Promise(resolve => setTimeout(resolve, 1200));

      contactMessage.textContent = '✓ Mensagem enviada! Responderei em até 24h.';
      contactMessage.className = 'form__message';
      contactForm.reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      contactMessage.textContent = '✕ Erro ao enviar. Tente via WhatsApp ou e-mail direto.';
      contactMessage.className = 'form__message error';
    } finally {
      btn.innerHTML = '<i class="ri-send-plane-fill"></i> Enviar Mensagem';
      btn.disabled = false;

      // Limpa a mensagem de feedback após 6 segundos
      setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.className = 'form__message';
      }, 6000);
    }
  });
}
