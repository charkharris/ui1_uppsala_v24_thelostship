//$(document).ready(function () {
function staffview() {
  const drinkHeading = document.querySelector("h2");
  drinkHeading.textContent = "ORDERS";
  $("#tile-section").empty();
  $(".log").empty();
  const logSpan = document.querySelector(".log");
  //$(".logClass").empty();
  logSpan.textContent = "Logout";

  const home = document.querySelector("#home");
  home.textContent = "Orders";

  const alcoholicToStock = document.querySelector("#alcoholic");
  alcoholicToStock.textContent = "Stock";

  const alcoholfreeToEpmty = document.querySelector("#alcoholfree");
  alcoholfreeToEpmty.textContent = "";

  logSpan.addEventListener("click", function () {
    // Prompt the user for username and password

    location.reload();
  });
  function displayOrders(orders) {
    // Clear everything inside the div
    $("#tile-section").empty();

    // Create a table element
    const $table = $("<table>").addClass("order-table");

    // Create table headers
    const $headerRow = $("<tr>");
    $headerRow.append($("<th>").text("Order Number"));
    $headerRow.append($("<th>").text("Items"));
    $headerRow.append($("<th>").text("Status"));
    $table.append($headerRow);

    // Define the status options
    const statusOptions = [
      "Received",
      "Processing",
      "Complete",
      "Canceled",
      "Refunded",
    ];

    // Loop through orders and add rows to the table
    orders.forEach((order, index) => {
      const $orderRow = $("<tr>")
        .attr("id", `order-${index + 1}`)
        .addClass("order-item-row");

      // Add cells to the row
      $orderRow.append($("<td>").text(`Order ${index + 1}`));
      const $itemsCell = $("<td>").text(order.items.join(", "));
      $orderRow.append($itemsCell);

      // Create a dropdown select element for status
      const $statusSelect = $("<select>").addClass("status-select");
      statusOptions.forEach((option) => {
        const $option = $("<option>").text(option);
        $statusSelect.append($option);
      });
      $statusSelect.val(order.status); // Set the selected status value

      const $statusCell = $("<td>").append($statusSelect);
      $orderRow.append($statusCell);

      // Append the row to the table
      $table.append($orderRow);
    });

    // Append the table to the tile-section div
    $("#tile-section").append($table);
  }
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Display orders in console on page load

  orders.forEach((order, index) => {});

  displayOrders(orders);
  home.addEventListener("click", function () {
    displayOrders(orders);
  });

  alcoholicToStock.addEventListener("click", function () {
    $("#tile-section").empty();
    const newTitle = "Alcoholic";
    const $newTitleElement = $("<h1>").text(newTitle);
    $("#tile-section").empty().append($newTitleElement);

    DB2.spirits.forEach((spirit) => {
      //spirit.namn = decodeURIComponent(escape(spirit.namn));
      const $spiritElement = $("<div>", { class: "spirit" });

      // Add image container
      const $imageContainer = $("<div>", { class: "image-container" });
      $imageContainer.css(
        "background-image",
        'url("images/' + spirit.namn + '.png")'
      );
      $spiritElement.append($imageContainer);

      // Prepare spirit information excluding stock number
      const spiritInfo = spirit.namn + " - " + spirit.prisinklmoms + "kr";
      $spiritElement.append(
        $("<p>", { class: "spirit-info" }).text(spiritInfo)
      );

      // Create input field for changing stock number
      const $stockInput = $("<input>", {
        type: "number",
        value: spirit.stock,
        id: "stock_" + spirit.id, // Assuming each spirit has an id property
      });
      $stockInput.on("input", function () {
        // Update the stock number in the spirits array when input changes
        spirit.stock = parseInt($(this).val());
      });
      $spiritElement.append($("<label>").text("Stock: ").append($stockInput));

      // Append $spiritElement to the drink-name div
      $("#tile-section").append($spiritElement);
      // Append the button to the DOM
    });

    const $updateStockButton = $("<button>", {
      id: "updateStockButton",
      text: "Update Stock",
    });

    $("#tile-section").append($updateStockButton);
    $updateStockButton.on("click", function () {
      updateStockValues(DB2.spirits);
    });
    function updateStockValues(spirits) {
      spirits.forEach((spirit) => {
        const stockInputValue = parseInt($("#stock_" + spirit.nr).val());
        if (!isNaN(stockInputValue)) {
          spirit.stock = stockInputValue;
        }
      });
      // Optionally, you can perform further actions after updating the stock values
    }
  });
}

// CREDENTIAL VALUE 0
function managerview() {}

// CREDENTIAL VALUE 1
function bartenderview() {}

// CREDENTIAL VALUE 2
function waitressview() {}
//});
