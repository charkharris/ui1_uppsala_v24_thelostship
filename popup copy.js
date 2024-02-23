// function to open the modal and display the pop-up window
function showModal(details) {
    var modal = document.getElementById('myModal');
    var modalText = document.getElementById('modal-body');
    modal.style.display = 'block';
    modalText.innerHTML = details // Populate modal with itemDetails
}

//close modal
function hideModal(){
    var modal = document.getElementById('myModal')
    modal.style.display = "none"
}

//close modal on click outside of it
window.onclick = function(event){
    var modal = document.getElementById('myModal');
    if (event.target == modal){
        hideModal();
    }
}

//close button
document.getElementsByClassName("close")[0].onclick = function() {
    hideModal();
}

function showPopup(){
   
    //attach to menu items
    var menuItems = document.querySelectorAll('.spirit');
    menuItems.forEach(function(spirit){
        spirit.addEventListener('click', function(){
            var itemId = spirit.getAttribute('data-id');
            showModalWithContent('menuItem', itemId);
        });
    });

    //attach to submit order button
    var submitOrder = document.querySelector('.submit-order');
    if (submitOrder) {
        submitOrder.addEventListener('click', function(){
            showModalWithContent('cart');
        });
    }
}

//this function decides what content to show in the modal based on the type of popup required
function showModalWithContent(popupType, data) {
    var modalHeader = document.getElementById('modal-header');
    var modalBody = document.getElementById('modal-body');
    var modalFooter = document.getElementById('modal-footer');

    //clear existing modal content
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';
    modalFooter.innerHTML = '';

    //determine what content to load based on popupType
    switch(popupType) {
        case 'menuItem':
            //prepare and show modal content for a menu item
            var content = prepareMenuItemContent(data);
            modalHeader.innerHTML = content.header;
            modalBody.innerHTML = menuItemTemplate(content);
            modalFooter.innerHTML = content.footer;
            break;
        case 'cart':
            //prepare and show modal content for the cart
            var content = prepareCartContent(data);
            modalHeader.innerHTML = content.header;
            modalBody.innerHTML = cartTemplate(cartContent);
            modalFooter.innerHTML = content.footer;
            break;
    }

    //display the modal
    document.getElementById('myModal').style.display = 'block';
}

//function to prepare content for a menu item
function prepareMenuItemContent(itemId) {
    //fetch or generate content based on the item ID
    var item = {
        name: 'Ale',
        imageSrc: 'ale_image.jpg',
        ingredients: [
            { name: 'Beer', checked: true },
            { name: 'Foam', checked: true },
            { name: 'Ice', checked: false }
        ],
        description: 'A refreshing ale from Norland\'s Guild.',
        footer: '<button id="add-to-booty">Add to cart</button>'
    };

    return item; // Return the item object with all details
}

function prepareCartContent() {
    return {
        header: 'Your Cart',
        body: 'Items in your cart...',
        footer: '<button>Checkout</button>'
    }
}

function menuItemTemplate(item){
    return `
        <div class = "modal-item-image">
            <img src="${item.imageSec}" alt="${item.name}" />
        </div>
        <div class = "modal-item-ingredients">
            ${item.ingredients.map(ing => `
                <div>
                    <input type = "checkbox" id="ing${ing.name}</label>
                </div>
            `).join('')}
            </div>
            <div class = "modal-item-description">
                ${item.description}
            </div>
    `
}

function cartTemplate(cart) {

}

window.onload = function(){
    showPopup(); //set up click events
}