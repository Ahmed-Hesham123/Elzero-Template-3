// Add dark mode
const darkBtn = document.getElementById("dark-btn");
const body = document.querySelector("body");
darkBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// Add sticky header
const header = document.getElementById("header");
let prevScrollPos = window.scrollY;

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 0);
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    header.classList.remove("hidden");
    megamenu.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
    megamenu.classList.add("hidden");
  }

  if(megamenu.classList.contains("active")){
    header.classList.remove("hidden");
    megamenu.classList.remove("hidden");
  }

  prevScrollPos = currentScrollPos;
});

const otherLinksBtn = document.getElementById("other-links-btn");
const megamenu = document.querySelector(".megamenu");
otherLinksBtn.addEventListener("click", (eo) => {
  eo.target.classList.toggle("active");
  megamenu.classList.toggle("active");
});

const allMegamenuLinks = document.querySelectorAll(".megamenu li a");
allMegamenuLinks.forEach((link) => {
  link.addEventListener("click", (eo) => {
    otherLinksBtn.classList.remove("active");
    megamenu.classList.remove("active");
  });
});

const allMainNavLinks = document.querySelectorAll(
  ".main-nav li:not(:nth-of-type(4)) a"
);
for (const link of allMainNavLinks) {
  link.addEventListener("click", (eo) => {
    navigation.classList.remove("active");
    toggle.classList.remove("active");
  });
}

const allMainNavLinksNotOther = document.querySelectorAll(
  ".main-nav li:not(:nth-of-type(4)) a"
);
allMainNavLinksNotOther.forEach((link) => {
  link.addEventListener("click", (eo) => {
    otherLinksBtn.classList.remove("active");
    megamenu.classList.remove("active");
  });
});

// ************

const animationItems = document.querySelectorAll(".animation-item");

function checkVisibility() {
  animationItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    isVisible ? item.classList.add("show") : item.classList.remove("show");
  });
}

// Initial check on page load
checkVisibility();

// Check on scroll
window.addEventListener("scroll", checkVisibility);

// Fill the progresses
let progressSpans = document.querySelectorAll(".the-progress span");
let dataSpans = document.querySelectorAll(".data > span");
let skillsSection = document.querySelector(".our-skills");

let nums = document.querySelectorAll(".stats .number");
let statsSection = document.querySelector(".stats");
let started = false; // Function Started ? No

window.onscroll = function () {
  // Skills Animate Width
  if (window.scrollY >= skillsSection.offsetTop - 250) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  } else {
    progressSpans.forEach((span) => {
      span.style.width = "0";
    });
  }

  // Stats Increase Number
  if (window.scrollY >= statsSection.offsetTop - 250) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// Play Video
let videos = [
  "videos/JavaScript Algorithms - 1 - Introduction.mp4",
  "videos/JavaScript Algorithms - 2 - What is an Algorithm-.mp4",
  "videos/JavaScript Algorithms - 3 - Time and Space Complexity.mp4",
  "videos/JavaScript Algorithms - 4 - Big-O Notation.mp4",
  "videos/JavaScript Algorithms - 5 - Objects and Arrays Big-O.mp4",
  "videos/JavaScript Algorithms - 6 - Math Algorithms.mp4",
  "videos/JavaScript Algorithms - 7 - Fibonacci Sequence.mp4",
];
const video = document.getElementById("video");
const videoInfo = document.getElementById("video-info");
const videoTextElements = document.querySelectorAll(".video-text");
class VideoPlayer {
  constructor(videoElement, videoInfoElement, videoTextElements, videos) {
    this.video = videoElement;
    this.videoInfo = videoInfoElement;
    this.videoTextElements = videoTextElements;
    this.videos = videos;
    this.activeIndex = -1;

    this.setupVideoClickHandlers();
  }

  setActiveVideo(index) {
    this.videoTextElements.forEach((item, idx) => {
      item.classList.toggle("active", idx === index);
    });

    this.video.src = videos[index];
    this.videoInfo =
      this.videoTextElements[index].querySelector(".text").textContent;
  }

  setupVideoClickHandlers() {
    this.videoTextElements.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.setActiveVideo(index);
      });
    });
  }
}

const player = new VideoPlayer(video, videoInfo, videoTextElements, videos);
