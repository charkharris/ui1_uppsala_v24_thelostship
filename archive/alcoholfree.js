$(document).ready(function () {
  const spiritsArray = DB2.spirits;
  const nonAlcoholicCategory = document.getElementById("alcoholfree");

  function filterAlcoholFree(category) {
    const matchingSpirits = spiritsArray.filter(
      (spirit) => spirit.alkoholhalt === category
    );
    console.log(category);
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

        // Add "Show Details" button
        const $showDetailsButton = $("<button>").text("Show Details");
        $showDetailsButton.click(function () {
          // Code to show modal
          showModalWithContent('menuItem', spirit);
        });
    
        // Append the new button
        $nameElement.append($showDetailsButton);
    
        // Append the name element to the drinks container
        $("#drink-name").append($nameElement);
    

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
  nonAlcoholicCategory.addEventListener("click", function () {
    filterAlcoholFree("0%");
    const newTitle = "Alcohol Free";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#title-container").empty().append($newTitleElement);
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
