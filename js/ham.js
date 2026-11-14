document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("#nav-menu");

    if (navToggle && navMenu) {
        // Buka / tutup menu saat tombol diklik
        navToggle.addEventListener("click", () => {
            const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", !isExpanded);
            navToggle.setAttribute("aria-label", isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi");
            navMenu.classList.toggle("is-open");
        });

        // Tutup menu otomatis saat pengguna menekan tombol Escape di keyboard
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Buka menu navigasi");
                navMenu.classList.remove("is-open");
                navToggle.focus();
            }
        });

        // Tutup menu otomatis jika pengguna mengklik di luar area navigasi
        document.addEventListener("click", (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains("is-open")) {
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Buka menu navigasi");
                navMenu.classList.remove("is-open");
            }
        });
    }
});