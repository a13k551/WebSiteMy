/* АНИМАЦИЯ ПРИ СКРОЛЛЕ */

/* для селектора animItems будет анимация при прокрутке */
let animItems = document.querySelectorAll(".animItems");
/* для id welc просто изменяем прозрачность в зависимости от высоты прокрутки */
let welc = document.getElementById("welc");
/* для headerId добавляем класс при начале прокрутки и убираем при достежении верха*/
let head = document.getElementById("headerId");

if (animItems.length > 0) {
  /*   добавляем событие скролла */
  window.addEventListener("scroll", animOnScroll);

  function animOnScroll(params) {
    /* добавить для хэдэра цвет при скролле */
    head.classList.add("back");
    if (pageYOffset == 0) {
      head.classList.remove("back");
    }

    /* меняем прозрачность */
    changeOpacity = (pageYOffset / 1000) * 3.5;
    welc.style.opacity = 1 - changeOpacity;

    /* переберем все элементы animItems*/
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];

      /* высота самого элемента */
      const animItemHeight = animItem.offsetHeight;
      /* позиция объекта относительно верха ,браузера*/
      const animOffset = offset(animItem).top;
      /* коэф момента старта анимации, т.е. стартует с 1/2 высоты элемента */
      const animStart = 2;
      /* точка начала анимации: высота окна браузера - 1/2 высоты элемента */
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      /* для ситуаций, когда анимированный объект выше окна браузера */

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      /* pageYOffset - ситемная переменная куда передается текущее положение.
        Если оно больше чем позиция объекта минус точка начала анимации, 
        или оно меньше позиция объекта плюс высота элемента, добавляет класс с анимацией  */

      if (
        pageYOffset > animOffset - animItemPoint &&
        pageYOffset < animOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        /* иначе удаляем класс с анимацией, если есть служебный класс animNoRepeat */
        if (!animItem.classList.contains("animNoRepeat")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
}

/* функция получения позиции элемента относительно окна */
function offset(el) {
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageXOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop };
  left: rect.left + scrollLeft;
}

/* ПРОКРУТКА ПРИ КЛИКЕ */
const menu = document.querySelectorAll('.menu__link[data-goto]');
if (menu.length > 0) {
  menu.forEach(menuLink => {
    menuLink.addEventListener('click', onClickMenu);  
  });
 
} 

function onClickMenu(element){
  const menuLink = element.target;
  /* проверим существование элемента */
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;
    window.scrollTo(
      {
        top: gotoBlockValue,
        behavior: "smooth"
      }
    )
    element.preventDefault();

    /* этот кусок относится к меню бургер */
    menuBody.classList.remove('_active');
    
    document.body.classList.remove("_lock");
    menuIcon.classList.remove('_active');
  }
}

/* АНИМАЦИЯ ЦИФР */
window.addEventListener("scroll", animOnScrollNum);
scrollNumOn = true;

function animOnScrollNum() {
  meg__titles = document.getElementsByClassName("meg__title123");

  for (let index = 0; index < meg__titles.length; index++) {
    const animItem = meg__titles[index];

    /* позиция объекта относительно верха */
    const animOffset = offset(animItem).top;
    /* Если флаг анимации Иcтина */
    if (!animItem.classList.contains("scrollNum")) {
      /* Если текущее положение больше позиция объекта минус верх окна (мы доскроллили до элемента) */
      if (pageYOffset > animOffset - window.innerHeight) {
        skrollNumber(animItem);
        scrollNumOn = false;
        animItem.classList.add("scrollNum");
      }
    }
  }
}

function skrollNumber(element) {
  let time = 150000;
  let step = 1;
  n = 0;
  const t = Math.round(time / (time / step));
  const predel = Number(element.innerHTML);

  let interval = setInterval(() => {
    n = n + step;

    if (n > predel) {
      clearInterval(interval);
    }
    element.innerHTML = n;
  }, 20);
}

/* МЕНЮ БУРГЕР */

const menuIcon = document.getElementById("menu__icon__id");
const menuBody = document.getElementById("menu__body__id");
menuIcon.addEventListener('click', onMenuIcon);

function onMenuIcon(element){
  menuBody.classList.toggle('_active');
  /* заблокируем скролл */
  document.body.classList.toggle("_lock");
  /* изменим иконку */
  menuIcon.classList.toggle('_active');
}