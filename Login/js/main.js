$(document).ready(function(){

    
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .once('value').then(function(datos){

                Dispositivos = datos.val();

                $.each(Dispositivos, function (indice,valor){
                
                    var mostrar = '<li>';
                    mostrar +='<div class="collapsible-header">';
                    mostrar +='<div class="row acordeon">';
                    mostrar +='<div class="col">';
                    mostrar +='<p><b>Dispositivo: </b>' + valor.Nombre + '</p>';
                    mostrar +='</div>';
                    mostrar +='<div class="col">';
                    mostrar +='<p><b>No. Serial : </b>' + valor.Serial + ' </p>';
                    mostrar +='</div>';
                    mostrar +='</div>';
                    mostrar +='</div>';

                    mostrar +='<div class="collapsible-body">';
                    mostrar +='<p><b>Dispositivo: </b>' + valor.Nombre + '</p>';
                    mostrar +='<p><b>No.serial: </b>' + valor.Serial + '</p>';

                    mostrar +='<div class= "detalles_Acor" id="detalles_acordeon">';
                    mostrar +='<p><u>Detalles: </u></p>';
                    mostrar +='<p><b>Procesador: </b>' + valor.Detalles.Procesador + '</p>';
                    mostrar +='<p><b>Disco Duro: </b>' + valor.Detalles.Disco_Duro + '</p>';
                    mostrar +='<p><b>RAM: </b>' + valor.Detalles.RAM + '</p>';
                    mostrar +='</div>';
                    mostrar +='<p><b>Marca: </b>' + valor.Marca + '</p>';
                    mostrar +='<span><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons">close</i></a></span>';
                    mostrar +='<span><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons">edit</i></a></span>';
                    mostrar +='</div>';
                    mostrar +='</li>';

                    console.log(valor, indice);

                    
                    if(valor.Asignacion == "Empresa"){
                        
                        $(mostrar).appendTo('#Dispositivos');
                        
                    }
                    else if(valor.Asignacion == "Propio"){
                        
                        $(mostrar).appendTo('#DispositivosPropios');
                        
                    }
                });
    
            });
    });

    $('.collapsible').collapsible();

});