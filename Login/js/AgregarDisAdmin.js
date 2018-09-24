$(document).ready(function () {

    
    $('#guardar').click(function () {
        var nombre = $('#DispositivoPermitido').val();
      
        var Datos = {
            nombre: nombre
        };
        firebase.database().ref('DispositivosPermitidos')
            .push(Datos);
        
        $('[type = text]').val("");
        M.toast({
            html: 'Dispositivo Agregado Correctamente'
        });
    });
});