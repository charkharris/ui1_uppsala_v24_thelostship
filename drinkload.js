$(document).ready(function () {
  function displayItemsByCategory() {
    const itemsContainer = document.getElementById("drink-name");
    itemsContainer.innerHTML = "";

    // Extract unique categories from data
    const categories = DB2.spirits.reduce((acc, curr) => {
      if (!acc.includes(curr.varugrupp)) {
        acc.push(curr.varugrupp);
      }
      return acc;
    }, []);
    const newTitle = "Drinks by Category";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#title-container").empty().append($newTitleElement);
    categories.forEach((category) => {
      const categoryItems = DB2.spirits.filter(
        (spirit) => spirit.varugrupp === category
      );

      if (categoryItems.length > 0) {
        // Create title element for the category
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        itemsContainer.appendChild(categoryTitle);

        // Display items for the category
        categoryItems.forEach((spirit) => {
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
    });

    drinksDrag();
  }
  displayItemsByCategory();
  //displayItemsByCategory();
  drinksDrag();
  const homeCategory = document.getElementById("home");

  homeCategory.addEventListener("click", function () {
    displayItemsByCategory();
  });

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
});
