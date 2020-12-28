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

function choose() {
  if (document.getElementById('demo').style.display === 'block') {
    document.getElementById('demo').style.display = 'none';
  } else if (document.getElementById('demo').style.display === 'none') {
    document.getElementById('demo').style.display = 'block';
  }
}
forceRedraw(document.getElementById('demo'));
var forceRedraw = function (element) {
  if (!element) {
    return;
  }

  var n = document.createTextNode(' ');
  var disp = element.style.display; // don't worry about previous display style

  element.appendChild(n);
  element.style.display = 'none';

  setTimeout(function () {
    element.style.display = disp;
    n.parentNode.removeChild(n);
  }, 20); // you can play with this timeout to make it as short as possible
};
