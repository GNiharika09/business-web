var cartVisible = false;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var buttonsDeleteItem = document.getElementsByClassName('btn-eliminate');
    for (var i = 0; i < buttonsDeleteItem.length; i++) {
        var button = buttonsDeleteItem[i];
        button.addEventListener('click', DeleteItem);
    }

    var buttonsAddQuantity = document.getElementsByClassName('sumar-amount');
    for (var i = 0; i < buttonsAddQuantity.length; i++) {
        var button = buttonsAddQuantity[i];
        button.addEventListener('click', addQuantity);
    }

    var buttonsSubtractQuantity = document.getElementsByClassName('restar-amount');
    for (var i = 0; i < buttonsSubtractQuantity.length; i++) {
        var button = buttonsSubtractQuantity[i];
        button.addEventListener('click', subtractAmount);
    }

    var buttonsAddToCart = document.getElementsByClassName('botton-item');
    for (var i = 0; i < buttonsAddToCart.length; i++) {
        var button = buttonsAddToCart[i];
        button.addEventListener('click', addToCart);
    }

    document.getElementsByClassName('btn-pay')[0].addEventListener('click', payClicked);
}

function payClicked() {
    alert("Thank you for your patrounage , Hope to see you again <3!!");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    actualizarTotalcart();
    updateCart();
}

function addToCart(event) {
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('cost-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imageSrc);
    addItemToCart(title, price, imageSrc);
    makeVisibleCart();
}

function makeVisibleCart() {
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';
    var items = document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

function addItemToCart(title, price, imageSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var itemTitles = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < itemTitles.length; i++) {
        if (itemTitles[i].innerText === title) {
            alert("Item is already in the cart.");
            return;
        }
    }

    var itemCartContent = `
        <div class="cart-item">
            <img src="${imageSrc}" width="80px" alt="">
            <div class="cart-item-details">
                <span class="cart-item-title">${title}</span>
                <div class="selector-amount">
                    <i class="fa-solid fa-minus restar-amount"></i>
                    <input type="text" value="1" class="cart-item-amount" disabled>
                    <i class="fa-solid fa-plus sumar-amount"></i>
                </div>
                <span class="cart-item-cost">${price}</span>
            </div>
            <button class="btn-eliminate">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCartContent;
    cartItems.appendChild(item);
    item.getElementsByClassName('btn-eliminate')[0].addEventListener('click', DeleteItem);
    var buttonSubtractQuantity = item.getElementsByClassName('restar-amount')[0];
    buttonSubtractQuantity.addEventListener('click', subtractAmount);

    var buttonAddQuantity = item.getElementsByClassName('sumar-amount')[0];
    buttonAddQuantity.addEventListener('click', addQuantity);
    actualizarTotalcart();
}

function addQuantity(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-amount')[0].value);
    var currentQuantity = selector.getElementsByClassName('cart-item-amount')[0].value;
    currentQuantity++;
    selector.getElementsByClassName('cart-item-amount')[0].value = currentQuantity;
    actualizarTotalcart();
}

function subtractAmount(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-amount')[0].value);
    var currentQuantity = selector.getElementsByClassName('cart-item-amount')[0].value;
    currentQuantity--;
    if (currentQuantity >= 1) {
        selector.getElementsByClassName('cart-item-amount')[0].value = currentQuantity;
        actualizarTotalcart();
    }
}

function DeleteItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalcart();
    updateCart();
}

function updateCart() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if (cartItems.childElementCount === 0) {
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;

        var items = document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalcart() {
    var cartContainer = document.getElementsByClassName('cart')[0];
    var cartItems = cartContainer.getElementsByClassName('cart-item');
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('cart-item-cost')[0];
        var price = parseFloat(priceElement.innerText.replace('$', '').replace('.', ''));
        var itemQuantity = cartItem.getElementsByClassName('cart-item-amount')[0].value;
        console.log(price);
        var quantity = itemQuantity;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-cost-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}