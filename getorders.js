$(document).ready(function() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Display orders in console on page load
    
    orders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`, order);
    });
});