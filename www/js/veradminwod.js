$(document).on("pageshow","#veradminwod",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("menuwod.html",{ transition : "flip" });
    });

    $('#liVerWOD').click(function(){
        $.mobile.changePage("miswods.html",{ transition : "flip" });
    });

     $("#liTiempoWOD").click(function(){
        var sMarca=prompt("Ingresa el tiempo o rondas");
        if(sMarca!=null){
            var sComentario=prompt("Comentario acerca del wod");
            if(sMarca==''){
                alert("Debes indicar un tiempo o cantidad de rondas");
            }else{
                $.ajax({
                    data:{
                        sCodigoWebPhp:sIdentificador, sMarcaPhp:sMarca, sComentarioPhp:sComentario, Mandato:'GuardarWODTime'
                    },
                    url:globalURL,
                    method:'POST',
                    beforeSend:function(){
                        $('.cargando').fadeIn();
                    },success:function(respuesta){  
                        if(respuesta!="FULL"){
                            alert(respuesta);
                        }
                    },error:function(jqXHR, textStatus, errorThrown){
                        ajax_error(jqXHR, textStatus, errorThrown,true);
                    }
                });
            }
        }
    });


    $('#btMeGusta').click(function(){
        $('#btMeGusta').css("background-color: red;");
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sWOD=localStorage.getItem("idWOD");   //aSesion["CodigoWeb"];
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sWODPhp:sWOD, Mandato:'MeGustaElWOD'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                if(parseInt(respuesta)>0){
                    $("#btMeGusta").text(" "+respuesta);
                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

	var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'WOD'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var aWOD = JSON.parse(respuesta);
            $.each( aWOD, function( i, value ) { 
                $("#itemswod").html(value['observacion']);
                localStorage.setItem("idWOD", value['id_obser']);
                if(parseInt(value['activa'])>0){
                    $("#btMeGusta").text(" "+parseInt(value['activa']));
                }
            })
            
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
	
	$.ajax({
		data:{
			sCodigoWebPhp:sIdentificador, Mandato:'ListarWODs'
		},
		url:globalURL,
		method:'POST',
		beforeSend:function(){
			$('.cargando').fadeIn();
		},success:function(respuesta){  
			$("#listaWODs option").remove();
			$("#listaWODs").append('<option value="SIN"> -------- </option>');
			if(respuesta!="SIN WOD "){
				var aWODS = JSON.parse(respuesta);
				$.each( aWODS, function( i, value ) { 
					$("#listaWODs").append('<option value="'+value['id_obser']+'" ">'+value['ano_escolar']+'</option>');
				})
			}
		},error:function(jqXHR, textStatus, errorThrown){
			ajax_error(jqXHR, textStatus, errorThrown,true);
		}
	});
    $('#liGuardarWOD').click(function(){
        $.mobile.changePage("guardarwod.html",{ transition : "flip" });
    });

	$("#listaWODs").change(function(){
        var sIdentificador=localStorage.getItem("codigoweb");
		var sWOD=$("#listaWODs").val();	
		$("#itemswod").html(" ");
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sWODPhp:sWOD, Mandato:'WODporID'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){ 
                var aWOD = JSON.parse(respuesta);
				$.each( aWOD, function( i, value ) { 
					$("#itemswod").html(value['observacion']);
					localStorage.setItem("idWOD", value['id_obser']);
					
				})

            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

    });
});

