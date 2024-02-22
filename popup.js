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