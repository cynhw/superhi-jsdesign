const irisLeft = document.querySelector("div.iris-left");
const irisRight = document.querySelector("div.iris-right");

let interval = null;

// move the eyes every 3 seconds

const startInterval = function() {
  clearInterval(interval);
  
  interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    moveEyes(irisLeft, x, y);
    moveEyes(irisRight, x, y);
  }, 3000);
}

const moveEyes = function(tag, mouseX, mouseY) {
  const eyeMidX = tag.getBoundingClientRect().left;
  const eyeMidY = tag.getBoundingClientRect().top;

  // find the difference between the eye and the mouse

  const diffX = mouseX - eyeMidX;
  const diffY = mouseY - eyeMidY;

  // pythagorus theorem

  const diff = Math.sqrt(diffX * diffX + diffY * diffY);

  // what is the capped radius?
  // if it's closer to the eye, let it be the div

  const radius = Math.min(3, diff);

  // tan in math
  const angle = Math.atan2(diffY, diffX);

  // let's get the capped version of this, based on the angle

  const cappedX = radius * Math.cos(angle);
  const cappedY = radius * Math.sin(angle);

  const eyeTag = tag.querySelector("div");

  eyeTag.style.left = cappedX + "px";
  eyeTag.style.top = cappedY + "px";
};

startInterval();

document.addEventListener("mousemove", function(e) {
  startInterval();
  moveEyes(irisLeft, e.pageX, e.pageY);
  moveEyes(irisRight, e.pageX, e.pageY);
});