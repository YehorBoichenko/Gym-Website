/*------------ Show Menu ------------*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*------------ Menu Shown -----------------*/
/* Validation if constant exist */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
/*------------ Menu Hidden -----------------*/
/* Validation if constant exist */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*------------ Remove Mobile Menu  ------------*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*------------ Chaange Background Header ------------*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

/*------------ Scroll Sections Active Link ------------*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*------------Show Scroll Up-------------*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*------------ Scroll Reveal Animation ------------*/
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});
scrollReveal.reveal(`.home__data, .footer__container, .footer__group`);
scrollReveal.reveal(`.home__img`, { delay: 700, origin: "bottom" });
scrollReveal.reveal(`.logos__img, .program__card, .pricing__card`, {
  interval: 100,
});
scrollReveal.reveal(`.choose__img, .calculate__content`, { origin: "left" });
scrollReveal.reveal(`.choose__content, .calculate__img`, { origin: "right" });

/*------------ Calculate JS ------------*/
const calculateForm = document.getElementById("calculate-form");
const calculateCm = document.getElementById("calculate-cm");
const calculateKg = document.getElementById("calculate-kg");
const calculateMessage = document.getElementById("calculate-message");
const calculateBmi = (e) => {
  e.preventDefault();
  // If the fields have a value
  if (calculateCm.value === "" || calculateKg.value === "") {
    // add and remove color
    calculateMessage.classList.remove("color-green");
    calculateMessage.classList.add("color-red");
    // Show message
    calculateMessage.textContent = "Fill in the Height and Weight";
    // Remove message in 3 seconds
    setTimeout(() => {
      calculateMessage.textContent = "";
    }, 3000);
  } else {
    // Formula
    const cm = calculateCm.value / 100;
    const kg = calculateKg.value;
    const bmi = Math.round(kg / (cm * cm));
    // Health status
    if (bmi < 18.5) {
      // Add color and message
      calculateMessage.classList.add("color-green");
      calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny. `;
    } else if (bmi < 25) {
      calculateMessage.classList.add("color-green");
      calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy. `;
    } else {
      calculateMessage.classList.add("color-red");
      calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight. `;
    }
    // clear input field
    calculateCm.value = "";
    calculateKg.value = "";
    // Remove message
    setTimeout(() => {
      calculateMessage.textContent = "";
    }, 4000);
  }
};

calculateForm.addEventListener("submit", calculateBmi);
/*------------ Email JS ------------*/
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
const contactUser = document.getElementById("contact-user");
const sendEmail = (e) => {
  e.preventDefault();
  // Check if the field has value
  if (contactUser.value === "") {
    // Add and remove color
    contactMessage.classList.remove("color-green");
    contactMessage.classList.add("color-red");

    // Show message
    contactMessage.textContent = "You must enter yoour email.";
    // remove message in four seconds
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 4000);
  } else {
    // serviceID - templateID-#form - publicKey
    emailjs
      .sendForm(
        "service_kcnqics",
        "template_9ctrho5",
        "#contact-form",
        "uIEGn2lZHwnWXdl2a"
      )
      .then(
        () => {
          // show message and add color
          contactMessage.classList.add("color-green");
          contactMessage.textContent = "You registered successfully";
          // Remove message after four seconds
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 4000);
        },
        (error) => {
          // Mail sending error
          alert("OOOPS! SOMETHING HAS FAILED...", error);
        }
      );
    // Clear input field
    contactUser.value = "";
  }
};
contactForm.addEventListener("submit", sendEmail);
