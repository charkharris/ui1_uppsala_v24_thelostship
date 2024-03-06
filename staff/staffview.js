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
  alcoholfreeToEpmty.textContent = "Alcohol";

  //security button code
    const securityBtn = document.createElement('button');
    securityBtn.id = 'securityBtn';
    securityBtn.textContent = 'Security';
    securityBtn.className = 'security-btn';

    const sidebar = document.querySelector('.sidebar');
    sidebar.appendChild(securityBtn);

    let pressTimer;

    securityBtn.addEventListener('mousedown', () => {
      securityBtn.style.transition = 'background-color 3s ease';
      securityBtn.style.backgroundColor = 'blue';
    
      pressTimer = window.setTimeout(() => {
        alert('Security summoned!');
        securityBtn.style.backgroundColor = ''; // Reset background color
        securityBtn.style.transition = ''
      }, 2000); // Set timeout to 3 seconds
    });
    
    securityBtn.addEventListener('mouseup', () => {
      clearTimeout(pressTimer); // Clear the timeout
      securityBtn.style.backgroundColor = ''; // Reset background color
      securityBtn.style.transition = ''; // Remove the transition
    });


  logSpan.addEventListener("click", function () {
    // Prompt the user for username and password

    location.reload();
  });
  function displayOrders(orders) {
    $("#tile-section").empty();

    // Create a table element
    const $table = $("<table>").addClass("order-table");

    // Create table headers
    const $headerRow = $("<tr>");
    $headerRow.append($("<th>").text("Order Number"));
    $headerRow.append($("<th>").text("Items"));
    $headerRow.append($("<th>").text("Status"));
    $headerRow.append($("<th>").text("Total")); // Original total column
    $headerRow.append($("<th>").text("Split Total")); // New header for split total
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

      // Extract the total from the items array
      const totalItem = order.items.find((item) => item.startsWith("Total"));
      const total = totalItem ? totalItem.split(" - ")[1] : "0.00";
      const $totalCell = $("<td>").text(total); // Display the total in the table
      $orderRow.append($totalCell);

      // Create input field for number of people to split the total
      const $splitInput = $("<input>", {
        type: "number",
        min: 1, // Minimum number of people is 1
        placeholder: "Enter number of people",
        class: "split-input", // Add a class to easily select these inputs later
      });
      const $splitTotalCell = $("<td>")
        .append($splitInput)
        .addClass("split-total-cell"); // Add a class to easily select this cell
      $orderRow.append($splitTotalCell);

      // Create a button to show split total
      const $showSplitTotalButton = $("<button>").text("Show");
      const $showSplitTotalCell = $("<td>")
        .append($showSplitTotalButton)
        .addClass("show-split-total-cell"); // Add a class to easily select this cell
      $orderRow.append($showSplitTotalCell);

      // Append the row to the table
      $table.append($orderRow);

      // Add event listener to the button to display split total
      $showSplitTotalButton.on("click", function () {
        const numberOfPeople = parseInt($splitInput.val());
        const splitTotal = numberOfPeople
          ? (parseFloat(total) / numberOfPeople).toFixed(2)
          : "0.00";
        $(this)
          .closest("tr")
          .find(".split-total-cell")
          .text(splitTotal + " kr"); // Update the split total cell
      });
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
    $("#tile-section").append($newTitleElement);

    // Retrieve spirits from local storage
    const storedSpirits = JSON.parse(localStorage.getItem("spirits"));

    storedSpirits.forEach((spirit) => {
      // Create a container for each spirit
      const $spiritElement = $("<div>", { class: "spirit" });

      // Add image container
      const $imageContainer = $("<div>", { class: "image-container" });
      $imageContainer.css(
        "background-image",
        'url("images/' + spirit.namn + '.png")'
      );
      $spiritElement.append($imageContainer);

      // Prepare spirit information including stock number
      const spiritInfo = spirit.namn + " - " + spirit.prisinklmoms + "kr";
      $spiritElement.append(
        $("<p>", { class: "spirit-info" }).text(spiritInfo)
      );

      // Create input field for changing stock number
      const $stockInput = $("<input>", {
        type: "number",
        value: spirit.stock,
        id: "stock_" + spirit.nr, // Assuming each spirit has an nr property
      });
      $stockInput.on("input", function () {
        // Update the stock number in the stored spirits array when input changes
        spirit.stock = parseInt($(this).val());
      });
      $spiritElement.append($("<label>").text("Stock: ").append($stockInput));

      // Append $spiritElement to the tile section
      $("#tile-section").append($spiritElement);

      // Check if stock is below 5 and display message
      if (spirit.stock < 5) {
        const $lowStockMessage = $("<p>")
          .text("Low stock!")
          .addClass("low-stock-message");
        $spiritElement.append($lowStockMessage);
      }
    });

    const $updateStockButton = $("<button>", {
      id: "updateStockButton",
      text: "Update Stock",
    });

    $("#tile-section").append($updateStockButton);
    $updateStockButton.on("click", function () {
      updateStockValues(storedSpirits);
    });

    function updateStockValues(spirits) {
      spirits.forEach((spirit) => {
        const stockInputValue = parseInt($("#stock_" + spirit.nr).val());
        if (!isNaN(stockInputValue)) {
          spirit.stock = stockInputValue;
        }
      });
      // Optionally, you can perform further actions after updating the stock values
      // Update the local storage with the updated spirits
      localStorage.setItem("spirits", JSON.stringify(spirits));
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
