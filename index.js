// URL base de la API de Reqres
const baseUrl = 'https://reqres.in/api/';

// Variable para seguir la página actual
let currentPage = 1;

// Variable para el total de tarjetas mostradas
let totalCards = 0;

// Función para obtener la lista de usuarios
function getUsers(page) {
    axios.get(`${baseUrl}users?page=${page}`)
        .then(response => {
            // Maneja la respuesta exitosa
            const users = response.data.data;
            let usersCards = document.getElementById('users-cards');

            users.forEach((user, index) => {
                if (totalCards < 8) {
                    let userCard = document.createElement('div');
                    userCard.className = 'col-md-3'; // Cambia a col-md-3 para tener 4 por fila
                    userCard.innerHTML = `
                        <div class="card mb-4 shadow-sm">
                            <img src="${user.avatar}" class="card-img-top" alt="${user.first_name} ${user.last_name}">
                            <div class="card-body">
                                <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                                <p class="card-text">${user.email}</p>
                            </div>
                        </div>
                    `;
                    usersCards.appendChild(userCard);
                    totalCards++;
                }
            });

            // Si no se han mostrado todas las tarjetas, solicita la siguiente página
            if (totalCards < 8) {
                currentPage++;
                getUsers(currentPage);
            }
        })
        .catch(error => {
            // Maneja cualquier error
            console.error('There was a problem with the Axios operation:', error);
        });
}

function validateFormcambio() {
    var username = document.getElementById("reg-username").value;
    var email = document.getElementById("reg-email").value;

    // Verificar si al menos uno de los campos está completado
    if (username === "" && email === "") {
        document.getElementById("usernameError").innerHTML = "Por favor, complete este campo.";
        document.getElementById("reg-username").classList.add("is-invalid");
        document.getElementById("emailError").innerHTML = "Por favor, complete este campo.";
        document.getElementById("reg-email").classList.add("is-invalid");
        return false;
    } else {
        document.getElementById("usernameError").innerHTML = "";
        document.getElementById("reg-username").classList.remove("is-invalid");
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("reg-email").classList.remove("is-invalid");
        alert("¡Formulario completado correctamente!");
        return true;
    }
}

function validateFormconsulta() {
    var email = document.getElementById("email").value;
    var consulta = document.getElementById("consulta").value;
    var isValid = true;

    if (email === "") {
        document.getElementById("emailError").innerHTML = "Por favor, ingrese su correo electrónico.";
        document.getElementById("email").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("email").classList.remove("is-invalid");
    }

    if (consulta === "") {
        document.getElementById("consultaError").innerHTML = "Por favor, ingrese su consulta.";
        document.getElementById("consulta").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("consultaError").innerHTML = "";
        document.getElementById("consulta").classList.remove("is-invalid");
    }

    if (isValid) {
        alert("¡Formulario completado correctamente!");
    }

    return isValid;
}

function validateFormregister() {
    var username = document.getElementById("reg-username").value;
    var email = document.getElementById("reg-email").value;
    var password = document.getElementById("reg-password").value;

    // Verificar que todos los campos estén completos
    if (username === "") {
        document.getElementById("usernameError").innerHTML = "Por favor, ingrese su nombre de usuario.";
        return false;
    } else {
        document.getElementById("usernameError").innerHTML = "";
    }

    if (email === "") {
        document.getElementById("emailError").innerHTML = "Por favor, ingrese su dirección de correo electrónico.";
        return false;
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

    if (password === "") {
        document.getElementById("passwordError").innerHTML = "Por favor, ingrese su contraseña.";
        return false;
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

    // Verificar si el email tiene un formato válido
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Por favor, ingrese una dirección de correo electrónico válida.";
        return false;
    }

    // Redirigir al usuario a la página de inicio después de completar el formulario
    window.location.href = "file:///C:/Users/tomas/OneDrive/Escritorio/Codo%20A%20Codo/Proyecto%20Java/index.html";
    return false; // Para evitar que el formulario se envíe automáticamente
}

function validateFormsesion() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var validUsername = "usuario@gmail.com";
    var validPassword = "1234";

    if (username === "") {
        document.getElementById("usernameError").innerHTML = "Por favor, ingrese su nombre de usuario o correo electrónico.";
        document.getElementById("username").classList.add("is-invalid");
        return false;
    } else {
        document.getElementById("usernameError").innerHTML = "";
        document.getElementById("username").classList.remove("is-invalid");
    }

    if (password === "") {
        document.getElementById("passwordError").innerHTML = "Por favor, ingrese su contraseña.";
        document.getElementById("password").classList.add("is-invalid");
        return false;
    } else {
        document.getElementById("passwordError").innerHTML = "";
        document.getElementById("password").classList.remove("is-invalid");
    }

    if (username === validUsername && password === validPassword) {
        window.location.href = "home.html";
        return false; // Evita el envío del formulario
    } else {
        document.getElementById("usernameError").innerHTML = "Credenciales incorrectas.";
        document.getElementById("passwordError").innerHTML = "";
        return false;
    }
}

$(document).ready(function(){
    $('#carouselExample').carousel();
});
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Llama a la función para obtener la lista de usuarios cuando se cargue el documento
document.addEventListener('DOMContentLoaded', () => getUsers(currentPage));


