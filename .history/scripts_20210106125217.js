window.onload = function () {
  console.log((document.getElementById('demo').style.display = 'none'));
};
console.log(window);
console.log('xxdd');

// let submitButton = document.getElementById('submitDate');

// submitButton.onclick = function () {
//   console.log('klikniety!!');
// };

let clickedTable = [-1, -1];
let choosenDay = 0;
let choosenHour = 0;

// let reservations = [
//   {
//     name: 'Ala',
//     age:12
//   },
//   {
//     name:'Tom',
//     age:49
//   }
// ]
// console.log(reservations[0].age)
// reservations.forEach(function(element){
//   console.log(element.name)
// })

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
  setTimeout(function () {
    document.getElementById('addingPopUp').style.display = 'none';
  }, 2500);
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

//KOD
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
  //alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  console.log(document.getElementsByClassName('cart-items'));
  // while (cartItems.hasChildNodes()) {
  //   cartItems.removeChild(cartItems.firstChild);
  // }
  updateCartTotal();
  document.getElementById('basketForm').style.display = 'none';
  document.getElementById('getUserData').style.display = 'block';
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
          <button class="btn btn-danger" type="button">USUŃ</button>
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
    total + 'zł';
}

function closeTheForm() {
  console.log('xxx');
  document.getElementById('getUserData').style.display = 'none';
}
function closeThePaymentForm() {
  document.getElementById('payments').style.display = 'none';
}
function goToPayment() {
  console.log('DOTARLES TU ');
  document.getElementById('getUserData').style.display = 'none';
  document.getElementById('payments').style.display = 'block';
}

let reservations = [];

for (let i = 0; i < 8; i++) {
  reservations[i] = [];
  for (let j = 0; j < 14; j++) {
    reservations[i][j] = {
      table0: 'free',
      table1: 'free',
      table2: 'free',
      table3: 'free',
      table4: 'free',
      table5: 'reserved',
    };
  }
}

function updateTables(hour, day) {
  const tables = reservations[hour][day];
  let i = 0;
  console.log(tables);
  for (const table in tables) {
    if (tables[table] == 'free') {
      document.getElementById(i).style.fill = 'green';
      i = i + 1;
    } else if (tables[table] == 'reserved') {
      document.getElementById(i).style.fill = 'red';
      i = i + 1;
    }
  }
}

let k = 0;

function tableClicked(id) {
  if (k == 0) {
    updateTables(0, 0);
    k = k + 1;
  }
  if (document.getElementById(id).style.fill == 'red') {
    return;
  }

  if (document.getElementById(id).style.fill == 'green') {
    if (!addClickedTable(id)) {
      console.log('False');
      return;
    }
    document.getElementById(id).style.fill = 'orange';
    return;
  }

  if (document.getElementById(id).style.fill == 'orange') {
    removeClickedTable(id);
    document.getElementById(id).style.fill = 'green';
    return;
  }
}

function addClickedTable(id) {
  console.log(clickedTable);
  if (clickedTable[0] != -1 && clickedTable[1] != -1) {
    return false;
  }
  if (clickedTable[0] == -1) {
    clickedTable[0] = id;
    return true;
  }
  if (clickedTable[1] == -1) {
    clickedTable[1] = id;
    return true;
  }
}

function removeClickedTable(id) {
  if (clickedTable[0] == id) {
    clickedTable[0] = -1;
  }
  if (clickedTable[1] == id) {
    clickedTable[1] = -1;
  }
}
