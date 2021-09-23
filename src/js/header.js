const menuBtn = document.querySelector('.navbar__menu-buttons');
const menu = document.querySelector('.menu');
toggleMenuBtn = () => {
    for (let child of menuBtn.children) {
        child.classList.toggle('active')
    }
}

menuBtn.addEventListener('click', function(){
    toggleMenuBtn();
    menu.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        if(menu.classList.contains('active')){
            toggleMenuBtn()
        }
        menu.classList.remove('active');
    }
});

const menuItem = document.querySelectorAll('.menu-item');
menuItem.forEach(element => {
    element.addEventListener('click', ()=> {
        document.querySelector('.menu-item.active').classList.remove('active');
        element.classList.add('active');

    })
})
