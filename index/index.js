const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      entry.target.classList.add("visible");
    } else {
      if (!entry.target.classList.contains("visible")) {
        entry.target.classList.remove("animate");
        }
    }
  })
}, { threshold: 0.2 })
  
const sections = document.querySelectorAll(".section")
  
sections.forEach((section) => {
  observer.observe(section)
});