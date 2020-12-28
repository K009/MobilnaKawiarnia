window.onload = function () {
  console.log(document.getElementById('demo'));
};
// console.log(window);
// console.log('xxdd');

// let submitButton = document.getElementById('submitDate');

// submitButton.onclick = function () {
//   console.log('klikniety!!');
// };

function submit(clicked_id) {
  console.log(clicked_id);
}
console.log(document.getElementById('demo'));
function choose() {
  if (document.getElementById('demo').style.opacity === 'block') {
    document.getElementById('demo').style.display = 'none';
  } else if (document.getElementById('demo').style.display === 'none') {
    document.getElementById('demo').style.display = 'block';
  }
}
document.getElementById('demo').style.display = 'none';
