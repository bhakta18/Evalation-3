const apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products';

let products = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 6;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.getElementById('category-filter').addEventListener('change', applyFiltersAndSort);
    document.getElementById('price-sort').addEventListener('change', applyFiltersAndSort);
    document.getElementById('prev-page').addEventListener('click', prevPage);
    document.getElementById('next-page').addEventListener('click', nextPage);
    updateCartCount();
});

function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data.data;
            initializeFilters();
            applyFiltersAndSort();
        })
        .catch(error => console.error('Error fetching products:', error));
}

function initializeFilters() {
    const categories = [...new Set(products.map(product => product.category))];
    const categoryFilter = document.getElementById('category-filter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function applyFiltersAndSort() {
    const category = document.getElementById('category-filter').value;
    const priceSort = document.getElementById('price-sort').value;

    filteredProducts = products.filter(product => {
        return category === '' || product.category === category;
    });

    if (priceSort === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    currentPage = 1;
    renderProducts();
}

function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.brand;

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const title = document.createElement('h2');
        title.textContent = product.brand;

        const category = document.createElement('p');
        category.textContent = `Category: ${product.category}`;

        const details = document.createElement('p');
        details.textContent = product.details;

        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
        price.className = 'price';

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => addToCart(product));

        productInfo.appendChild(title);
        productInfo.appendChild(category);
        productInfo.appendChild(details);
        productInfo.appendChild(price);
        productInfo.appendChild(addToCartButton);

        productCard.appendChild(image);
        productCard.appendChild(productInfo);

        productsContainer.appendChild(productCard);
    });

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
}

function nextPage() {
    if (currentPage * productsPerPage < filteredProducts.length) {
        currentPage++;
        renderProducts();
    }
}

function updatePageInfo() {
    document.getElement
}