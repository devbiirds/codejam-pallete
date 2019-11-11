var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var current_color = "#008000";
var prev_color = "#008000";
var pencil = document.querySelector('.pencil');
var choise_color = document.querySelector('.color_input');
var choise_prev_color = document.querySelector('.color_input.prev');

// flags 
var pencil_flag = false;
var pipette_flag = false;
var fill_flag = false;
var draw = false;

var pixelData;


document.querySelector('.color_input.blue').addEventListener('click',function (event) {
    prev = current_color;
    choise_color.style.background = "#0000FF";
    current_color = "#0000FF";
    choise_prev_color.style.background = prev;
})


document.querySelector('.prev_color').addEventListener('click',function(){
choise_color.style.background = prev;
choise_prev_color.style.background = current_color;
current_color = prev;
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
   pipette_flag=false;
   fill_flag = true;
    CleanPencil();
    CleanPippete();
    if(fill_flag){
        Fill();    
    }
  

    
})

var pipette = document.querySelector('.pipette');
pipette.addEventListener('click',function () {
    pipette_flag = true;
    CleanFill();
    CleanPencil();
    if(pipette_flag){
        this.classList.add('bg_active');
    }
    else{
        this.classList.remove('bg_active');
    }
        canvas.addEventListener('click',function (event) {
            if(pipette_flag){
            pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;  
            var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
            console.log(hex);
             prev = current_color;
             choise_color.style.background = hex;
             current_color = hex;
            choise_prev_color.style.background = prev;
        }
        })
    
    
})
pencil.addEventListener('click',function (event) {
    pencil_flag = !pencil_flag;
    fill_flag = false;
    CleanPippete()
    CleanFill();
    if(pencil_flag){
        Draw();
        pencil.classList.add('bg_active');
        
    }
    else{
        pencil.classList.remove('bg_active');
        draw = false;
    }
   
        
    
    
    
})

function Draw() {
  
canvas.addEventListener('mousedown',function () {
    if(pencil_flag){
        draw = true;
    }
    canvas.addEventListener('mousemove', function (event) {
   
   
        var resultXmax,resultXmin,resultYmax,resultYmin;
        for(let i = 0 ; i <= 512 ; i+=16){
            if( i > event.offsetX){
                resultXmax = i;
                break;
            }
            if(i < event.offsetX){
              
                resultXmin = i;
            }
        }
        for(let i = 0 ; i <= 512 ; i+=16){
            if(i > event.offsetY){
              resultYmax = i;
                break;
            }
            if(i < event.offsetY){
                resultYmin = i;
            }
        }
        if(draw == true){
        ctx.fillStyle= current_color;
        ctx.fillRect(resultXmin,resultYmin,16,16);
        
    }
    
    })
    canvas.addEventListener('mouseup',function () {
        draw = false;
        
    })
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
    pencil_flag=false;
    draw = false;
    pencil.classList.remove('bg_active');
}
function CleanFill() {
    fill_flag=false;
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
function CleanPippete() {
    
        pipette.classList.remove('bg_active');
        pipette_flag = false;
    
        
    
    
    
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}