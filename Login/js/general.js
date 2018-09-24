$(document).ready(function(){
    // Seguridad para Saber si ha Iniciado Seccion
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // firebase.auth().currentUser nos ayuda a elejir el usuario            
            var as = firebase.auth().currentUser;

            // Se conecta a ala base de datos y Busca los valores del usuario conectado
            firebase.database().ref("Usuario/" + as.uid + "/Cuenta")
                .once("value").then(VerDatos);

            // Dibujar los valore en la paginaVerDatos
            var logueado = '<li>Salir</li>';
            logueado += '<li><a class="waves-effect waves-light btn light-green darken-1"><i class="material-icons" id="btnLogout">exit_to_app</i></a></li>';

            // la variable 'logeado' se va a dibujar en el ID nav-mobile
            $(logueado).appendTo('#nav-mobile');

            $("#loader").fadeOut("slow");
            $(btnLogout).click(desconectar);

        } else {
            location.assign('index.html');
        }
    });
    $('.sidenav').sidenav();
});

// Funcion para dibujar los datos en la pagina
// esta funcion se usa en la linea 12
function VerDatos(snapshot) {
    var datos = snapshot.val();
    var nombre = (snapshot.val() && snapshot.val().Nombre);
    var foto = (snapshot.val() && snapshot.val().Foto);
    var email = (snapshot.val() && snapshot.val().Correo);
    
    var MostrarDatos = '<a href="#user"><img class="circle" src=' + foto + '></a>';
    MostrarDatos += '<a href="#name"><span class="white-text name">' + nombre + '</span></a>';
    MostrarDatos += '<a href="#email"><span class="white-text email">' + email + '</span></a>';

    if(!datos.EsAdmin){
        $('#dispositivos_icon').css('display','none');
    }
    else{
        MostrarDatos += '<a href="#admin"><span class="white-text email">Administrador</span></a>';
    }

    $(MostrarDatos).appendTo('#Mostrardatos');

    console.log(datos.EsAdmin);

}

// Funcon para cerrar session
function desconectar() {
    firebase.auth().signOut().then(function () {
        location.assign('login.html');
    }, function () {
        M.toast({
            html: 'Error al Deslogearse'
        });
    });
};