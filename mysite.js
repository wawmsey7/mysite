
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
    
    if(dir>0){
        loop.i=(loop.i+1)%l 
    } else {
        loop.i=(loop.i+l-1)%l
    }
    
    photos[loop.i].classList.add("currentpic")    
}


function nextphoto_loop(dir){
    
    if(dir==1){ 
        animreset(arrowr)
    } else {
        animreset(arrowl)
    }
    
    nextphoto(dir)
    if(!loop.pause){
        clearInterval(photoloop)
        photoloop=setInterval(nextphoto, loop.time)
    }
}

function animreset(el) {
    el.style.animation = 'none';
//    el.offsetHeight; /* trigger reflow */
    setTimeout(function() {
//               el.style.animation = null; 
               el.style.animation= "example 1.4s"
               })
}

//function clickphoto(){
////    debugger
////    nextphoto_loop()
//}

classitems("album")[0].addEventListener('mouseup', function(e) {
                                        var x=e.offsetX
//                                        var mid=e.path[0].offsetWidth/2
//                                        if(x<mid){ nextphoto_loop(-1) } else { nextphoto_loop(1) }
                                        
//                                        console.log(e)
//                                        var third=e.path[0].offsetWidth/3
                                        var third=e.currentTarget.offsetWidth/3

                                        if(x<third){
                                            nextphoto_loop(-1) 
                                        } else if(x>(2*third)){
                                            nextphoto_loop(1) 
                                        } else {
                                            photoloop_pause()
                                        }
                                        })


function photoloop_pause(){
    var p=loop.pause=+!loop.pause
    if(p){ 
        play.style.animation="none"
        animreset(pause)
        
        clearInterval(photoloop) 
    } else {
//        nextphoto_loop(1)
        
        animreset(play)
        pause.style.animation="none"
        
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



//document.addEventListener('touchstart', touchstart, false);        
//document.addEventListener('touchmove', touchmove, false);
//document.addEventListener('touchend', touchend, false);


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
//    height:[0, function(){return menuitems.offsetHeight} ],
}



function togglemenu2(){
    nav.open=+!nav.open
//    menu.style.height=nav.height[nav.open]
    
    var lines=menubutton.children
    if(nav.open){
        lines[0].classList.add("lineA");lines[0].classList.remove("lineA_");
        lines[1].classList.add("lineB");
        lines[2].classList.add("lineC");lines[2].classList.remove("lineC_");
        menubutton.classList.add("rotate90");
//        menu.style.height=menuitems.offsetHeight
        menu.classList.remove("menu_closed");
        menu.classList.add("menu_open");
        
    } else {
        lines[0].classList.remove("lineA");lines[0].classList.add("lineA_");
        lines[1].classList.remove("lineB");
        lines[2].classList.remove("lineC");lines[2].classList.add("lineC_");
        menubutton.classList.remove("rotate90");
        menu.classList.remove("menu_open");
        menu.classList.add("menu_closed");


    }
    
} 






