window.onload = function () {
  console.log((document.getElementById('demo').style.display = 'none'));
};
console.log(window);
console.log('xxdd');

// let submitButton = document.getElementById('submitDate');

// submitButton.onclick = function () {
//   console.log('klikniety!!');
// };

function submit(clicked_id) {
  console.log(clicked_id);
}
// $('#demo').hide();
console.log(document.getElementById('demo'));
function choose() {
  // if (!document.getElementById('demo')) {
  //   document.getElementById('demo').style.display === 'block';
  // }
  if (document.getElementById('demo').style.display === 'block') {
    console.log('pierwszy if');
    document.getElementById('demo').style.display = 'none';
  } else if (document.getElementById('demo').style.display === 'none') {
    console.log('drugi if');
    document.getElementById('demo').style.display = 'block';
  }
}

let productsInBasket = [];
function addToBasket(clicked_id) {
  document.getElementById('addingPopUp').style.display = 'block';
  productsInBasket.push(clicked_id);

  console.log(productsInBasket);
}

function goToBasket() {
  document.getElementById('basketForm').style.display = 'block';
  tableCreate();
}

function closeBasket() {
  document.getElementById('basketForm').style.display = 'none';
}
function tableCreate() {
  var tbl = document.createElement('table');
  tbl.style.width = '900px';

  // for (var i = 0; i < 2; i++) {
  //   var tr = tbl.insertRow();
  for (var j = 0; j < productsInBasket.length; j++) {
    tbl
      .insertRow()
      .insertCell()
      .appendChild(document.createTextNode(productsInBasket[j]));
    // if (i == 2 && j == 1) {
    //   break;
    // } else {
    //   var td = tr.insertCell();
    //   td.appendChild(document.createTextNode('Cell'));
    //   if (i == 1 && j == 1) {
    //     td.setAttribute('rowSpan', '2');
    //   }
    // }
  }
  // }
  document.getElementById('basketForm').appendChild(tbl);
}
function openForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}

function closePopUp() {
  document.getElementById('addingPopUp').style.display = 'none';
}

//KOD Z GITHUBA
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  document
    .getElementsByClassName('btn-purchase')[0]
    .addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('Ten produkt został już dodany do Twojego koszyka');
      return;
    }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', removeCartItem);
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
}
