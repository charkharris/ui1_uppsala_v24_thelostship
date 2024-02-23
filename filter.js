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

          const $cartItem = $("<div id = cart-item>").text(
            spirit.namn + " - " + spirit.prisinklmoms + "kr"
          );
          const $trashButton = $("<button>").addClass("trash-button");

          // Add Font Awesome icon to the button
          const $trashIcon = $("<i>").addClass("fa fa-trash");

          // Append the icon to the button
          $trashButton.append($trashIcon);

          // Append the button to the cart item
          $cartItem.append($trashButton);
          $("#order-container").append($cartItem);
        });

        //Combine name and price in the same div
        const spiritInfo = spirit.namn + " - " + spirit.prisinklmoms + "kr";
        $nameElement.append(
          $("<p>", { class: "spirit-info" }).text(spiritInfo)
        );
        $nameElement.append($addToCartButton);

        $("#drink-name").append($nameElement);
      });
    }
    drinksDrag();
  }

  const alcoholicCategory = document.getElementById("alcoholic");

  alcoholicCategory.addEventListener("click", function () {
    filterSpirits("0");
    const newTitle = "Alcoholic";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#title-container").empty().append($newTitleElement);
    drinksDrag();
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

  function drinksDrag() {
    // Make orders draggable
    $(".spirit").draggable({
      helper: "clone",
      revert: "invalid",
    });

    // Make cart droppable
    $("#right-panel").droppable({
      accept: ".spirit",
      drop: function (event, ui) {
        const droppedItemText = ui.draggable.find(".spirit-info").text();
        const $cartItem = $("<div id = cart-item>").text(droppedItemText);
        const $trashButton = $("<button>").addClass("trash-button");

        // Add Font Awesome icon to the button
        const $trashIcon = $("<i>").addClass("fa fa-trash");

        // Append the icon to the button
        $trashButton.append($trashIcon);

        // Append the button to the cart item
        $cartItem.append($trashButton);
        $("#order-container").append($cartItem);
      },
    });
  }
  drinksDrag();

  $("#cart-container").on("click", ".trash-button", function () {
    $(this).closest("#cart-item").remove();
  });
});
