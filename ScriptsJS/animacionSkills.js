const letters = "abcdefghijklmnopqrstuvwxyz";
let timeout = null;

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".skill-item");
  const table = document.querySelector(".tech-table");

  items.forEach((item) => {
    const originalText = item.innerText;

    const startShuffling = () => {
      let iteration = 0;
      const originalValue = item.innerText;
      let timeout = null;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        clearInterval(interval);
        item.innerText = originalText; // Restaura el texto original
      }, 800);

      const interval = setInterval(() => {
        item.innerText = originalValue
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalValue[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= originalValue.length) {
          clearInterval(interval);
          item.innerText = originalText; // Restaura el texto original
        }

        iteration += 1 / 3;
      }, 100);
    };
    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        items.forEach((item) => startShuffling(item));
        observer.unobserve(entry.target); // Solo una vez
        }
    });
    },{threshold: 1.0}// 1.0 = 100% visible en pantalla
    ); 
    
    if (table) {
        observer.observe(table);
    }
  });
});