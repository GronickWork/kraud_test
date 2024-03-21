/*Автор файла - Гречишников Олег - mail:"golegni@yandex.ru"*/

/*Появление/пропадание кнопки "наверх" при прокрутке */
const upward = document.getElementById('upward');
window.addEventListener('scroll', ()=> {
  if(scrollY > document.documentElement.clientHeight) {
    upward.style.display = 'flex';
  } else {
    upward.style.display = '';
  }
})

/*Плавная прокрутка вниз по кнопке до якоря */
const anchors = document.querySelector('.content_btn').querySelectorAll('a[href*="#"]');
anchors.forEach((el)=> {
  el.addEventListener('click', (e)=> {
    e.preventDefault();
    const nameId = el.getAttribute('href').substring(1);
    const purpose = document.getElementById(nameId);
    purpose.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

/*Плавная прокрутка вверх */
const onTop = document.getElementById('top');
upward.addEventListener('click', (e)=> {
  e.preventDefault();
  onTop.scrollIntoView({
    behavior: 'smooth',
    block: 'start'});
});
