function openSidebar() {
    document.getElementById("my-sidebar-container").classList.toggle("my-hidden");
    document.getElementById("my-overlay").classList.toggle("my-hidden-overlay");
}
//-------  check if input has the same password  ------------
// var password = document.getElementById("password"),
//     confirm_password = document.getElementById("confirm_password");

// function validatePassword() {
//     if (password.value != confirm_password.value) {
//         confirm_password.setCustomValidity("La contraseña no coincide");
//     } else {
//         confirm_password.setCustomValidity("");
//     }
// }

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;

// ------- Cambiar imagen on click----------

function changeImg(imgs) {
    var getContainer = document.getElementById("my-product-big-img");
    getContainer.src = imgs.src;
}

// --------Sumar 1 / Restar 1 -----------

function masUno() {
    var value = parseInt(document.getElementById("cantidad_carrito").value, 10);
    if (value < 10) {
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById("cantidad_carrito").value = value;
    }
}

function menosUno() {
    var value = parseInt(document.getElementById("cantidad_carrito").value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        document.getElementById("cantidad_carrito").value = value;
    }
}

// ----------- Si la contraseña es incorecta al intentar cambiarla --------------

function resultPassChange() {
    $(window).on("load", function() {
        $("#myModal").modal("show");
    });
}

// -----------  BUSCAR ------------------

function buscarProductosDsdBuscar() {
    var value = document.getElementById("buscar").value;

    window.location.replace("buscar.php?buscar=" + value);
}


function buscarProductosDsdIndex() {
    var value = document.getElementById("buscar").value;

    window.location.href = "buscar/buscar.php?buscar=" + value;
}

function buscarProductosDsdResto() {
    var value = document.getElementById("buscar").value;

    window.location.href = "../buscar/buscar.php?buscar=" + value;
}

// -------------------------------------------