var dimlevel = 0.6;
function dimClick(dimval = -1){
        if(dimval >= 0){
                dimlevel = dimval;
        }else{
                dimlevel = dimlevel + 0.1;
                if(dimlevel > 1.0){
                        dimlevel = 0.0;
                }
        }
        document.getElementById("dimOverlay").style.background = "rgba(0,0,0," + dimlevel + ")";

}

