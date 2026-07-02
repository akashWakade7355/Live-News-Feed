
const API_KEY = "4f8861a9c091499d893491e53d5c1ea2";

const newsContainer = document.getElementById("news-container");

async function fetchNews(city, category) {

    console.log(city);
    console.log(category);

    const query = `${city} ${category}`;

    const url =
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();
    console.log(data.articles);
    localStorage.setItem("newsArticles", JSON.stringify(data.articles));
    let storedData = JSON.parse(localStorage.getItem("newsArticles"));
    displayNews(storedData);
}

// Search using input box
async function searchNews() {
  
    const searchInput = document.getElementById("input").value.trim();

    if (!searchInput) {
        alert("Please enter a search term");
        return;
    }

    const url =
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchInput)}&apiKey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    displayNews(data.articles);
}


function displayNews(articles) {

    newsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {

        newsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    No news found.
                </div>
            </div>
        `;

        return;
    }

    articles.forEach(article => {

        newsContainer.innerHTML += `
            <div class="col-md-4 mb-4">

                <div class="card h-100 shadow-sm">

                    <img
                        src="${article.urlToImage || 'https://via.placeholder.com/300'}"
                        class="card-img-top"
                        alt="News Image"
                    >

                    <div class="card-body">

                        <h5 class="card-title">
                            ${article.title || "No Title"}
                        </h5>

                        <p class="card-text">
                            ${article.description || "No description available"}
                        </p>

                        <a
                            href="${article.url}"
                            target="_blank"
                            class="btn btn-primary"
                        >
                            Read More
                        </a>

                    </div>

                </div>

            </div>
        `;
    });
}

// Dropdown Search Elements
const cityDropdown = document.getElementById("city");
const categoryDropdown = document.getElementById("category");
const dropDownBtn = document.getElementById("dropdown-btn");

// Search Bar Button
const searchBtn = document.getElementById("search-btn");

// Search by City + Category
dropDownBtn.addEventListener("click", () => {
      document.getElementById("input").value="";
      console.log("hi");
    const city = cityDropdown.value;
    const category = categoryDropdown.value;

    if (
        city === "Choose City" ||
        category === "Choose Category" ||
        !city ||
        !category
    ) {
        alert("Please select both city and category.");
        return;
    }

    fetchNews(city, category);
});

// Search by Text Input
searchBtn.addEventListener("click", () => {
    searchNews();
});

window.addEventListener("DOMContentLoaded",()=>{
    const storedArticles=JSON.parse(localStorage.getItem("newsArticles"));

    if (storedArticles){
        displayNews(storedArticles);
    }
});