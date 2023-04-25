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
  text1: " 3. Hearing this, our saviour \"Lorem Ipsum\"  travelled from CCNSB to Italy work on this. But Ipsum was ashtonished to see how much work was left for him to do in such a small span of time (he had to study for his  upcoming midsems too). But he didn't step back. ", 
  img: "../images/spotlight/2.jpg", 
  text2: "4. He sat for exactly one and half day working on it, and had to go through multiple obstacles including loud shitty metal music for 2 days straight. He finally gave up and took the Plan B. He went on a quest to find the forbidden  \"packs and potions\" fron liverpool.  ",    
},  
{    
  text1: "5. Two days later, Ipsum came out crawling off his dad's toolshed,  Defeated... Not from not being able to make something, but because the beast he  made overdosed and killed him. Before his last breath, he named the invention \"Chaat Gupta\" from Gupta dAInasty. ",    
  img: "../images/spotlight/3.jpg", 
  text2: "6. Everyone was frightened by Ipsum's death and feared Chaat from  taking over their livelyhood. Scientists all over the world worked on this to come with a solution to make Chaat generate something which takes infinite time to generate. Today we know this invention as PePe Lisa, poet, singer, rapper, songwriter. ",    
},  
{    
  text1: "7. People all over the world thought pepe lisa was always a working project and memed on Chaat for working indefinitely on it. But once Chaat released the Beta channel,  the critiques were silenced. Pepe Lisa was not AI but a frog.  which gained it some street rep.  ",    
  img: "../images/spotlight/4.jpg",  
  text2: "8. Everyone loved PepeLisa so much,  that he was now unstoppable. He raised to fame so quickly and took over the world to such an extent, that the generations to come  Through didn't even know his presence. So they eventually forgot about his existence. ",    
},
{    
  text1: "1. Once upon a time ago there was a poet named \"Lorem Ipsum\" whose job was to complete half-written poems by poets who had passed-away There used to live a mighty king named Von whose famous court poet \"Lil Nerdo Da Vucchi\" was assinated in the hood by the Romanians.  ",    
  img: "../images/spotlight/1.jpg",  
  text2: "2. The King took the revenge the opps got handled, but he still felt dissatisfied. He was eagerly waiting for the most recent work of Nerdo to get released now the work is left stagnated. The king tried putting a bounty of one pound. But unfortunately noone dared to show up, but one person. ",    
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
  }, 1000);

  // increment the quote index, and wrap around if needed
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

function startAnimation() {
  intervalId = setInterval(changeQuote, 5000);
}

function stopAnimation() {
  clearInterval(intervalId);
}

startAnimation();

// stop the animation on hover
const box = document.querySelector(".quote_list");
box.addEventListener("mouseover", stopAnimation);
box.addEventListener("mouseout", startAnimation);
