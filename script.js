
const instruction = document.getElementById("instruction");
const grid = document.getElementById("grid");
const verifyBtn = document.getElementById("verifyBtn");
const message = document.getElementById("message");
const cameraSection = document.getElementById("cameraSection");

let stage = 0;

const stages = [
{ prompt:"Select all images containing bridges.", images:["bridge1.jpg","bridge2.jpg"] },
{ prompt:"Select trust images.", images:["smile.jpg","handshake.jpg"] },
{ prompt:"Select intention images.", images:["bike.jpg","stairs.jpg"] },
{ prompt:"Processing biometric data..." },
{ prompt:"Identity complete." }
];

function createGrid(images){
  grid.innerHTML="";
  images.forEach(img=>{
    const t=document.createElement("div");
    t.className="tile";
    t.style.backgroundImage=`url(images/${img})`;
    t.onclick=()=>t.classList.toggle("selected");
    grid.appendChild(t);
  });
}

function loadStage(){
  const s=stages[stage];
  instruction.innerText=s.prompt;
  message.innerText="";

  if(stage<=2){
    grid.style.display="grid";
    cameraSection.classList.add("hidden");
    createGrid(s.images);
  }
  else if(stage===3){
    grid.style.display="none";
    cameraSection.classList.remove("hidden");
  }
  else if(stage===4){
    grid.style.display="block";
    cameraSection.classList.add("hidden");
    grid.innerHTML=`<div class="end-screen">Your behavioral signature has been accepted.</div>`;
    verifyBtn.style.display="none";
  }
}

verifyBtn.onclick=()=>{
  stage++;
  loadStage();
};

loadStage();
