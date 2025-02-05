// Global variables for pagination and data storage
let currentPage = 1;
let allProducts = [];  // Will store the entire list of products from the API

// Fetch products from the API
async function fetchProducts() {
  document.getElementById("loading").style.display = "block";
  
  try {
    const response = await fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/clothing");
    const data = await response.json();
    console.log(data); // Log the API response
    allProducts = data;
    populateCategoryFilter(allProducts);
    displayProductsPaginated(filteredProducts());
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

// Populate the filter dropdown with unique categories
function populateCategoryFilter(products) {
  const filterDropdown = document.getElementById("filterCategory");
  const categories = [...new Set(products.map(product => product.category))];
  filterDropdown.innerHTML = `<option value="">All Categories</option>`;
  
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterDropdown.appendChild(option);
  });
}

// Return products filtered by search input and selected category
function filteredProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("filterCategory").value;
  
  let filtered = allProducts;
  
  if (searchValue) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
  }
  
  if (selectedCategory) {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }
  
  return filtered;
}

// Function to display products for the current page
const productsPerPage = 12; // Increase the number of products per page to fill the page

function displayProductsPaginated(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = ""; // Clear existing products

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = products.slice(start, end);

  productsToDisplay.forEach(product => {
    const productCard = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="product card h-100">
          <img src="${product.image || 'default_image_url.jpg'}" class="card-img-top product-image" alt="${product.name}" style="height: 250px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Category: ${product.category}</p>
            <p class="card-text">Price: $${product.price.toFixed(2)}</p>
            <p class="card-text">Sizes: ${product.sizes.join(", ")}</p>
            <p class="card-text">Colors: ${product.colors.join(", ")}</p>
            <button class="btn btn-primary" onclick="addToFavorites('${product.id}')">Add to Favorites</button>
          </div>
        </div>
      </div>`;
    container.innerHTML += productCard;
  });

  // Update pagination button states
  document.getElementById("previous-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage * productsPerPage >= products.length;
}

// Pagination: Go to next page
function nextPage() {
  currentPage++;
  displayProductsPaginated(filteredProducts());
}

// Pagination: Go to previous page
function previousPage() {
  currentPage--;
  displayProductsPaginated(filteredProducts());
}

// Dummy function for adding to favorites
function addToFavorites(productId) {
  alert("Product " + productId + " added to favorites!");
}

// Event listener for search input (live filtering)
document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  displayProductsPaginated(filteredProducts());
});

// Event listener for category filter
document.getElementById("filterCategory").addEventListener("change", () => {
  currentPage = 1;
  displayProductsPaginated(filteredProducts());
});

// Load products when the page loads
fetchProducts();
