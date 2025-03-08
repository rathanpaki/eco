// scrollAnimations.js
export const initScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );
  
    // Observe elements with the 'fade-in' class
    document.querySelectorAll(".fade-in").forEach((element) => {
      observer.observe(element);
    });
  };