


//get document item by id
function itemid(id){return document.getElementById(id)}

//get items by class    
function classitems(name,element=document){return element.getElementsByClassName(name)}

//array from html element list
function toarr(item){return Array.prototype.slice.call(item)}




var photos=toarr(classitems("picture"))

var pic=classitems("currentpic")[0]

var loop={
    i:Array.from(pic.parentNode.children).indexOf(pic),
    pause:0,
    time:6000
}

var photoloop=setInterval(nextphoto, loop.time);


function nextphoto(dir=1){
        
    var l=photos.length
    
    photos[loop.i].classList.remove("currentpic")
    
    if(dir>0){ loop.i=(loop.i+1)%l } else { loop.i=(loop.i+l-1)%l }
    
    photos[loop.i].classList.add("currentpic")    
}


function nextphoto_loop(dir){
    
    nextphoto(dir)
    if(!loop.pause){
        clearInterval(photoloop)
        photoloop=setInterval(nextphoto, loop.time)
    }
}

function clickphoto(){
    nextphoto_loop()
}

function photoloop_pause(){
    var p=loop.pause=+!loop.pause
    if(p){ 
        clearInterval(photoloop) 
    } else {
//        nextphoto_loop(1)
        nextphoto()
        photoloop=setInterval(nextphoto, loop.time)
    }
}


document.onkeydown = keystuff

function keystuff(e){
//    console.log(e.keyCode)
    
    if(e.keyCode===37){nextphoto_loop(-1)}//l
    if(e.keyCode===39){nextphoto_loop(1)}//r
    
    if(e.keyCode===32){ photoloop_pause() }
}



document.addEventListener('touchstart', touchstart, false);        
document.addEventListener('touchmove', touchmove, false);
document.addEventListener('touchend', touchend, false);


var touch=false
var tstartX

function touchstart(e){
    touch=true
//    console.log(e)
    tstartX=e.touches[0].clientX
    tstartT=performance.now()
}

function touchend(e){
    touch=false
//    console.log(e)
}

function touchmove(e){
//    console.log(e)
    
    if(!touch){return}
    
    var movement=e.touches[0].clientX - tstartX
    
    if(movement>200 && (performance.now()-tstartT)<800 ){ nextphoto_loop(1); touch=false}
    if(movement<-200 && (performance.now()-tstartT)<800 ){ nextphoto_loop(-1); touch=false }

}


var nav={
    pos:600,
    type:2,
    open:0,
    height:[0, 315],
}



function togglemenu2(){
    nav.open=+!nav.open
    menu.style.height=nav.height[nav.open]
    
    var lines=menubutton.children
    if(nav.open){
        lines[0].classList.add("lineA");
        lines[1].classList.add("lineB");
        lines[2].classList.add("lineC");
        menubutton.classList.add("rotate90");
        
    } else {
        lines[0].classList.remove("lineA");
        lines[1].classList.remove("lineB");
        lines[2].classList.remove("lineC");
        menubutton.classList.remove("rotate90");
    }
    
} 







