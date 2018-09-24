$(document).ready(function () {
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('DispositivosPermitidos')
            .once('value').then(function (datos) {
                Dispositivos = datos.val();
                $.each(Dispositivos, function (indice, valor) {
                    var mostrar = '<li class="collection-item">'+valor.nombre+'</li>';
                    $(mostrar).appendTo("#listaDispositivos");
                });
            });

    });
    $('.collapsible').collapsible();
});