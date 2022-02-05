
const menuIconButton = document.querySelector('[data-menu-icon-btn');
const sidebar = document.querySelector("[data-sidebar]");

menuIconButton.addEventListener('click', () => {
    // open/close sidebar
    sidebar.classList.toggle("open");
});
