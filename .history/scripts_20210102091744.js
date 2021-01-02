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
  tbl.style.width = '600px';

  for (var i = 0; i < 2; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < 2; j++) {
      if (i == 2 && j == 1) {
        break;
      } else {
        var td = tr.insertCell();
        td.appendChild(document.createTextNode('Cell'));
        if (i == 1 && j == 1) {
          td.setAttribute('rowSpan', '2');
        }
      }
    }
  }
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
