window.onload = function () {
  console.log((document.getElementById('demo').style.display = 'none'));
  document.getElementById('chooseHour').textContent = getCurrentHour();
  document.getElementById('chooseDate').textContent = getCurrentDate();
  document.getElementById('submitDate').disabled = true;
  prepareReservations();
  updateTables();
  tableClicked();
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
let dd = 0;
let mm = 0;
let hh = 0;
let isTodayOpen = true;

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

function updateDateButton(day, month) {
  dd = day;
  mm = month;
  month = month + 1;
  day = String(day).padStart(2, '0');
  month = String(month).padStart(2, '0');
  document.getElementById('chooseDate').textContent =
    day + '/' + month + '/2021';
  clickedTable[0] = -1;
  clickedTable[1] = -1;
  updateTables();
}

function getCurrentDate() {
  var today = new Date();
  let day;
  if (!isTodayOpen) {
    dd = today.getDate() + 1;
    day = String(today.getDate() + 1).padStart(2, '0');
  } else {
    dd = today.getDate();
    day = String(today.getDate()).padStart(2, '0');
  }

  mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = day + '/' + mm + '/' + yyyy;
  return today;
}

function getCurrentHour() {
  var today = new Date();
  var hour = today.getHours();
  hour = hour + 1;
  if (hour > 17 || hour < 10) {
    hour = 10;
    isTodayOpen = false;
  }
  hh = hour - 10;
  hour = String(hour).padStart(2, '0');
  hour = hour + ':00';
  return hour;
}

// $('#demo').hide();
console.log(document.getElementById('demo'));
function choose() {
  // if (!document.getElementById('demo')) {
  //   document.getElementById('demo').style.display === 'block';
  // }
  if (document.getElementById('demo').style.display === 'block') {
    document.getElementById('demo').style.display = 'none';
  } else if (document.getElementById('demo').style.display === 'none') {
    document.getElementById('demo').style.display = 'block';
  }
}

function hourClicked(hour, id) {
  document.getElementById('chooseHour').textContent = hour;
  hh = id;
  clickedTable[0] = -1;
  clickedTable[1] = -1;
  updateTables();
}

let productsInBasket = [],
  sum = 0.0;
function addToBasket(product) {
  document.getElementById('addingPopUp').style.display = 'block';

  productsInBasket.push(product);
  if (product === 'Frytki') sum += 9.99;
  if (product === 'Szarlotka') sum += 23.99;
  if (product === 'Szejk waniliowy') sum += 8.99;

  setTimeout(function () {
    document.getElementById('addingPopUp').style.display = 'none';
  }, 2500);
  console.log(productsInBasket);
}

function goToBasket() {
  document.getElementById('basketForm').style.display = 'block';
  //tableCreate();
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
let cartItemsGlobal;
function purchaseClicked() {
  //alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  cartItemsGlobal = cartItems;
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

let productsComplex = [];
let endPrice;
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

    let temp1 = quantityElement.value,
      temp2 = priceElement.innerText;
    let oneProduct = { temp2, temp1 };
    productsComplex.push(oneProduct);

    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  endPrice = document.getElementsByClassName('cart-total-price')[0];
  endPrice.innerText = total + 'zł';
}

function closeTheForm() {
  console.log('xxx');
  document.getElementById('getUserData').style.display = 'none';
}

function closeTheBasket() {
  document.getElementById('basketForm').style.display = 'none';
}

function closeThePaymentForm() {
  document.getElementById('payments').style.display = 'none';
  while (document.getElementById('summary'))
    document.getElementById('summary').remove();
  while (document.getElementById('paymentImg'))
    document.getElementById('paymentImg').remove();
  if (document.getElementById('summaryPrice'))
    document.getElementById('summaryPrice').remove();
  if (document.getElementById('paymentMethodTitle'))
    document.getElementById('paymentMethodTitle').remove();
  while (cartItemsGlobal.hasChildNodes()) {
    cartItemsGlobal.removeChild(cartItemsGlobal.firstChild);
    endPrice.innerText = '0.0 zł';
  }

  document.getElementById('name').value = '';
  document.getElementById('surname').value = '';
  document.getElementById('phone_number').value = '';
  document.getElementById('reservation_number').value = '';
  document.getElementById('address').value = '';

  productsInBasket = [];
}

let reservations = [];
function closeDetailedView() {
  document.getElementById('detailedView').style.display = 'none';
  if (document.getElementById('temporaryDiv'))
    document.getElementById('temporaryDiv').remove();
  if (document.getElementById('description'))
    document.getElementById('description').remove();
}

function createProduct(productsInBasket, howMany) {
  let friesQuantity = 0,
    applePieQuantity = 0,
    shakeQuantity = 0,
    length = productsComplex.length;

  console.log(productsComplex);
  if (productsComplex[length - 1].temp2 === '23.99zł') {
    applePieQuantity = productsComplex[length - 1].temp1;
    if (productsComplex[length - 2].temp2 === '8.99zł') {
      shakeQuantity = productsComplex[length - 2].temp1;
      friesQuantity = productsComplex[length - 3].temp1;
    } else {
      shakeQuantity = productsComplex[length - 3].temp1;
      friesQuantity = productsComplex[length - 2].temp1;
    }
  }
  if (productsComplex[length - 1].temp2 === '8.99zł') {
    shakeQuantity = productsComplex[length - 1].temp1;
    if (productsComplex[length - 2].temp2 === '23.99zł') {
      applePieQuantity = productsComplex[length - 2].temp1;
      friesQuantity = productsComplex[length - 3].temp1;
    } else {
      friesQuantity = productsComplex[length - 3].temp1;
      applePieQuantity = productsComplex[length - 2].temp1;
    }
  }
  if (productsComplex[length - 1].temp2 === '9.99zł') {
    friesQuantity = productsComplex[length - 1].temp1;
    if (productsComplex[length - 2].temp2 === '23.99zł') {
      applePieQuantity = productsComplex[length - 2].temp1;
      shakeQuantity = productsComplex[length - 3].temp1;
    } else {
      shakeQuantity = productsComplex[length - 3].temp1;
      applePieQuantity = productsComplex[length - 2].temp1;
    }
  }

  for (let i = 0; i < howMany; i++) {
    if (productsInBasket[i] === 'Frytki') {
      let tag = document.createElement('div');
      tag.id = 'summary';
      var text = document.createTextNode(
        productsInBasket[i] + ' x ' + friesQuantity
      );
      tag.appendChild(text);
      var element = document.getElementById('payments');
      element.appendChild(tag);
    }
    if (productsInBasket[i] === 'Szarlotka') {
      let tag = document.createElement('div');
      tag.id = 'summary';
      var text = document.createTextNode(
        productsInBasket[i] + ' x ' + applePieQuantity
      );
      tag.appendChild(text);
      var element = document.getElementById('payments');
      element.appendChild(tag);
    }
    if (productsInBasket[i] === 'Szejk waniliowy') {
      let tag = document.createElement('div');
      tag.id = 'summary';
      var text = document.createTextNode(
        productsInBasket[i] + ' x ' + shakeQuantity
      );
      tag.appendChild(text);
      var element = document.getElementById('payments');
      element.appendChild(tag);
    }
  }
}

function validateForm() {
  let name = document.getElementById('name').value,
    surname = document.getElementById('surname').value,
    phone_number = document.getElementById('phone_number').value,
    reservation_number = document.getElementById('reservation_number').value,
    address = document.getElementById('address').value;

  console.log(name);
  console.log(surname);
  console.log(phone_number);
  console.log(reservation_number);
  console.log(address);

  if (
    name == null ||
    name == '' ||
    surname == null ||
    surname == '' ||
    phone_number == null ||
    phone_number == '' ||
    reservation_number == null ||
    reservation_number == '' ||
    address == null ||
    address == ''
  ) {
    alert('Żadne pole nie może być puste ');
    return false;
  } else if (phone_number.length < 9) {
    alert('Numer telefonu musi mieć conajmniej 9 znaków');
    return false;
  }
  return true;
}

function goToPayment() {
  if (!validateForm()) {
    return;
  }
  console.log('DOTARLES TU ');
  document.getElementById('getUserData').style.display = 'none';
  document.getElementById('payments').style.display = 'block';

  if (productsComplex.length < 3) {
    productsComplex.push(productsComplex[productsComplex.length - 1]);
    productsComplex.push(productsComplex[productsComplex.length - 1]);
  }
  if (productsInBasket.length === 1) createProduct(productsInBasket, 1);
  if (productsInBasket.length === 2) createProduct(productsInBasket, 2);
  if (productsInBasket.length >= 3) createProduct(productsInBasket, 3);

  let total = 0,
    length = productsComplex.length;

  //console.log(productsComplex);
  if (productsInBasket.length >= 3) {
    total =
      productsComplex[length - 1].temp1 *
        parseFloat(productsComplex[length - 1].temp2) +
      productsComplex[length - 2].temp1 *
        parseFloat(productsComplex[length - 2].temp2) +
      productsComplex[length - 3].temp1 *
        parseFloat(productsComplex[length - 3].temp2);
  }
  if (productsInBasket.length === 2) {
    total =
      productsComplex[length - 1].temp1 *
        parseFloat(productsComplex[length - 1].temp2) +
      productsComplex[length - 2].temp1 *
        parseFloat(productsComplex[length - 2].temp2);
  }
  if (productsInBasket.length === 1) {
    total =
      productsComplex[length - 1].temp1 *
      parseFloat(productsComplex[length - 1].temp2);
  }

  let tag = document.createElement('div');
  tag.id = 'summaryPrice';
  var text = document.createTextNode('Suma: ' + total.toFixed(2) + 'zł');
  tag.appendChild(text);
  var element = document.getElementById('payments');
  element.appendChild(tag);

  console.log(productsComplex);

  let tag2 = document.createElement('div');
  tag2.id = 'paymentMethodTitle';
  var text2 = document.createTextNode('Wybierz metodę płatności:');
  tag2.appendChild(text2);
  var element2 = document.getElementById('elementsOnTheRight1');
  element2.appendChild(tag2);

  var img = document.createElement('img');
  img.src = 'Images/ing.png';
  img.id = 'paymentImg';
  document.getElementById('elementsOnTheRight1').appendChild(img);
  img.style.width = '140px';
  img.style.height = '70px';
  img.style.float = 'left';
  img.style.marginTop = '10px';

  var img = document.createElement('img');
  img.id = 'paymentImg';
  img.src = 'Images/blik.png';
  document.getElementById('elementsOnTheRight1').appendChild(img);
  img.style.width = '140px';
  img.style.height = '70px';
  img.style.float = 'left';

  var img = document.createElement('img');
  img.id = 'paymentImg';
  img.src = 'Images/alior.png';
  document.getElementById('elementsOnTheRight1').appendChild(img);
  img.style.width = '140px';
  img.style.height = '70px';
  img.style.float = 'left';
}

let friesDescription =
  'Pokrojone w kształt słupków i smażone w głębokim tłuszczu ziemniaki albo inne warzywa, które są rzadziej stosowane. Podawane jako samodzielny posiłek typu fast food lub jako dodatek do potraw pieczonych lub smażonych, np. ryb.';
let shakeDescription =
  'Mleczny napój serwowany na zimno, często z dodatkiem lodów. Istnieje wiele jego wersji, o różnych smakach, m.in.: waniliowy, czekoladowy, truskawkowy, bananowy, kokosowy, pistacjowy, jagodowy itp. Wersją shakea bez mleka jest smoothie.';
let applePieDescription =
  'Pochodzący z Francji wyrób cukierniczy, wynalazek przypisywany Marie-Antoineowi Carêmeowi, składający się z półkruchego lub kruchego ciasta oraz owoców. Carême miał stworzyć ciasto o nazwie charlotte russe specjalnie dla cara Aleksandra I, swego wieloletniego pracodawcy.';

function displayDetails(nameOfProduct) {
  console.log('here');
  document.getElementById('detailedView').style.display = 'block';
  document.getElementById('productName').innerHTML = nameOfProduct;

  var temp = document.createElement('div');
  temp.id = 'temporaryDiv';
  document.getElementById('elementsOnTheRight2').appendChild(temp);

  var img = document.createElement('img');
  img.src = 'Images/' + nameOfProduct + '.jpg';
  document.getElementById('temporaryDiv').appendChild(img);
  img.style.height = '250px';
  img.style.float = 'left';

  let tag = document.createElement('div');
  tag.id = 'description';
  if (nameOfProduct === 'Frytki')
    var text = document.createTextNode(friesDescription);
  if (nameOfProduct === 'Szejk waniliowy')
    var text = document.createTextNode(shakeDescription);
  if (nameOfProduct === 'Szarlotka')
    var text = document.createTextNode(applePieDescription);
  tag.appendChild(text);
  var element = document.getElementById('detailedView');
  element.appendChild(tag);
}

for (let i = 0; i < 8; i++) {
  reservations[i] = [];
  for (let j = 0; j < 14; j++) {
    reservations[i][j] = {
      table0: 'free',
      table1: 'free',
      table2: 'free',
      table3: 'free',
      table4: 'free',
      table5: 'free',
    };
  }
}

function prepareReservations() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 14; j++) {
      let moduloHours = i % 3;
      let moduloDays = j % 3;
      switch (moduloHours) {
        case 0:
          switch (moduloDays) {
            case 0:
              reservations[i][j].table0 = 'reserved';
              reservations[i][j].table1 = 'reserved';
              break;

            case 1:
              reservations[i][j].table2 = 'reserved';
              reservations[i][j].table4 = 'reserved';
              break;

            case 2:
              reservations[i][j].table3 = 'reserved';
              reservations[i][j].table4 = 'reserved';
              break;
          }
          break;

        case 1:
          switch (moduloDays) {
            case 0:
              reservations[i][j].table2 = 'reserved';
              reservations[i][j].table1 = 'reserved';
              break;

            case 1:
              reservations[i][j].table2 = 'reserved';
              reservations[i][j].table5 = 'reserved';
              break;

            case 2:
              reservations[i][j].table3 = 'reserved';
              reservations[i][j].table0 = 'reserved';
              break;
          }
          break;

        case 2:
          switch (moduloDays) {
            case 0:
              reservations[i][j].table0 = 'reserved';
              reservations[i][j].table2 = 'reserved';
              break;

            case 1:
              reservations[i][j].table1 = 'reserved';
              reservations[i][j].table4 = 'reserved';
              break;

            case 2:
              reservations[i][j].table5 = 'reserved';
              reservations[i][j].table2 = 'reserved';
              break;
          }
          break;
      }
    }
  }
}

function updateTables() {
  let hour = hh % 8;
  let day = dd % 14;
  const tables = reservations[hour][day];
  let i = 0;
  for (const table in tables) {
    if (tables[table] == 'free') {
      document.getElementById(i).style.fill = 'rgb(125, 185, 125)';
      i = i + 1;
    } else if (tables[table] == 'reserved') {
      document.getElementById(i).style.fill = 'rgb(179, 36, 0)';
      i = i + 1;
    }
  }
  console.log('Update tables: ' + day + ' ' + hour);
}

function submit() {
  let hour = hh % 8;
  let day = dd % 14;
  if (clickedTable[0] == 0 || clickedTable[1] == 0) {
    reservations[hour][day].table0 = 'reserved';
  }
  if (clickedTable[0] == 1 || clickedTable[1] == 1) {
    reservations[hour][day].table1 = 'reserved';
  }
  if (clickedTable[0] == 2 || clickedTable[1] == 2) {
    reservations[hour][day].table2 = 'reserved';
  }
  if (clickedTable[0] == 3 || clickedTable[1] == 3) {
    reservations[hour][day].table3 = 'reserved';
  }
  if (clickedTable[0] == 4 || clickedTable[1] == 4) {
    reservations[hour][day].table4 = 'reserved';
  }
  if (clickedTable[0] == 5 || clickedTable[1] == 5) {
    reservations[hour][day].table5 = 'reserved';
  }

  clickedTable[0] = -1;
  clickedTable[1] = -1;
  updateTables();
}

function tableClicked(id) {
  if (document.getElementById(id).style.fill == 'rgb(179, 36, 0)') {
    return;
  }

  if (document.getElementById(id).style.fill == 'rgb(125, 185, 125)') {
    if (!addClickedTable(id)) {
      console.log('False');
      return;
    }
    document.getElementById(id).style.fill = 'rgb(255, 166, 77)';
    return;
  }

  if (document.getElementById(id).style.fill == 'rgb(255, 166, 77)') {
    removeClickedTable(id);
    document.getElementById(id).style.fill = 'rgb(125, 185, 125)';
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
    document.getElementById('submitDate').disabled = false;
    return true;
  }
  if (clickedTable[1] == -1) {
    clickedTable[1] = id;
    document.getElementById('submitDate').disabled = false;
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
  if (clickedTable[0] == -1 && clickedTable[1] == -1) {
    document.getElementById('submitDate').disabled = true;
  }
}
