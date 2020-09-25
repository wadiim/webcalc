var div;
var mousePosition;
var offset = [0,0];
var isDown = false;

topp = document.getElementById("top");
calc = document.getElementById("calc");

topp.addEventListener('mousedown', function(e) {
  isDown = true;
  offset = [
    calc.offsetLeft - e.clientX,
    calc.offsetTop - e.clientY
  ];
  topp.style.cursor = "-moz-grabbing";
  calc.style.borderColor = "rgba(164, 164, 164, 1)";
}, true);

document.addEventListener('mouseup', function() {
  isDown = false;
  topp.style.cursor = "-moz-grab";
  calc.style.borderColor = "rgba(164, 164, 164, 0.7)";
}, true);

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDown) {
    mousePosition = {
      x : event.clientX,
      y : event.clientY
    };
    calc.style.left = (mousePosition.x + offset[0]) + 'px';
    calc.style.top  = (mousePosition.y + offset[1]) + 'px';
  }
}, true);

document.getElementById('C').onclick = function() { parser.reset(); }
document.getElementById('back').onclick = function() { parser.removeLast(); }
document.getElementById('equal').onclick = function() { parser.showResult(); }

var val = document.getElementsByClassName('val');
var input = document.getElementById('input');

for (var i = 0; i < val.length; ++i) {
  val[i].onclick = function() {
    parser.append(this.firstChild.nodeValue);
    input.scrollLeft = input.scrollWidth;
  }
}
