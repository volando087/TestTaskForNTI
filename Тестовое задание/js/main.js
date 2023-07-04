let arrow = document.getElementById('slider__arrow'); //кнопка для переключения слайдера

let firstImage = document.getElementById('0');  // первая картинка
let secondImage= document.getElementById('1'); // вторая
let thirdImage = document.getElementById('2');  // третья
let fourthImage = document.getElementById('3'); // четвертая
let fifthImage = document.getElementById('4');  // пятая

let firstDot = document.getElementsByClassName('dot')[0];
let secondDot = document.getElementsByClassName('dot')[1];
let thirdDot = document.getElementsByClassName('dot')[2];
let fourthDot = document.getElementsByClassName('dot')[3];
let fifthDot = document.getElementsByClassName('dot')[4];

let slider = [firstImage, secondImage, thirdImage, fourthImage, fifthImage];
let dots = [firstDot, secondDot, thirdDot, fourthDot, fifthDot];



arrow.addEventListener('click', slide);
let counter = 0; //счетчик для выбора слайда
let counterDots = 0; //счетчик для выбора точки
let scaleStep = 0.02; //счетчик для скалирования слайда
let translateStep = 30; //счетчик для движения слайда, px
let opacityStep = 0.02;

function slide() {
    arrow.style.pointerEvents = "none"; //отключение возможности спамить кнопку
    if (counter < slider.length-1) {
        for (let i = 0; i < slider.length; i++) {
            let scaleNowLeft = 1;
            let scaleNowRight = 0;
            let translateNowLeft = 0;
            let translateNowRight = 0;
            let opacityNowLeft = 1;
            let opacityNowRight = 0;
            if (i == counter) {
                let startTime = Date.now() // начало отсчета
                slider[i].style.visibility = 'visible';
                slider[i+1].style.visibility = 'visible';
                dots[i].style.order = i;
                dots[0].style.order = i+2;
                let sliderInterval = setInterval(() => {
                    let endTime = Date.now() - startTime;
                    if (endTime >=1000) {
                        clearInterval(sliderInterval);
                        slider[i].style.visibility = 'hidden';
                        slider[i].style.transform = 'scale(1) translateX(0px)';
                        slider[i].style.opacity = '1';
                        arrow.style.pointerEvents = "auto"; //"включение" кнопки
                    }
                    scaleNowRight = scaleNowRight + scaleStep;
                    scaleNowLeft = scaleNowLeft - scaleStep;
                    translateNowLeft = translateNowLeft - translateStep;
                    translateNowRight = translateNowRight - translateStep/5; //по 12px, за 25 шагов на 300px
                    opacityNowLeft = opacityNowLeft - opacityStep;
                    opacityNowRight = opacityNowRight + opacityStep;
                    animationSlideLeft(scaleNowLeft, translateNowLeft, opacityNowLeft, i);
                    animationSlideRight(scaleNowRight, translateNowRight, opacityNowRight, i);
                }, 20);
            }
        } 
    counter += 1;
    } else { //для i = 4, slider.length = 4, ниже переход на первую картинку
        for (let i = 0; i < slider.length; i++) {
            let scaleNowLeft = 1;
            let scaleNowRight = 0;
            let translateNowLeft = 0;
            let translateNowRight = 0; // первый блок должен быть на 300px левее, чтобы вернуться на место
            let opacityNowLeft = 0.8;
            let opacityNowRight = 0;
            if (i == counter) {
                let startTime = Date.now() // начало отсчета
                slider[i].style.visibility = 'visible';
                slider[0].style.visibility = 'visible';
                dots[i].style.order = i;
                dots[0].style.order = 1;
                let sliderInterval = setInterval(() => {
                    let endTime = Date.now() - startTime;
                    if (endTime >=1000) {
                        clearInterval(sliderInterval);
                        slider[i].style.visibility = 'hidden';
                        slider[i].style.transform = 'scale(1) translateX(0px)';
                        slider[i].style.opacity = '1';
                        arrow.style.pointerEvents = "auto"; //"включение" кнопки
                    }
                    scaleNowRight = scaleNowRight + scaleStep;
                    scaleNowLeft = scaleNowLeft - scaleStep;
                    translateNowLeft = translateNowLeft - translateStep;
                    translateNowRight = translateNowRight - translateStep/5; //по 12px, за 25 шагов на 300px
                    opacityNowLeft = opacityNowLeft - opacityStep;
                    opacityNowRight = opacityNowRight + opacityStep;
                    animationSlideLeft(scaleNowLeft, translateNowLeft, opacityNowLeft, i);
                    animationSlideRight(scaleNowRight, translateNowRight, opacityNowRight, -1);
                }, 20);
            }
        } 
        counter = 0;
    }
}
function animationSlideLeft (scaleNowLeft, translateNowLeft, opacityNowLeft, i) {
    slider[i].style.transform = 'scale(' + scaleNowLeft.toString() + ') ' + 'translateX(' + translateNowLeft.toString() + 'px)'
    slider[i].style.opacity = opacityNowLeft.toString(); 
}
function animationSlideRight (scaleNowRight, translateNowRight, opacityNowRight, i) {
    slider[i+1].style.transform = 'scale(' + scaleNowRight.toString() + ') ' + 'translateX(' + translateNowRight.toString() + 'px)'
    slider[i+1].style.opacity = opacityNowRight.toString();
}