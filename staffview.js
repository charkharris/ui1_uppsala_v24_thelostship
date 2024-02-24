$(document).ready(function () {
  const logSpan = document.querySelector(".log");

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
        staffview();
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
  function staffview() {
    const drinkHeading = document.querySelector("h2");
    drinkHeading.textContent = "ORDERS";
    $("#tile-section").empty();

    function displayOrders(orders) {
      const tileSection = document.getElementById("tile-section");

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
    console.log(orders);
    displayOrders(orders);
  }
});
