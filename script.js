const quoteContainer = document.getElementById("quote-container");

const quoteText = document.getElementById("quote");

const authorText = document.getElementById("author");

const twitterBtn = document.getElementById("twitter");

const newQuote = document.getElementById("new-quote");

const loader = document.getElementById("loader");

// show loader
function showloadingspinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loader
function removeloadingspinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// GET QUOTE FROM API
async function getQuote() {
   
    showloadingspinner();
  const proxyUrl = "https://shielded-wildwood-44200.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //passing our data into  our element

    //if author is blank add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //reduce font isze for long quote

    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;


       removeloadingspinner();
      
  } catch (error) {
      getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

//ad event listeners
newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// LOAD CODE
getQuote();

