const leftS = document.querySelector('.step_control_img:first-child');
const rightS = document.querySelector('.step_control_img:last-child');
const sCards = document.querySelectorAll('.step_card');
const points = document.querySelectorAll('.step_control_li');
/* const root объявлена в participantsSlider.js*/
const moveStep = document.querySelector('.step_card_move');
let scoreS, stepS, scoreSP;  
 /*Переменная scoreSP введена для подсчета позиции точек для раскраски и исключительно из-за того, что карточки 1 и 2, а так же 4 и 5 совмещены */

function initS() {
  scoreS = 1, stepS = 0, scoreSP = 0;
  stepS = Math.floor(document.querySelector('.steps_cards').offsetWidth/document.querySelector('.step_card').offsetWidth);
  for(let i = 0; i < stepS; i++) {points[i].style.background = '#000';} // Раскрасить первые точки в черный
}

window.addEventListener('resize', initS);
window.addEventListener('load', initS);

function handlerClickArrowsStep() {
  moveStep.classList.remove('move_steps');
  points.forEach((el)=> {el.style.background = '#b7b7c4'}) //Красим в серый цвет точки. Все.
  let gap = sCards[0].offsetLeft;
  let goal = (sCards[scoreS].offsetLeft - gap)*-1+'px';
  root.style.setProperty('--SCe', goal);
  moveStep.classList.add('move_steps');
  moveStep.addEventListener('animationend', ()=> {
    root.style.setProperty('--SCs', goal);
    leftS.style.opacity = (scoreS + stepS >= sCards.length)? 0.3: 1;
    rightS.style.opacity = (scoreSP <= 0)? 0.3: 1;
    for(let i = 0; i< stepS; i++) {points[scoreSP + i].style.background = '#000';}
  }, {once: true})
}

leftS.addEventListener('click', ()=> {
  scoreS += stepS;
  if(scoreS == 4) {scoreS += 1;} // Исключительно из-за того, что карточки 1 и 2, а так же 4 и 5 совмещены
  if(scoreS + stepS > sCards.length) {
    scoreS = sCards.length - stepS;
    scoreSP = points.length - stepS;
    return;
  }
  scoreSP = ((points.length - stepS) <= (scoreSP + stepS))? points.length - stepS: scoreSP += stepS;
  handlerClickArrowsStep();
})

rightS.addEventListener('click', ()=> {
   if(scoreS == 5) {scoreS -= 1;} // Исключительно из-за того, что карточки 1 и 2, а так же 4 и 5 совмещены
  scoreS -= stepS;
  if(scoreS + stepS <= 1) {
    scoreS += stepS;
    scoreSP += stepS;
    return;
  }
  scoreSP -= stepS;
  if(scoreS <= 0) {scoreS = 1; scoreSP = 0;}
  handlerClickArrowsStep();
})
