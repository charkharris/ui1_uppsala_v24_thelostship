$(document).ready(function () {
  const spiritsArray = DB2.spirits;
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  localStorage.clear();
  //const title = "Cognac";
  //const $titleElement = $("<h1>").text(title);
  //$("#title-container").append($titleElement);

  // Function to filter spirits based on category
  function filterSpirits(category) {
    const matchingSpirits = spiritsArray.filter(
      (spirit) => spirit.varugrupp === category || spirit.alkoholhalt > category
    );

    $("#drink-name").empty(); // Clear previous spirits
    if (matchingSpirits.length > 0) {
      // Loop through the matching spirits
      matchingSpirits.forEach((spirit) => {
        const $nameElement = $("<div>", { class: "spirit" });

        // Add image container
        const $imageContainer = $("<div>", { class: "image-container" });
        $imageContainer.css(
          "background-image",
          'url("images/' + spirit.namn + '.png")'
        ); // Set background image
        $nameElement.append($imageContainer);

        // Add button to add to cart
        const $addToCartButton = $("<button>").text("Add to Cart");
        $addToCartButton.click(function () {
          // Add spirit to cart
          const $cartItem = $("<div>").text(
            spirit.namn + " - " + spirit.prisinklmoms + "kr"
          );
          $("#order-container").append($cartItem);
        });
        $nameElement.append($("<p>").text(spirit.namn));
        $nameElement.append($("<p>").text(spirit.prisinklmoms + "kr"));
        $nameElement.append($addToCartButton);

        $("#drink-name").append($nameElement);
      });
    }
  }

  const alcoholicCategory = document.getElementById("alcoholic");

  alcoholicCategory.addEventListener("click", function () {
    filterSpirits("0");
    const newTitle = "Alcoholic";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#title-container").empty().append($newTitleElement);
  });

  // Add submit order button to cart
  const $submitOrderButton = $("<button>")
    .attr("id", "purchase-btn")
    .text("Pruchase");
  $submitOrderButton.click(function () {
    // Implement order submission logic here
    const cartItems = $("#order-container")
      .children()
      .toArray()
      .map((item) => $(item).text());
    console.log(cartItems);
    orders.push(cartItems);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order submitted!");
    // Clear the cart after submission
    $("#order-container").empty();

    // Display orders in console

    // Display orders at the bottom of the page
    displayOrders(orders);
  });
  $("#submit-order").append($submitOrderButton);

  const $clearOrderButton = $("<button>").append(
    '<i class="fas fa-trash-alt"></i>'
  );
  $clearOrderButton.click(function () {
    // Clear the cart
    $("#order-container").empty();
  });
  $("#clear-order").append($clearOrderButton);

  // Function to display orders
  function displayOrders(orders) {
    // Clear previous orders
    $("#order-details").empty();
    orders.forEach((order, index) => {
      const $orderItem = $("<li>").text(
        `Order ${index + 1}: ${order.join(", ")}`
      );
      $("#order-details").append($orderItem);
    });
  }
});
