var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var current_color = "#008000";
var prev_color = "#008000";
var pencil = document.querySelector('.pencil');
var choise_color = document.querySelector('.color_input');
var choise_prev_color = document.querySelector('.color_input.prev');
var pencil_flag = false;
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
document.querySelector('.bucket ').addEventListener('click',function (event) {
    this.classList.add('bg_active');
   pencil_flag = false;
    CleanPencil();


    
})
pencil.addEventListener('click',function (event) {
    pencil_flag = !pencil_flag;
        Draw();
        if(pencil_flag){
            pencil.classList.add('bg_active')
        }
        else{
            pencil.classList.remove('bg_active')
        }
        
    
    
    
})

function Draw() {
  
    
canvas.addEventListener('mousedown', function (event) {
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