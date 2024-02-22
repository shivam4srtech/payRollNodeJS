const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
    nav.classList.toggle("openSearch");
    nav.classList.remove("openNav");
    if(nav.classList.contains("openSearch")){
        return searchIcon.classList.replace("fa-search","fa-times");
    }
     searchIcon.classList.replace("fa-times","fa-search");
});
navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("fa-times","fa-search");
    
});
navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
    
});
// ===============Dropdown expand on hover============
$( document ).ready(function() {

    // Add hover action for dropdowns
    let dropdown_hover = $(".dropdown-hover");
    dropdown_hover.on('mouseover', function(){
        let menu = $(this).find('.dropdown-menu'), toggle = $(this).find('.dropdown-toggle');
        menu.addClass('show');
        toggle.addClass('show').attr('aria-expanded', true);
    });
    dropdown_hover.on('mouseout', function(){
        let menu = $(this).find('.dropdown-menu'), toggle = $(this).find('.dropdown-toggle');
        menu.removeClass('show');
        toggle.removeClass('show').attr('aria-expanded', false);
    });

});