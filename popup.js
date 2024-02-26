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

// Close modal if the click is on the modal background or the close button
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    var closeButton = document.querySelector('.modal-close'); // Ensure this is the correct class name

    if (event.target === modal || event.target === closeButton) {
        hideModal();
    }
};


function showPopup(){
    // Attach to menu items
    var menuItems = document.querySelectorAll('.spirit');
    menuItems.forEach(function(spirit){
        spirit.addEventListener('click', function(event){
            console.log('Spirit clicked:', spirit.getAttribute('data-id')); // Log the clicked spirit's data-id
            // Prevent the click action if it was a drag
            if (!spirit.classList.contains('ui-draggable-dragging')) {
                var itemId = spirit.getAttribute('data-id');
                showModalWithContent('menuItem', itemId);
            }
        });
    });

    // Attach to submit order button
    var submitOrder = document.querySelector('.submit-order');
    if (submitOrder) {
        submitOrder.addEventListener('click', function(){
            console.log('Submit order clicked'); // Log when submit order is clicked
            showModalWithContent('cart');
        });
    }
}

//this function decides what content to show in the modal based on the type of popup required
function showModalWithContent(popupType, data) {
    var modal = document.getElementById('myModal')
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
            modalHeader.innerHTML = `<h1>${content.name}</h1><span class="modal-close">&times;</span>`;
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
        footer: '<button id="add-to-booty">Add to cart</button'
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
        <div class="modal-body">
            <div class="left-column">
                <img class="modal-item-image" src="${item.imageSrc}" alt="${item.name}" style="width:100%; max-width: 100%; height:auto; display:block; margin-bottom: 1rem;"/>
                <p class="modal-item-description" style="text-align:center;">${item.description}</p>
            </div>
            <div class="right-column">
                <div class="modal-item-ingredients" style="overflow:auto;">
                    ${item.ingredients.map(ing => `
                        <div>
                            <input type="checkbox" id="ing${ing.name}" ${ing.checked ? 'checked' : ''}/>
                            <label for="ing${ing.name}">${ing.name}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function cartTemplate(cart) {

}