/* ================= TYPING EFFECT ================= */
const roles = ["Software Engineer", "MERN Developer", "Java DSA Lover"];
let i = 0,
  j = 0,
  del = false;

const typing = document.getElementById("typing");

function loop() {
  if (!typing) return;

  if (!del && j <= roles[i].length) {
    typing.innerHTML = roles[i].slice(0, j++);
  } else if (del && j >= 0) {
    typing.innerHTML = roles[i].slice(0, j--);
  }

  if (j === roles[i].length) del = true;
  if (j === 0 && del) {
    del = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(loop, 120);
}

loop();

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* ================= ACTIVE NAV ================= */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((sec) => {
    if (pageYOffset >= sec.offsetTop - 150) {
      current = sec.id;
    }
  });

  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* ================= NEON CURSOR ================= */
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ================= THREE PARTICLES ================= */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

const starsGeo = new THREE.BufferGeometry();
const starCount = 800;
const pos = [];

for (let i = 0; i < starCount; i++) {
  pos.push(
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200
  );
}

starsGeo.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(pos, 3)
);

const stars = new THREE.Points(
  starsGeo,
  new THREE.PointsMaterial({ color: 0x00ffff, size: 0.7 })
);

scene.add(stars);

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
