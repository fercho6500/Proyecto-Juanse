
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

/*Mouse pointer*/ 
const blob = document.getElementById("blob");

document.body.onpointermove = event => {
  const { clientX, clientY } = event;

  blob.style.left = `${clientX - 150}px`;
  blob.style.top = `${clientY - 150}px`;

  // Animate the position smoothly with a duration of your choice
  blob.animate({
    left: `${clientX - 150}px`,
    top: `${clientY - 150}px`
 }, {duration: 2000, fill: "forwards" });
};


/*scroll*/

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
xPercent: -100 * (box_items.length - 1),
scrollTrigger: {
  trigger: section_2,
  scrub: true,
  snap: 1 / (box_items.length - 1),
  start: "top 80px",
  end: "+=470"
}
});

gsap.set(".banner3d-3", { perspectiveOrigin: "center -100vh"});
gsap.to(".banner3d-3", {
  scrollTrigger: {
    trigger: ".banner3d-3",
    scrub: true,
    pin: false,
    start: "top bottom",
    end: "bottom top"
  },
  perspectiveOrigin: "center 100vh", 
  ease: "none"
});
/*seccion tatuadores scroll*/
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("foto-tatu")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("vertical-item")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".vertical__item").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      markers: false,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});





