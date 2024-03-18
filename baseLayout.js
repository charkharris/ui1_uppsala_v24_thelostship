// combined.js
document.addEventListener("DOMContentLoaded", function () {
  // HTML content as a template string
  const htmlContent = `
        <header>
            <div>
                <img src="images/user-circle.png" alt="Profile Icon" />
                <span class="user-circle">Customer</span>
            </div>
            <div class="logo-container">
                <img src="images/flying-dutchmen.png" alt="Flying Dutchman" class="logo">
            </div>
            <div class ="logClass"> 
                <img src="images/globe-03.png" alt="language Icon" />
                <span class="language-icon">Language</span>
                <span class="log"></span> 
            </div>
        </header>
    
        <main>
            <div class="left-panel">
                <!-- Left Panel Content -->
                <div class="sidebar">
                    <!-- Sidebar Content -->
                    <p class="category" id="home">Home</p>
                    <p class="category" id="alcoholic">Alcoholic</p>
                    
                    <p class="category" id="alcoholfree"></p>
                </div>
            </div>

            <div class="main-content">
                <div id="item-list"></div>
            </div>
        </div>

        <div class="content">
            <!-- Main Content -->
            <h2 style="text-align: center;">Drink</h2>
            <div class="horizontal-bar">
                <div class="filter-label">Filters</div>
                <div class="search-container">
                    <input type="text" placeholder="Search...">
                    <span class="search-icon">🔍</span>
                </div>
            </div>

            <div class="menu-items" id="tile-section">
                <div class="drinks" id="title-container"></div>
                <div class="drinks" id="drink-name"></div>
            </div>
        </div>

        <div id="myModal" class="modal">
            <div class="modal-content">
                <div id="modal-header">
                    <h1>Modal Title</h1>
                    <span class="close">&times;</span>
                </div>
                <div id="modal-body"></div>
                <div id="modal-footer"></div>
            </div>
        </div>

        <div class="right-panel" id="right-panel">
            Cart
            <div id="cart-container">
                <div id="order-container"></div>
            </div>

            <div id="button-container">
                <div id="submit-order"></div>
                <div id="clear-order"></div>
            </div>

            <div id="order-details"></div>
        </div>
    </main>
    `;

  // Inject the HTML content into the body
  document.body.innerHTML = htmlContent;
});
