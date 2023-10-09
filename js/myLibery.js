$(document).ready(function(){
    let scrollMagic = function(el,value){
        this.elments = el,
        this.value = value,
        this.ToptoBottom = function(value,transtion,timing){
            el.forEach((a,i)=>{
                let posX = value;
                let transtion = transtion;
                let timing = timing;
                if(posX == null){
                    posX = 300
                }
                if(transtion == null){
                    transtion = 500
                }
                if(timing == null){
                    timing = linear
                }
                $(a).css("transition",`${transtion}ms ${timing}`)
                
            });
        },
        this.bottomTotop = function(){
            
        },
        this.LefttoRight = function(){
            
        },
        this.ToptoBottom = function(){
            
        }

    }


    var result = '';
    var target = $('.cost-bar').eq(0).children('p').css('transform');
    var sResult = target.split(',');
    var length = sResult.length;
    result += parseInt(sResult[length-2]) + " " + parseInt(sResult[length-1]) + " " + parseInt(sResult[length-3]);
    console.log(result);    
})