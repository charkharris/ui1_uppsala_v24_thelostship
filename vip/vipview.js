function vipview() {
  $("#order-details").empty();
  const drinkHeading = document.querySelector("h2");
  drinkHeading.textContent = "VIP VIEW";
  $(".log").empty();
  const logSpan = document.querySelector(".log");
  //$(".logClass").empty();
  logSpan.textContent = "Logout";

  let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  //clear local storage
  //localStorage.clear();
  var orders = [];
  const $submitOrderButtonVIP = document.getElementById("purchase-btn");

  $submitOrderButtonVIP.addEventListener("click", function () {
    const cartItems = $("#order-container")
      .children()
      .toArray()
      .map((item) => $(item).text());

    const status = "Received";

    const newOrder = {
      items: [],
      status: status,
    };

    const itemInfo = {};

    let totalOrderPrice = 0;

    cartItems.forEach((item) => {
      const [itemName, itemPrice] = item.split(" - ");
      const spirit = DB2.spirits.find((s) => s.namn === itemName);
      if (spirit) {
        // Decrement the stock for the item
        spirit.stock--;

        // Update the total price for the order
        totalOrderPrice += parseFloat(itemPrice);

        // Update itemInfo object
        if (itemInfo.hasOwnProperty(itemName)) {
          itemInfo[itemName].count++;
          itemInfo[itemName].totalPrice += parseFloat(itemPrice);
        } else {
          itemInfo[itemName] = {
            count: 1,
            totalPrice: parseFloat(itemPrice),
          };
        }
      }
    });

    Object.entries(itemInfo).forEach(([itemName, info]) => {
      const totalPrice = info.totalPrice;
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

    // Update DB2.spirits in localStorage with adjusted stock numbers
    localStorage.setItem("spirits", JSON.stringify(DB2.spirits));

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 10000) + 1;

    // Display the random number along with the alert

    // Clear the cart after submission
    $("#order-container").empty();

    // Update the display of the cart
    //displayCart();

    // Display orders at the bottom of the page
    console.log("hello");
    $("#order-details").append("Your code is: " + randomNumber);
    //displayOrders(orders);
  });
  $("#submit-order").append($submitOrderButtonVIP);
}
