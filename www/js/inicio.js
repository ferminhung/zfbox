$(document).on("pageshow","#inicio",function(event,ui){
    localStorage.setItem("idReserva","0");
    localStorage.setItem("codigoweb","0");
    localStorage.setItem("estatus", "0");
    localStorage.setItem("idWOD", "0");

    $('#tUsuario').val(localStorage.getItem("usuario"));
    $('#tClave').val(localStorage.getItem("clave"));
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        slideshowSpeed: 4000
    });

    var altura = $(document).width();

    $('#btnIngresar').click(function(){
        var sCodigoWeb = $('#tCodigoWeb').val();
        if(sCodigoWeb!=''){
            $.ajax({
                data:{
                    sCodigoWebPhp:sCodigoWeb,Mandato:'Ingresar'
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
                    localStorage.setItem("codigoweb",sCodigoWeb);
                    localStorage.setItem("estatus", respuesta[0]);
                    if(respuesta[0]=='1'){
                        $.mobile.changePage("panel.html",{ transition : "fade" });
                    }else if(respuesta[0]=='2'){
                        $.mobile.changePage("paneladmin.html",{ transition : "fade" });
                    }else if(respuesta[0]=='3'){
                        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
                    }else if(respuesta[0]=='E'){
                        alert("Codigo de acceso No existe :(");
                    }else{
                        alert(respuesta+"!!!!");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        };
    });

    $('#btnIngresarUser').click(function(){
        var sUsuario = $('#tUsuario').val();
        var sClave = $('#tClave').val();
        if(sUsuario!='' && sClave!=''){
            $.ajax({
                data:{
                    sUsuarioPhp:sUsuario, sClavePhp:sClave, Mandato:'IngresarCuenta'
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
                    if (respuesta=="No Existe Cuenta Asociada"){
                        alert(respuesta);
                    }else{
                        var aContacto = JSON.parse(respuesta);
                        $.each( aContacto, function( i, value ) {
                            localStorage.setItem("codigoweb",value['codigo']);
                            localStorage.setItem("estatus", value['estatus']);
                            localStorage.setItem("usuario",sUsuario);
                            localStorage.setItem("clave", sClave);
                            if(value['estatus']=='2'){
                                $.mobile.changePage("panel.html",{ transition : "fade" });
                            }else if(value['estatus']=='1'){
                                $.mobile.changePage("paneladmin.html",{ transition : "fade" });
                            }else if(value['estatus']=='0'){
                                alert("Cuenta Inactiva");
                            }else{
                                alert("Error de Conexión");
                            }
                    });

                    }                        
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        };
    });
});