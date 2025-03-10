document.addEventListener("DOMContentLoaded", () => {
  const raindropsContainer = document.querySelector(".raindrops");
  const dropletsContainer = document.querySelector(".droplets");
  const windowElement = document.querySelector(".window");
  const rainIntensitySlider = document.getElementById("rain-intensity");
  const raindropSizeSlider = document.getElementById("raindrop-size");
  const dayNightToggle = document.getElementById("day-night-toggle");
  const rainColorPicker = document.getElementById("rain-color");
  let numRaindrops = 500;
  let raindropBaseSize = 2; // Default base size
  let isNight = false;

  // Raindrop creation with size control
  function createRaindrop() {
    const raindrop = document.createElement("div");
    raindrop.className = "raindrop";
    const x = Math.random() * window.innerWidth;
    const dropWidth = raindropBaseSize + Math.random() * 2;
    const dropStretch = 2 + Math.random() * 3;
    const dropHeight = dropWidth * dropStretch;
    const speed = 1 + Math.random() * 2;

    raindrop.style.left = `${x}px`;
    raindrop.style.width = `${dropWidth}px`;
    raindrop.style.height = `${dropHeight}px`;
    raindrop.style.background = rainColorPicker.value;
    raindrop.style.animation = `fall ${speed}s linear infinite`;
    raindrop.style.animationDelay = `${Math.random() * -2}s`;

    raindropsContainer.appendChild(raindrop);

    // Remove raindrop after animation for performance
    setTimeout(() => {
      raindrop.remove();
    }, speed * 50000);
  }

  // Window droplet creation
  function createDroplet() {
    const droplet = document.createElement("div");
    droplet.className = "droplet";
    const x = Math.random() * window.innerWidth;
    droplet.style.left = `${x}px`;
    droplet.style.animationDelay = `${Math.random() * -5}s`;
    dropletsContainer.appendChild(droplet);
  }

  // Update raindrops based on intensity and size
  function updateRaindrops() {
    raindropsContainer.innerHTML = "";
    for (let i = 0; i < numRaindrops; i++) {
      createRaindrop();
    }
  }

  // Initial setup
  updateRaindrops();
  for (let i = 0; i < 50; i++) {
    createDroplet();
  }

  // User controls: Rain intensity
  rainIntensitySlider.addEventListener("input", (e) => {
    numRaindrops = parseInt(e.target.value);
    updateRaindrops();
  });

  // User controls: Raindrop size
  raindropSizeSlider.addEventListener("input", (e) => {
    raindropBaseSize = parseFloat(e.target.value);
    updateRaindrops();
  });

  // User controls: Day-night toggle
  dayNightToggle.addEventListener("click", () => {
    isNight = !isNight;
    windowElement.classList.toggle("night", isNight);
  });

  // User customization: Rain color
  rainColorPicker.addEventListener("input", () => {
    updateRaindrops();
  });

  // Responsive adjustments
  window.addEventListener("resize", () => {
    updateRaindrops();
  });
});
