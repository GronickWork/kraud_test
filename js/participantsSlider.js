const cards = document.querySelectorAll('.participant_card');
const moveBlock = document.querySelector('.participant_move');
const root = document.querySelector(':root');
let score, step, left, right, curr;

function init() {
  score = 0, step = 0;
  let placeNav = getComputedStyle(document.querySelector('.pnct')).display;
  if (placeNav == 'none') {
    left = document.querySelector('.pncb > .participants_nav_arrow:first-child');
    right = document.querySelector('.pncb > .participants_nav_arrow:last-child');
    document.querySelector('.pncb > .par-length').innerHTML = cards.length;
    curr = document.querySelector('.pncb > .par-num');
  } else {
    left = document.querySelector('.pnct > .participants_nav_arrow:first-child');
    right = document.querySelector('.pnct > .participants_nav_arrow:last-child');
    document.querySelector('.pnct > .par-length').innerHTML = cards.length;
    curr = document.querySelector('.pnct > .par-num');
  }
  left.addEventListener('click', clickLeft);
  right.addEventListener('click', clickRight);
  step = Math.floor((document.querySelector('.participants_cards').offsetWidth)/document.querySelector('.participant_card').offsetWidth);
  curr.innerHTML = step;
}

window.addEventListener('resize',init);
window.addEventListener('load', init);


function handlerClick() {
  moveBlock.classList.remove('move-participants_card');
  let gap = cards[0].offsetLeft;
  let goal = (cards[score].offsetLeft-gap)*-1+'px';
  root.style.setProperty('--PCe', goal);
  moveBlock.classList.add('move-participants_card');
  moveBlock.addEventListener('animationend', ()=> {
    root.style.setProperty('--PCs', goal);
    left.style.opacity = score + step >= cards.length ? 0.3: 1;
    curr.innerHTML = score + step; 
    right.style.opacity = score <= 0 ? 0.3: 1;
  }, {once: true})
}

function clickLeft() {
  score += step;
  if(score >= cards.length) {score = cards.length - step; return;}
  if(cards.length - score < step) {score = cards.length - step;}
  handlerClick();
}

function clickRight() {
  score -= step;
  if(score + step <= 0) {score += step; return;}
  if(score < 0) {score = 0;}
  handlerClick();
}
