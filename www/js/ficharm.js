$(document).on("pageshow","#ficharm",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VerRM'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $.mobile.loading( "show", {
                      text: "cargando",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
        },success:function(respuesta){ 
            $.mobile.loading( "hide" );
            var aRM = JSON.parse(respuesta);
            $.each( aRM, function( i, value ) { 
                document.formRM.tRM1.value=value['RM1'];
                document.formRM.tRM2.value=value['RM2'];
                document.formRM.tRM3.value=value['RM3'];
                document.formRM.tRM4.value=value['RM4'];
                document.formRM.tRM5.value=value['RM5'];
                document.formRM.tRM6.value=value['RM6'];
                document.formRM.tRM7.value=value['RM7'];
                document.formRM.tRM8.value=value['RM8'];
            })
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volver").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });
    $("#btHome").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });

    $("#liGuardarRM").click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");
        if(sIdentificador!="50104608081"){
            var sRM1=$("#tRM1").val();
            var sRM2=$("#tRM2").val();
            var sRM3=$("#tRM3").val();
            var sRM4=$("#tRM4").val();
            var sRM5=$("#tRM5").val();
            var sRM6=$("#tRM6").val();
            var sRM7=$("#tRM7").val();
            var sRM8=$("#tRM8").val();
            $("#liGuardarRM").html("<span class='icon-hour-glass'></span> Esperando Respuesta");
            $("#liGuardarRM").css("background-color","orange");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sRM1Php:sRM1, sRM2Php:sRM2, sRM3Php:sRM3, sRM4Php:sRM4, sRM5Php:sRM5, sRM6Php:sRM6, sRM7Php:sRM7, sRM8Php:sRM8, Mandato:'GuardarRM'
                },
                url:globalURL,
                method:'POST',
                beforeSend:function(){
                    $.mobile.loading( "show", {
                      text: "cargando",
                      textVisible: true,
                      theme: "a",
                      html: ""
                    });
                },success:function(respuesta){ 
                    $.mobile.loading( "hide" ); 
                    if(respuesta=="A"){
                        $("#liGuardarRM").html('<span class="icon-checkmark"></span> Actualizado <span class="icon-happy"></span>');
                        $("#liGuardarRM").css("background-color","green");
                    }else{
                        alert(respuesta);
                        $("#liGuardarRM").html("<span class='icon-sad'></span> Vuelve a Intentarlo");
                        $("#liGuardarRM").css("background-color","red");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }
        
    });

});
