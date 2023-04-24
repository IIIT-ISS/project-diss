// countdown


// Set the date we're counting down to
var countDownDate = new Date("June 1, 2023 00:00:00").getTime();

// Update the countdown every second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate the days, hours, minutes, and seconds remaining
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with the ID "countdown"
  document.getElementById("countdown").innerHTML = days + "d  " + hours + "h  "
  + minutes + "m  " + seconds + "s  ";

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);


// animation

const quotes = [  

{    
  text1: " 3. Hearing this, our saviour \"Lorem Ipsum\"\n\n travelled from CCNSB to Italy work on this.\n\nBut Ipsum was ashtonished to see how much\n\nwork was left for him to do in such a small\n\nspan of time (he had to study for his \n\nupcoming midsems too). But he didn't step\n\nback. He brushed his shoulders and immediately\n\nforked the incomplete project, to get done with.\n\n", 
  img: "../images/spotlight/2.jpg", 
  text2: "4. He sat for exactly one and half\n\nday working on it, and had to go through\n\nmultiple obstacles including loud shitty\n\nmetal music for 2 days straight.\n\nHe finally gave up and took the Plan B.\n\nHe went on a quest to find the forbidden \n\n\"packs and potions\" fron liverpool. \n\n",    
},  
{    
  text1: "5. Two days later, Ipsum\n\ncame out crawling off his dad's toolshed, \n\nDefeated... Not from not being able to\n\nmake something, but because the beast he \n\nmade overdosed and killed him.\n\nBefore his last breath, he named the\n\ninvention \"Chaat Gupta\" from Gupta dAInasty.\n\n",    
  img: "../images/spotlight/3.jpg", 
  text2: "6. Everyone was frightened by\n\nIpsum's death and feared Chaat from \n\ntaking over their livelyhood. Scientists\n\nall over the world worked on this to come\n\nwith a solution to make Chaat generate\n\nsomething which takes infinite time to\n\ngenerate. Today we know this invention as\n\nPePe Lisa, poet, singer, rapper, songwriter.\n\n",    
},  
{    
  text1: "7. People all over the world\n\nthought pepe lisa was always a\n\nworking project and memed on Chaat\n\nfor working indefinitely on it.\n\nBut once Chaat released the Beta channel, \n\nthe critiques were silenced.\n\nPepe Lisa was not AI but a frog. \n\nwhich gained it some street rep. \n\n",    
  img: "../images/spotlight/4.jpg",  
  text2: "8. Everyone loved PepeLisa so much, \n\nthat he was now unstoppable.\n\nHe raised to fame so quickly and\n\ntook over the world to such an\n\nextent, that the generations to come \n\nThrough didn't even know his presence.\n\nSo they eventually forgot about his existence.\n\n",    
},
{    
  text1: "1. Once upon a time ago\n\nthere was a poet named \"Lorem Ipsum\"\n\nwhose job was to complete half-written poems\n\nby poets who had passed-away\n\nThere used to live a mighty king named Von\n\nwhose famous court poet \"Lil Nerdo Da Vucchi\"\n\nwas assinated in the hood by the Romanians. \n\n",    
  img: "../images/spotlight/1.jpg",  
  text2: "2. The King took the revenge\n\nthe opps got handled, but he still\n\nfelt dissatisfied. He was eagerly waiting for\n\nthe most recent work of Nerdo to get released\n\nnow the work is left stagnated. The king tried\n\nputting a bounty of one pound. But unfortunately\n\nnoone dared to show up, but one person.\n\n",    
}  
];


let currentQuoteIndex = 0;
let intervalId;

function changeQuote() {
  // get the quote text and image elements
  const quote1Text = document.querySelector(".quote1");
  const quoteImg = document.querySelector(".photo");
  const quote2Text = document.querySelector(".quote2");


  quote1Text.classList.add("hidden");
  quoteImg.classList.add("hidden");
  quote2Text.classList.add("hidden");

  // update the quote text and image
  quote1Text.innerText = quotes[currentQuoteIndex].text1;
  quoteImg.src = quotes[currentQuoteIndex].img;
  quote2Text.innerText = quotes[currentQuoteIndex].text2;

  setTimeout(() => {
    quote1Text.innerText = quotes[currentQuoteIndex].text1;
    quoteImg.src = quotes[currentQuoteIndex].img;
    quote2Text.innerText = quotes[currentQuoteIndex].text2;
    quote1Text.classList.remove("hidden");
    quoteImg.classList.remove("hidden");
    quote2Text.classList.remove("hidden");
  }, 500);

  // increment the quote index, and wrap around if needed
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

function startAnimation() {
  intervalId = setInterval(changeQuote, 3000);
}

function stopAnimation() {
  clearInterval(intervalId);
}

startAnimation();

// stop the animation on hover
const box = document.querySelector(".quote_list");
box.addEventListener("mouseover", stopAnimation);
box.addEventListener("mouseout", startAnimation);
