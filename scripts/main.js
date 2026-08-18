// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Typing effect for the terminal line
const typedEl = document.getElementById("typed-text");
const messages = [
  "rebuilding site...",
  "still worth the wait.",
  "thanks for stopping by.",
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedEl) {
  if (prefersReducedMotion) {
    // Skip the animation, just show the first message.
    typedEl.textContent = messages[0];
  } else {
    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const HOLD_TIME = 1600;

    function tick() {
      const current = messages[messageIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    tick();
  }
}