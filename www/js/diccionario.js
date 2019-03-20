$(document).on("pageshow","#diccionario",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("panel.html",{ transition : "flip" });
    });

        
});

