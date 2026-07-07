const bookmarkContainer = document.getElementById("bookmark-container");

const bookmarkedArticles =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

if (bookmarkedArticles.length === 0) {

    bookmarkContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-warning text-center">
                No bookmarked articles found.
            </div>
        </div>
    `;

} else {

    bookmarkedArticles.forEach((article) => {

        bookmarkContainer.innerHTML += `
            <div class="col-md-4 mb-4">

                <div class="card h-100 shadow-sm">

                    <img
                        src="${article.urlToImage || "https://via.placeholder.com/300"}"
                        class="card-img-top"
                        alt="News Image"
                    >

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">
                            ${article.title || "No Title"}
                        </h5>

                        <p class="card-text flex-grow-1">
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