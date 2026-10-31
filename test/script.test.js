const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = readFileSync(path.join(__dirname, "../js/script.js"), "utf8");

function renderArticles(articles) {
  const newsContainer = { innerHTML: "" };
  const elements = new Map([
    ["news-container", newsContainer],
    ["city", { value: "", addEventListener() {} }],
    ["category", { value: "", addEventListener() {} }],
    ["dropdown-btn", { addEventListener() {} }],
    ["search-btn", { addEventListener() {} }],
    ["input", { value: "" }],
  ]);
  const context = {
    document: {
      getElementById(id) {
        return elements.get(id);
      },
      addEventListener() {},
    },
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    window: { addEventListener() {} },
    alert() {},
    fetch() {},
    console,
  };

  vm.runInNewContext(script, context);
  vm.runInNewContext(`displayNews(${JSON.stringify(articles)})`, context);
  return newsContainer.innerHTML;
}

test("shows a star rating out of five on article cards", () => {
  const html = renderArticles([{ title: "Rated article", starRating: 4.5 }]);

  assert.match(html, /Rating: 4\.5 \/ 5/);
});

test("shows a fallback when an article has no star rating", () => {
  const html = renderArticles([
    { title: "Unrated article", starRating: null },
    { title: "Rating omitted" },
  ]);

  assert.equal((html.match(/Rating: No rating yet/g) || []).length, 2);
});
