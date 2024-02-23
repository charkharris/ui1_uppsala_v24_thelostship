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
          const $cartItem = $("<div>").text(spirit.namn);
          $("#order-container").append($cartItem);
        });
        $nameElement.append($("<p>").text(spirit.namn));
        $nameElement.append($("<p>").text(spirit.prisinklmoms + "kr"));
        $nameElement.append($addToCartButton);

        $("#drink-name").append($nameElement);
      });
    }
  }
  nonAlcoholicCategory.addEventListener("click", function () {
    filterAlcoholFree("0%");
    const newTitle = "Alcohol Free";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#title-container").empty().append($newTitleElement);
  });
});
