/* ==========================================
   MENU MOBILE
========================================== */

const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const overlay = document.getElementById("menuOverlay");

function fecharMenu() {

    if (!menu || !menuToggle) return;

    menu.classList.remove("ativo");

    if (overlay) {

        overlay.classList.remove("ativo");

    }

    menuToggle.innerHTML = "☰";

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );

}

function abrirMenu() {

    menu.classList.add("ativo");

    if (overlay) {

        overlay.classList.add("ativo");

    }

    menuToggle.innerHTML = "✕";

    menuToggle.setAttribute(
        "aria-label",
        "Fechar menu"
    );

}

if (menu && menuToggle) {

    menuToggle.addEventListener("click", function () {

        if (menu.classList.contains("ativo")) {

            fecharMenu();

        } else {

            abrirMenu();

        }

    });

}

/* ==========================================
   FECHA AO CLICAR EM UM LINK
========================================== */

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", fecharMenu);

});

/* ==========================================
   FECHA AO CLICAR NO OVERLAY
========================================== */

if (overlay) {

    overlay.addEventListener("click", fecharMenu);

}

/* ==========================================
   FECHA COM ESC
========================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        fecharMenu();

        fecharDropdown();

    }

});

/* ==========================================
   VOLTAR PARA DESKTOP
========================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        fecharMenu();

    }

});

