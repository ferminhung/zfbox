$(document).on("pageshow","#index",function(event,ui){

    $('#btMenu').click(function(){
        $.mobile.changePage("inicio.html",{ transition : "flip" });
    });

      
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        slideshowSpeed: 4000
    });

    var altura = $(document).width();

    /*Ajustar tamaño de letras en index
    if(altura >= 768)//Ipad para arriba
    {   $('.btn-rojo').attr('style','font-size: 32px !important;');  
        $('#header').attr('style','font-size: 28px !important;');
    }
    if(altura == 320)//Iphone 5
    {   $('.btn-rojo').attr('style','font-size: 15px !important;');
        $('#header').attr('style','font-size: 12px !important;');
    }*/
});