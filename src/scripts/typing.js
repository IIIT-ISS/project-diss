const text1 = [
  'This is "Meanius", our music webpage! On this site we have curated the best albums from great artists ;) ',
  "We believe that music is a universal language that brings people together, and we dedicate this platform to fellow music lovers.",
  "Our goal is to provide a platform for artists to showcase their talent and connect with their fans.",
  "We hope that our webpage will be a source of inspiration and entertainment for everyone.",
  "Thank you for visiting our page, and we hope you enjoy exploring all that we have to offer!",
];

const delay = 15;
let i = 0;

function typeEffect1() {
  if (i < text1.length) {
    const letters = text1[i].split("");
    let j = 0;
    const existingText = document.querySelector(".about1").innerHTML;
    document.querySelector(".about1").innerHTML = existingText + "<br><br>";
    const interval = setInterval(() => {
      document.querySelector(".about1").innerHTML += letters[j];
      j++;
      if (j >= letters.length) {
        clearInterval(interval);
        i++;
        setTimeout(typeEffect1, 300);
      }
    }, delay);
  }
}

const text2 = [
  "DISS, stands for duo for ISS, is a duo consisting of ",
  "Ankith Pai (ankith.pai@research.iiit.ac.in) and Abhiram Tilak (abhiram.tilak@research.iiit.ac.in)",
  "As we began working on our music review website, we drew inspiration from a number of other websites that we admired. ",
  "We looked at how they presented their content, how they engaged with their readers, and how they built a sense of community around their platform.",
  "One thing that stood out to us was how many of these websites were able to achieve great things with minimal resources. ",
  "They didn't have huge budgets or teams of people working around the clock. Instead, they focused on what really mattered: creating quality content.",
  "This inspired us to take a similar approach with our own website. We knew that we didn't have the same resources as some of the bigger players in the industry, but we also knew that we had something unique to offer. ",
  "By focusing on what we were good at and being resourceful with what we had, we were able to build a website that we're proud of.",
];

let k = 0;

function typeEffect2() {
  if (k < text2.length) {
    const letters = text2[k].split("");
    let j = 0;
    const existingText = document.querySelector(".about2").innerHTML;
    document.querySelector(".about2").innerHTML = existingText + "<br><br>";
    const interval = setInterval(() => {
      document.querySelector(".about2").innerHTML += letters[j];
      j++;
      if (j >= letters.length) {
        clearInterval(interval);
        k++;
        setTimeout(typeEffect2, 300);
      }
    }, delay);
  }
}

typeEffect1();
typeEffect2();
