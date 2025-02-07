// Global variables for pagination and data storage
let currentPage = 1;
let allProducts = [];
const productsPerPage = 12; // Number of products per page

// Fetch products from the API
async function fetchProducts() {
  document.getElementById("loading").style.display = "block";

  try {
    const response = await fetch(
      "https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/clothing"
    );
    const data = await response.json();
    allProducts = data;
    populateCategoryFilter(allProducts);
    displayProductsPaginated(filteredProducts()); // Use filtered products
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

// Populate category filter dropdown
function populateCategoryFilter(products) {
  const filterDropdown = document.getElementById("filterCategory");
  const categories = [...new Set(products.map((product) => product.category))];

  filterDropdown.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterDropdown.appendChild(option);
  });
}

// Filter products based on search input and selected category
function filteredProducts() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const selectedCategory = document.getElementById("filterCategory").value;

  let filtered = allProducts;

  if (searchValue) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory
    );
  }

  return filtered;
}

// Function to display products with pagination
function displayProductsPaginated(products = allProducts) {
  const container = document.getElementById("products-container");
  container.innerHTML = ""; // Clear existing products

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = products.slice(start, end);

  productsToDisplay.forEach((product) => {
    const productCard = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="product card h-100">
          <img src="${
            product.image || "default.jpg"
          }" class="card-img-top product-image" alt="${product.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Sizes: ${product.sizes.join(", ")}</p>
            <p>Colors: ${product.colors.join(", ")}</p>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-outline-danger btn-custom" onclick="addToFavorites('${
                product.id
              }')">❤️ Favorite</button>
              <button class="btn btn-outline-primary btn-custom" onclick="addToCart('${
                product.id
              }')">🛒 Cart</button>
              <button class="btn btn-success btn-custom" onclick="buyProduct('${
                product.id
              }')">💳 Buy</button>
            </div>
          </div>
        </div>
      </div>`;
    container.innerHTML += productCard;
  });

  document.getElementById("previous-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = end >= products.length;
}

// Pagination Functions
function nextPage() {
  if (currentPage * productsPerPage < filteredProducts().length) {
    currentPage++;
    displayProductsPaginated(filteredProducts());
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProductsPaginated(filteredProducts());
  }
}

// Dummy Functions for buttons
function addToFavorites(id) {
  alert("Added to Favorites!");
}
function addToCart(id) {
  alert("Added to Cart!");
}
function buyProduct(id) {
  alert("Proceeding to Checkout!");
}

// Event listeners for search input and category filter
document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  displayProductsPaginated(filteredProducts());
});

document.getElementById("filterCategory").addEventListener("change", () => {
  currentPage = 1;
  displayProductsPaginated(filteredProducts());
});

// Load products on page load
fetchProducts();
