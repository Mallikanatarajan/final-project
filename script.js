const instruction = document.getElementById("instruction");
const grid = document.getElementById("grid");
const verifyBtn = document.getElementById("verifyBtn");
const message = document.getElementById("message");
const captchaBox = document.getElementById("captchaBox");
const cameraSection = document.getElementById("cameraSection");

let stage = 0;

const stages = [
  {
    prompt: "Select all images containing bridges.",
    images: [
      "bridge1.jpg","bridge2.jpg","motorcycle.jpg",
      "bridge3.jpg","stairs.jpg","bridge4.jpg",
      "parkinggarage.jpg","bridge5.jpg","tunnel.jpg"
    ]
  },
  {
    prompt: "Select all images that resemble trust.",
    images: [
      "smile.jpg","cameraeye.jpg","family.jpg",
      "hallway.jpg","suburb.jpg","bridge_repeat.jpg",
      "handshake.jpg","ai_child.jpg","waitingroom.jpg"
    ]
  },
  {
    prompt: "Select all images containing human intention.",
    images: [
      "bike_upside.jpg","stairs_impossible.jpg","trafficbedroom.jpg",
      "duplicatepeople.jpg","meltingbridge.jpg","liminalhall.jpg",
      "missingeyes.jpg","cityfragment.jpg","stopsign.jpg"
    ]
  },
  {
    prompt: "Remain still during behavioral verification."
  },
  {
    prompt: "Identity synchronization complete."
  }
];

function createGrid(images) {
  grid.innerHTML = "";

  images.forEach(img => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.backgroundImage = `url(images/${img})`;

    tile.addEventListener("click", () => {
      tile.classList.toggle("selected");
    });

    grid.appendChild(tile);
  });
}

function loadStage() {
  const current = stages[stage];

  instruction.innerText = current.prompt;
  message.innerText = "";

  // STAGE 0–2 (image grid)
  if (stage <= 2) {
    grid.style.display = "grid";
    cameraSection.classList.add("hidden");
    createGrid(current.images);
  }

  // STAGE 3 (camera)
  else if (stage === 3) {
    grid.style.display = "none";
    cameraSection.classList.remove("hidden");
    message.innerText = "Do not interrupt synchronization.";
  }

  // STAGE 4 (transition)
  else if (stage === 4) {
    cameraSection.classList.add("hidden");
    grid.style.display = "none";
    message.innerText = `
      <div class="end-screen">
        <div>Your behavioral signature has been accepted.</div>
        <br>
        <div>Future verifications may reference:</div>

        <div class="database-text">
ARCHIVE LOG 44291-A

response hesitation: preserved
visual preference mapping: preserved
pattern uncertainty: preserved
emotional classification: incomplete
human confidence score: 49%
recommended use: training dataset
bridge recognition memory: copied

thank you for improving the system.
        </div>
      </div>
    `;

   
  }
}

verifyBtn.addEventListener("click", () => {

  if (stage >= stages.length - 1) return;

  stage++;
  console.log("Stage now:", stage);

  loadStage();
});

loadStage();