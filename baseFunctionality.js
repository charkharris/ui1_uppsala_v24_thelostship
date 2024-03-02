$(document).ready(function () {
  mainDriver();
});

function mainDriver() {
  let history = [];
  let currentPosition = -1;

  // Function to add item to cart

  const logSpan = document.querySelector(".log");
  //$(".logClass").empty();
  logSpan.textContent = "Login";
  logSpan.addEventListener("click", function () {
    // Prompt the user for username and password
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    login(username, password);
  });

  function login(username, password) {
    var user = DB.users.find(function (user) {
      return user.username === username;
    });

    // Check if a user with the provided username exists
    if (user) {
      if (user.password === password) {
        console.log("Correct");
        // Show staff view for staff members only
        if (user.credentials == "0" || "1" || "2") {
          staffview();
        }
        // Password is correct, login successful
      } else {
        // Password is incorrect
        console.log("Incorrect password. Please try again.");
      }
    } else {
      // User with the provided username not found
      console.log("User not found. Please check your username.");
    }
  }

  function displayItemsByCategory() {
    const categories = DB2.spirits.reduce((acc, curr) => {
      if (!acc.includes(curr.varugrupp)) {
        acc.push(curr.varugrupp);
      }
      return acc;
    }, []);

    const newTitle = "Drinks by Category";
    const $titleElement = $("<h1>").text(newTitle);
    let history = [];
    let currentPosition = -1;

    // Function to add item to cart
    function addItemToCart(spirit) {
      const $cartItem = $("<div id='cart-item'>").text(
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

      // Push the action to history
      history.push({ action: "add", spirit: spirit });
      currentPosition = history.length - 1;
      $(".trash-button").click(function () {
        // Your onclick function logic here
        console.log("hello");
        $(this).closest("#cart-item").remove();
      });
    }

    function clearCart() {
      // Store a copy of all items in the cart
      const itemsInCart = $("#order-container").children().clone();

      // Clear the cart
      $("#order-container").empty();

      // Push the action to history
      history.push({ action: "clear", items: itemsInCart });
      currentPosition = history.length - 1;
    }
    function removeItemFromCart() {
      // Find the closest #cart-item relative to the clicked trash button

      // Get the last action from history
      const lastAction = history[currentPosition];

      // Push the action to history
      history.push({ action: "remove", spirit: lastAction.spirit });
      currentPosition = history.length - 1;
    }

    function undoAction() {
      if (currentPosition >= 0) {
        const action = history[currentPosition];
        console.log(action);
        if (action.action === "clear") {
          // If last action was 'clear', add the items back to the cart
          $("#order-container").append(action.items);
        } else if (action.action === "add") {
          // If last action was 'add', remove the item
          $("#order-container").children().last().remove();
        } else if (action.action === "remove") {
          // If last action was 'remove', add the item back
          const $cartItem = $("<div id='cart-item'>").text(
            action.spirit.namn + " - " + action.spirit.prisinklmoms + "kr"
          );
          const $trashButton = $("<button>").addClass("trash-button");
          const $trashIcon = $("<i>").addClass("fa fa-trash");
          $trashButton.append($trashIcon);
          $cartItem.append($trashButton);
          $("#order-container").append($cartItem);
        }
        currentPosition--;
      }
    }

    function redoAction() {
      if (currentPosition < history.length - 1) {
        currentPosition++;
        const action = history[currentPosition];
        if (action.action === "clear") {
          // If next action is 'clear', clear the cart again
          $("#order-container").empty();
        } else if (action.action === "add") {
          // If next action is 'add', add the item
          const $cartItem = $("<div id='cart-item'>").text(
            action.spirit.namn + " - " + action.spirit.prisinklmoms + "kr"
          );
          const $trashButton = $("<button>").addClass("trash-button");
          const $trashIcon = $("<i>").addClass("fa fa-trash");
          $trashButton.append($trashIcon);
          $cartItem.append($trashButton);
          $("#order-container").append($cartItem);
        } else if (action.action === "remove") {
          // If next action is 'remove', remove the item
          $("#order-container").children().last().remove();
        }
      }
    }

    $("#title-container").empty().append($titleElement);
    $("#drink-name").empty();
    categories.forEach((category) => {
      const categoryItems = DB2.spirits.filter(
        (spirit) => spirit.varugrupp === category
      );
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;
      $("#drink-name").append(categoryTitle);
      if (categoryItems.length > 0) {
        categoryItems.forEach((spirit) => {
          const $nameElement = $("<div>", { class: "spirit" });

          const $imageContainer = $("<div>", { class: "image-container" });
          $imageContainer.css(
            "background-image",
            'url("images/' + spirit.namn + '.png")'
          );
          $nameElement.append($imageContainer);

          // Combine name and price in the same div
          const spiritInfo = spirit.namn + " - " + spirit.prisinklmoms + "kr";
          $nameElement.append(
            $("<p>", { class: "spirit-info" }).text(spiritInfo)
          );

          const $addToCartButton = $("<button>").text("Add to Cart");
          $nameElement.append($addToCartButton);

          // Add to cart button functionality
          $addToCartButton.click(function () {
            addItemToCart(spirit);
          });

          // Append name element to drink-name
          $("#drink-name").append($nameElement);
        });
      }
    });

    const $clearOrderButton = $("<button>").append(
      '<i class="fas fa-trash-alt" id = "clear-order-button"></i>'
    );
    // Event handler for clear order button click
    $clearOrderButton.click(function () {
      clearCart();
    });

    // Append clear order button to clear-order element
    $("#clear-order").append($clearOrderButton);

    // Undo button

    // Undo button
    const $undoButton = $("<button>").text("Undo");
    $undoButton.attr("id", "undo-button");

    // Append undo button to submit-order element
    $("#submit-order").append($undoButton);

    // Undo button click event handler
    $undoButton.click(function () {
      undoAction();
    });

    // Redo button
    const $redoButton = $("<button>").text("Redo");
    $redoButton.attr("id", "redo-button");

    // Append redo button to submit-order element
    $("#submit-order").append($redoButton);

    // Redo button click event handler
    $redoButton.click(function () {
      redoAction();
    });
    drinksDrag();
  }

  const homeCategory = document.getElementById("home");

  homeCategory.addEventListener("click", function () {
    displayItemsByCategory();
    drinksDrag();
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

  const spiritsArray = DB2.spirits;
  let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  //localStorage.clear();
  var orders = [];
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

    // Define the status for the new order
    const status = "Received";

    // Create an object representing the order with items and status
    const newOrder = {
      items: [],
      status: status,
    };

    // Create a map to store item counts and total price
    const itemInfo = {};

    // Loop through cart items
    cartItems.forEach((item) => {
      const [itemName, itemPrice] = item.split(" - ");
      if (itemInfo.hasOwnProperty(itemName)) {
        // Increment the counter for the item

        itemInfo[itemName].count++;
        itemInfo[itemName].totalPrice += parseFloat(itemPrice);
      } else {
        // Initialize the counter for the item
        itemInfo[itemName] = {
          count: 1,
          totalPrice: parseFloat(itemPrice),
        };
      }
    });
    console.log(itemInfo);
    let totalOrderPrice = 0;
    // Add items to the new order with counters and total price
    Object.entries(itemInfo).forEach(([itemName, info]) => {
      const totalPrice = info.totalPrice;
      totalOrderPrice += info.totalPrice;
      console.log(totalOrderPrice);
      newOrder.items.push(
        `${"'" + itemName + "'"} x${info.count} - ${totalPrice.toFixed(2)}kr `
      );
    });
    newOrder.items.push(`${"Total"}  - ${totalOrderPrice.toFixed(2)}kr `);

    // Push the new order object to the orders array

    orders.push(newOrder);
    savedOrders.push(newOrder);
    // Update localStorage with the updated orders array
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    alert("Order submitted!");
    // Clear the cart after submission
    $("#order-container").empty();

    // Display orders in console

    // Display orders at the bottom of the page
    displayOrders(orders);
  });

  $("#submit-order").append($submitOrderButton);

  // const $clearOrderButton = $("<button>").append(
  //   '<i class="fas fa-trash-alt" id = "clear-order-button"></i>'
  // );
  // $clearOrderButton.click(function () {
  //   // Clear the cart
  //   $("#order-container").empty();
  // });
  // $("#clear-order").append($clearOrderButton);

  // Function to display orders
  function displayOrders(orders) {
    // Clear previous orders
    $("#order-details").empty();
    orders.forEach((order, index) => {
      const $orderItem = $("<li>").text(
        `Order ${index + 1}: ${order.items.join(", ")}`
      );
      $("#order-details").append($orderItem);
    });
  }

  $("#cart-container").on("click", ".trash-button", function () {
    $(this).closest("#cart-item").remove();
  });

  // function to open the modal and display the pop-up window
  function showModal(details) {
    var modal = document.getElementById("myModal");
    var modalText = document.getElementById("modal-body");
    modal.style.display = "block";
    modalText.innerHTML = details; // Populate modal with itemDetails
  }

  //close modal
  function hideModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  // Close modal if the click is on the modal background or the close button
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    var closeButton = document.querySelector(".modal-close"); // Ensure this is the correct class name

    if (event.target === modal || event.target === closeButton) {
      hideModal();
    }
  };

  function showPopup() {
    // Attach to menu items
    var menuItems = document.querySelectorAll(".spirit");
    menuItems.forEach(function (spirit) {
      spirit.addEventListener("click", function (event) {
        console.log("Spirit clicked:", spirit.getAttribute("data-id"));
        // Prevent the click action if it was a drag
        if (!spirit.classList.contains("ui-draggable-dragging")) {
          var itemId = spirit.getAttribute("data-id");
          showModalWithContent("menuItem", itemId);
        }
      });
    });

    // Attach to submit order button
    var submitOrder = document.querySelector(".submit-order");
    if (submitOrder) {
      submitOrder.addEventListener("click", function () {
        console.log("Submit order clicked");
        showModalWithContent("cart");
      });
    }
  }

  //this function decides what content to show in the modal based on the type of popup required
  function showModalWithContent(popupType, data) {
    var modal = document.getElementById("myModal");
    var modalHeader = document.getElementById("modal-header");
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    //clear existing modal content
    modalHeader.innerHTML = "";
    modalBody.innerHTML = "";
    modalFooter.innerHTML = "";

    //determine what content to load based on popupType
    switch (popupType) {
      case "menuItem":
        //prepare and show modal content for a menu item
        var content = prepareMenuItemContent(data);
        modalHeader.innerHTML = `<h1>${content.name}</h1><span class="modal-close">&times;</span>`;
        modalBody.innerHTML = menuItemTemplate(content);
        modalFooter.innerHTML = content.footer;
        break;
      case "cart":
        //prepare and show modal content for the cart
        var content = prepareCartContent(data);
        modalHeader.innerHTML = content.header;
        modalBody.innerHTML = cartTemplate(cartContent);
        modalFooter.innerHTML = content.footer;
        break;
    }

    //display the modal
    document.getElementById("myModal").style.display = "block";
  }

  //function to prepare content for a menu item
  function prepareMenuItemContent(itemId) {
    //fetch or generate content based on the item ID
    var item = {
      name: "Ale",
      imageSrc: "ale_image.jpg",
      ingredients: [
        { name: "Beer", checked: true },
        { name: "Foam", checked: true },
        { name: "Ice", checked: false },
      ],
      description: "A refreshing ale from Norland's Guild.",
      footer: '<button id="add-to-booty">Add to cart</button',
    };

    return item; // Return the item object with all details
  }

  function prepareCartContent() {
    return {
      header: "Your Cart",
      body: "Items in your cart...",
      footer: "<button>Checkout</button>",
    };
  }

  function menuItemTemplate(item) {
    return `
            <div class="modal-body">
                <div class="left-column">
                    <img class="modal-item-image" src="${item.imageSrc}" alt="${
      item.name
    }" style="width:100%; max-width: 100%; height:auto; display:block; margin-bottom: 1rem;"/>
                    <p class="modal-item-description" style="text-align:center;">${
                      item.description
                    }</p>
                </div>
                <div class="right-column">
                    <div class="modal-item-ingredients" style="overflow:auto;">
                        ${item.ingredients
                          .map(
                            (ing) => `
                            <div>
                                <input type="checkbox" id="ing${ing.name}" ${
                              ing.checked ? "checked" : ""
                            }/>
                                <label for="ing${ing.name}">${ing.name}</label>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;
  }

  function cartTemplate(cart) {}

  //const spiritsArray = DB2.spirits;
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
          showModalWithContent("menuItem", spirit);
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

  displayItemsByCategory();
  drinksDrag();
}

//});
