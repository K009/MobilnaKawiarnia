// window.onload = function () {
//   console.log((document.getElementById('demo').style.display = 'none'));
// };
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
function choose() {
  if (document.getElementById('demo').style.display === 'block') {
    console.log('pierwszy if');
    document.getElementById('demo').style.display = 'none';
  } else if (document.getElementById('demo').style.display === 'none') {
    console.log('drugi if');
    document.getElementById('demo').style.display = 'block';
  }
}
