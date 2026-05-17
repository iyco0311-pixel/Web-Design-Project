const searchItems = [
  { title: "Home", category: "Page", detail: "Fresh Coffee & Pastries, Every Day", url: "index.html" },
  { title: "About", category: "Page", detail: "Brand story, core value, and team", url: "about.html" },
  { title: "Menu Highlights", category: "Page", detail: "Featured coffee, cupcakes, and brunch", url: "menu.html" },
  { title: "Contact & Location", category: "Page", detail: "Address, opening hours, phone, and email", url: "contact.html" },
  { title: "Espresso Creations", category: "Coffee", detail: "$4.50 - Ethiopia & Colombia, caramel, cocoa, citrus", url: "espresso.html" },
  { title: "Americano", category: "Coffee", detail: "$4.75 - Clean, bold, and freshly pulled", url: "menu.html#full-menu-title" },
  { title: "Flat White", category: "Coffee", detail: "$5.25 - Velvety microfoam and double espresso", url: "menu.html#full-menu-title" },
  { title: "Latte", category: "Coffee", detail: "$5.50 - Smooth milk and espresso", url: "menu.html#full-menu-title" },
  { title: "Cold Brew", category: "Coffee", detail: "$5.75 - Slow-steeped and chilled", url: "menu.html#full-menu-title" },
  { title: "Signature Cupcakes", category: "Bakery", detail: "$5.00 - Baked fresh every morning in-house", url: "cupcakes.html" },
  { title: "Butter Croissant", category: "Bakery", detail: "$4.25 - Morning bakery favorite", url: "menu.html#full-menu-title" },
  { title: "Almond Danish", category: "Bakery", detail: "$4.75 - Flaky pastry and almond filling", url: "menu.html#full-menu-title" },
  { title: "Lemon Tart", category: "Bakery", detail: "$5.25 - Bright citrus and buttery crust", url: "menu.html#full-menu-title" },
  { title: "Seasonal Scone", category: "Bakery", detail: "$4.50 - Changes with the season", url: "menu.html#full-menu-title" },
  { title: "Brunch Toasts", category: "Breakfast", detail: "$12.00 - Sourdough, smashed avocado, and more", url: "brunch.html" },
  { title: "Avocado & Egg Toast", category: "Breakfast", detail: "$11.50 - Toasted sourdough and fresh toppings", url: "menu.html#full-menu-title" },
  { title: "Greek Yogurt Bowl", category: "Breakfast", detail: "$8.75 - Fruit, honey, and house granola", url: "menu.html#full-menu-title" },
  { title: "House Granola", category: "Breakfast", detail: "$7.50 - Toasted oats, nuts, and dried fruit", url: "menu.html#full-menu-title" },
  { title: "Focaccia Sandwich", category: "Breakfast", detail: "$10.25 - Baked in-house and served all day", url: "menu.html#full-menu-title" }
];

function ensureSearchModal() {
  let modal = document.querySelector(".search-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "search-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Search site");
  modal.innerHTML = `
    <div class="search-dialog">
      <div class="search-head">
        <input type="text" placeholder="Search menu..." aria-label="Search menu and pages">
        <button class="search-close" type="button" aria-label="Close search">&times;</button>
      </div>
      <div class="search-results" aria-live="polite"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = modal.querySelector("input");
  const results = modal.querySelector(".search-results");
  const close = modal.querySelector(".search-close");

  function renderResults(query = "") {
    const normalized = query.trim().toLowerCase();
    const matches = searchItems.filter((item) => {
      const haystack = `${item.title} ${item.category} ${item.detail}`.toLowerCase();
      return !normalized || haystack.includes(normalized);
    }).slice(0, 8);

    results.innerHTML = matches.length
      ? matches.map((item) => `
          <a class="search-result" href="${item.url}">
            <span>
              <strong>${item.title}</strong>
              <span>${item.detail}</span>
            </span>
            <em>${item.category}</em>
          </a>
        `).join("")
      : '<p class="search-empty">No results found. Try coffee, cupcake, brunch, or hours.</p>';
  }

  function closeSearch() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  input.addEventListener("input", () => renderResults(input.value));
  close.addEventListener("click", closeSearch);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeSearch();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeSearch();
  });

  renderResults();
  return modal;
}

document.querySelectorAll(".search-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = ensureSearchModal();
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modal.querySelector("input").focus();
  });
});

const initialSearch = new URLSearchParams(window.location.search).get("search");
if (initialSearch) {
  const modal = ensureSearchModal();
  const input = modal.querySelector("input");
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  input.value = initialSearch;
  input.dispatchEvent(new Event("input"));
  input.focus();
}
