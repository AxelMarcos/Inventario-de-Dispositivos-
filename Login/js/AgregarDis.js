$(document).ready(function () {
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('DispositivosPermitidos')
            .once('value').then(function (datos) {
                Dispositivos = datos.val();
                $.each(Dispositivos, function (indice, valor) {
                    var mostrar = '<option value="'+valor.nombre+'">' + valor.nombre + '</option>';
                    $(mostrar).appendTo("#listaDispositivos");
                });
            });

    });


    $('#listaDispositivos').change(function () {
        var nombre = $('#listaDispositivos').val();
        console.log(nombre);
   
    });

    $('#listaDispositivos').change(function(){
        var nombre = $('#listaDispositivos').val();
    
        if (nombre == "Computadora" || nombre == "Laptop") {
            $('#nuevotext').css('display','block');
            $('#proceso').focus()
        }
        else if(nombre != "Computadora"){
            $('#nuevotext').css('display','none');
        };
    });

    
    $('#guardarDis').click(function () {
        var nombre = $('#listaDispositivos').val();
        var marca = $('#Marca').val();
        var asignacion = $('#AsignacionText').val();
        var Serial = $('#Serial').val();

        var proces = $('#proceso').val();
        var ram = $('#ram').val();
        var discoduro = $('#discoduro').val();
        var Detall;
        if (proces == "") {
            Detall = {
                Caracteristicas: "NULL"
            }
        }
        else{
            Detall = {
                Procesador: proces,
                RAM: ram,
                Disco_Duro: discoduro
            }
        }

        var user = firebase.auth().currentUser;

        var Datos = {
            Nombre: nombre,
            Marca: marca,
            Serial: Serial,
            Asignacion: asignacion,
            Detalles: Detall
        }
        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .push(Datos);
        
        $('[type = text]').val("");
        document.getElementById('nuevotext').style.display = 'none';

        M.toast({
            html: 'Datos Guardados'
        });


    });
});