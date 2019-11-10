var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var current_color = "#008000";
var prev_color = "#008000";
var pencil = document.querySelector('.pencil');
var choise_color = document.querySelector('.color_input');
var choise_prev_color = document.querySelector('.color_input.prev');
var pencil_flag = false;
var fill_flag = false;
var pixelData;
var pippete = true;
document.querySelector('.color_input.blue').addEventListener('click',function (event) {
    prev = current_color;
    choise_color.style.background = "#0000FF";
    current_color = "#0000FF";
    choise_prev_color.style.background = prev;
})
document.querySelector('.color_input.red').addEventListener('click',function (event) {
    prev = current_color;
    choise_color.style.background = "#FF0000";
    current_color = "#FF0000";
    choise_prev_color.style.background = prev;
})
var bucket = document.querySelector('.bucket');

bucket.addEventListener('click',function (event) {
    this.classList.add('bg_active');
   pencil_flag = false;
   fill_flag = true;
    CleanPencil();
    Fill();

    
})
document.querySelector('.pipette').addEventListener('click',function () {
    pippete = true;
    this.classList.add('bg_active');
    if(pippete == true ){
        canvas.addEventListener('click',function (event) {
            pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;      
        })
        
    }
    
    
})
pencil.addEventListener('click',function (event) {
    pencil_flag = !pencil_flag;
    fill_flag = false;
    CleanFill();
        Draw();
        if(pencil_flag){
            pencil.classList.add('bg_active')
        }
        else{
            pencil.classList.remove('bg_active')
        }
        
    
    
    
})

function Draw() {
  
    
canvas.addEventListener('mousemove', function (event) {
   
   
    var resultXmax,resultXmin,resultYmax,resultYmin;
    for(let i = 0 ; i <= 512 ; i+=128){
        if( i > event.offsetX){
            resultXmax = i;
            break;
        }
        if(i < event.offsetX){
          
            resultXmin = i;
        }
    }
    for(let i = 0 ; i <= 512 ; i+=128){
        if(i > event.offsetY){
          resultYmax = i;
            break;
        }
        if(i < event.offsetY){
            resultYmin = i;
        }
    }
    if(pencil_flag == true){
    ctx.fillStyle= current_color;
    ctx.fillRect(resultXmin,resultYmin,128,128);
    
}
})
canvas.addEventListener('mouseup',function () {
    pencil_flag= false;
})
}




choise_color.addEventListener('click',function (event) {

    ChangeColor();

})


function ChangeColor() {
var input_color = document.getElementById('input_color');
prev = current_color;
input_color.click();
input_color.addEventListener('change',function () {
    choise_color.style.background = input_color.value;
    current_color = input_color.value;
    choise_prev_color.style.background = prev;
})
}



function CleanPencil() {
    pencil.classList.remove('bg_active');
}
function CleanFill() {
    bucket.classList.remove('bg_active');
}
function Fill() {
    canvas.addEventListener('click',function (event) {
        if(fill_flag){
        ctx.fillStyle= current_color;
    ctx.fillRect(0,0,512,512);
}  
})
}
