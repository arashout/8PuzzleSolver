window.onload = function() {
    document.getElementById("spaceTile").onclick = function goUp(){
        var spaceTile = document.getElementById("spaceTile");
        var computedStyle = getComputedStyle(spaceTile, null);
        var oldPos = parseInt(computedStyle.left);
        var newPos = parseInt(computedStyle.left) + 50;
        animate(
            spaceTile,"left","px",oldPos,newPos,1000
        );
    }
}
function animate(elem,style,unit,from,to,time) {
    if( !elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from))+unit;
            if( step == 1) clearInterval(timer);
        },25);
    elem.style[style] = from+unit;
}