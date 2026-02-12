const timelineButtons = document.querySelectorAll(".timeline-nav button");
const albumPages = document.querySelectorAll(".album-page");

// height of fixed timeline/nav
const NAV_OFFSET = document.querySelector(".timeline-nav").offsetHeight;

// Smooth scroll to album pages
timelineButtons.forEach(button => {
  button.addEventListener("click", () => {
    const targetDate = button.dataset.date;
    const targetSection = document.querySelector(`.album-page[data-date="${targetDate}"]`);

    if (targetSection) {
      // Scroll into view with top alignment, then offset for nav
      const top = targetSection.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top, behavior: "smooth" });

      // Update active button immediately
      timelineButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    }
  });
});

// Highlight active timeline button & fade in pages
window.addEventListener("scroll", () => {
  let currentSection = albumPages[0];

  albumPages.forEach(section => {
    const rect = section.getBoundingClientRect();

    // subtract nav offset to account for fixed nav
    if (rect.top - NAV_OFFSET < window.innerHeight * 0.75) {
      section.classList.add("visible");
      currentSection = section;
    } else {
      section.classList.remove("visible");
    }
  });

  timelineButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.date === currentSection.dataset.date
    );
  });
});
