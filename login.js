btnRegistrar = document.getElementById('btn-registrar');
btnAcceder = document.getElementById('btn-acceder');

/* import {db} from 'index.html'

const usuarios = []; */

const registrar = () =>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    /* console.log(email,password); */

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        Swal.fire({
            title:'Register Successful',
            icon:'success',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#290'

        });
        // ...
        /* let usuario = {
            nombre:document.getElementById('nombre').value,
            apellidos:document.getElementById('apellidos').value,
            celular:document.getElementById('celular').value,
            email:email,
            password:password
        }
        console.log(usuario)
        agragrDB(usuario); */
        verificarEmail();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        Swal.fire({
            title: errorMessage,
            icon: 'error',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#920'
          });
    });

    email.value = '';
    password.value = '';
}

const ingreso = () =>{

    let email = document.getElementById('email2').value;
    let password = document.getElementById('password2').value;

    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        Swal.fire({
            title:'Login Successful',
            icon:'success',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#290'

        });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
            title: errorMessage,
            icon: 'error',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#920'
          });
    });
}

const observador = () =>{
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
          aparece(user);
        } else {
          // User is signed out
          // ...
          document.getElementById('contenido').innerHTML = 
        `
        <div class="container mt-2">
            <div class="alert alert-warning" role="alert">
               Inicie Sesión o registrese...
            </div>
        </div>
        `;
        }
      });
}

observador();

const cerrarSesion = () =>{
    firebase.auth().signOut()
    .then(() =>{
        Swal.fire({
            title:'Sesión Cerrada',
            icon:'success',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#290'

        });
        observador();
    })
    .catch(error => {
        
    })
}

const verificarEmail = () =>{
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        /* Swal.fire({
            title:'Correo de verificación enviado',
            icon:'success',
            background:'#000',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#290'

        }); */
    }).catch(function(error) {
    // An error happened.
    });

}

const aparece = (user) => {
    if(user.emailVerified){
        document.getElementById('contenido').innerHTML = 
        `
        <div class="container mt-2">
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Bienvenido!</h4>
                <p>${user.email}</p>
                <hr>
                <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                <button id="btn-logout" class="btn btn-danger mt-2">Cerrar Sesión</button>
            </div>
        </div>
        `;
        btnCerrarSesion = document.getElementById('btn-logout')
        btnCerrarSesion.addEventListener('click',cerrarSesion);
    }
}


/* -------------CRUD------------------- */

    /* const agragrDB = async (objeto) =>{
        await db.collection('usuarios').add(objeto);
        getUsers();
    }

    const getUsers = async () =>{
        try {
                
            const snapshot = await db.collection('usuarios').get();
            const usuariosDB = [];

            snapshot.forEach(doc => {
                console.log(doc.data())
                let usuarioData = doc.data();
                usuarioData.id = doc.id;
                usuarios.push(usuarioData);
            })

            usuarios = usuariosDB;
        } catch (error) {
            
        }
    }
 */
btnRegistrar.addEventListener('click',registrar);
btnAcceder.addEventListener('click',ingreso);