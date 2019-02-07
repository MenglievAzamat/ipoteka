/*function countMortgage() {
    let result;
    let price = $("#price").val();
    let payment = $("#payment").val();

    result = ((price - payment) <= 0) ? 0 : price - payment;

    $("#mortgage").html(result + " руб.");
}

function countMonthly() {
    let result;
    let time = $("#time").val();
    let mortgage = parseInt($("#mortgage").html());

    result = mortgage / time;
    result = Math.round(result);

    $("#monthly").html(result + " руб.");
}

$(document).ready(function () {
    $("#price").on("input", function () {
        $("#price_label").html($("#price").val() + " руб.");
        countMortgage();
        countMonthly();
    });

    $("#payment").on("input", function () {
        $("#payment_label").html($("#payment").val() + " руб.");
        countMortgage();
        countMonthly();
    });

    $("#time").on("input", function () {
        $("#time_label").html($("#time").val() + " лет");
        countMonthly();
    });

    $("div.question").on("click", function (e) {
        let answer = $(this.nextElementSibling);
        let height, padding, rotate, max;
        let toggle = $(this.lastElementChild);
        let opacity = 0;

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            height = "0";
            max = 0;
            padding = "0";
            rotate = "rotate(-1turn)";
        } else {
            $(this).addClass("active");
            height = "6rem";
            max = "unset";
            padding = "1rem";
            rotate = "rotate(1turn)";
            opacity = 1;
        }

        toggle.css("transform", rotate);
        answer.css("min-height", height).css("padding", padding).css("max-height", max);
        $(answer).find("p").css("opacity", opacity);
    });
}); */

var accardion_item = document.getElementsByClassName('acc_input');
var accardion_cross = document.getElementsByClassName('circle-plus');
var accardion = document.getElementsByClassName('ac-container')[0];
var animated_progress = document.getElementsByClassName('animated_progress');

window.onload = function () {
    accardion_cross[0].classList.add('opened');
    progress_animation_activ();
}

function progress_animation_activ() {
    var x = 0;
    var timerId = setInterval(function () {
        if (x < animated_progress.length) {
            for (var i = 0; i < animated_progress.length; i++) {
                animated_progress[i].classList.remove('added_opacity');
            }
            animated_progress[x].classList.add('added_opacity');
            x++;
        } else {
            x = 0;
        }
    }, 200);
}

accardion.addEventListener('click', function () {
    for (var i = 0; i < accardion_item.length; i++) {
        if (accardion_item[i].checked) {
            for (var j = 0; j < accardion_cross.length; j++) {
                accardion_cross[j].classList.remove('opened');
            }
            accardion_cross[i].classList.add('opened');
        }
    }
})

$(document).ready(function () {

    $("#price_id").ionRangeSlider({
        min: 300000,
        max: 15000000,
        step: 20000,
        prettify: true,
        from: 6000000,
        grid: true,
        postfix: " руб."
    });

    $("#payment").ionRangeSlider({
        min: 300000,
        max: 15000000,
        step: 20000,
        prettify: true,
        from: 6000000,
        grid: true,
        postfix: " руб."
    });

    $("#mortgage").ionRangeSlider({
        min: 5,
        max: 25,
        step: 1,
        prettify: true,
        from: 15,
        grid: true,
        postfix: " лет"
    });
});

var count_start = document.getElementsByClassName('count_start')[0];
var count_items = document.getElementsByClassName('irs-single');
var condition_value = document.getElementsByClassName('condition_value_sum')[0];
var result = document.getElementsByClassName('result_num_payment')[0];
var sum_of_mortgage = 0;
var price_to_count = 0;
var payment_to_count = 0;

var a = document.getElementById('price_id');

function count() {
    var price_start = count_items[0].innerHTML.indexOf(' руб.');
    var price = count_items[0].innerHTML.substr(0, price_start);
    price_to_count = price.split(" ").join('');

    var payment_start = count_items[1].innerHTML.indexOf(' руб.');
    var payment = count_items[1].innerHTML.substr(0, payment_start);
    payment_to_count = payment.split(" ").join('');

    var mortgage_start = count_items[2].innerHTML.indexOf(' лет');
    var mortgage = count_items[2].innerHTML.substr(0, mortgage_start);
    var mortgage_time = mortgage.split(" ").join('');

    sum_of_mortgage = Number(price_to_count) - Number(payment_to_count);
    if (Number(sum_of_mortgage) > 0 || Math.round(sum_of_mortgage / (12 * Number(mortgage_time))) > 0) {
        condition_value.innerHTML = sum_of_mortgage.toLocaleString() + " руб.";
        result.innerHTML = Math.round(sum_of_mortgage / (12 * Number(mortgage_time))).toLocaleString() + " руб.";
    } else {
        condition_value.innerHTML = 0 + " руб.";
        result.innerHTML = 0 + " руб.";
    }

}

var quiz_container = document.getElementById('quiz');
var quiz_itself = document.getElementsByClassName('quiz')[0];
var quiz_counter = 0;
var progress_dots = document.getElementsByClassName('dot');

quiz_container.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('quiz_btn')) {
        changeSlide()
    }
    else if(target.classList.contains('controls_back_btn')) {
        quizGoesBack()
    }
});

function changeSlide() {
    if (quiz_counter <= quiz_itself.children.length) {
        for (var i = 0; i < quiz_itself.children.length; i++) {
            quiz_itself.children[i].classList.add('invisible_item');
        }
        quiz_itself.children[quiz_counter+1].classList.remove('invisible_item');
        quiz_counter++;
    }
    activatedProgressDots();
    createAnimatedProgress();
    changeQuizTexts()
}

function activatedProgressDots() {
    if(quiz_counter < 3) {
        for(var i = 0; i < progress_dots.length; i++) {
            progress_dots[i].classList.remove('active')
        }
        progress_dots[quiz_counter].classList.add('active')
    }
}

function createAnimatedProgress() {    
    for(var i = 0; i < 8; i++) {
        var new_activ_progress = document.createElement('div');
        new_activ_progress.classList.add('animated_progress');
        document.getElementsByClassName('offer')[0].appendChild(new_activ_progress);
    }   
}

function changeQuizTexts() {

    if(quiz_counter==1) {
        document.getElementsByClassName('step_counter')[0].innerHTML = "Шаг 2"
        document.getElementsByClassName('offer_text')[0].innerHTML='50% вероятность одобрения заявки';
        document.getElementsByClassName('offer_text')[0].style.fontWeight = '500'
        document.getElementsByClassName('changing_step')[0].innerHTML = '2';
    }
    else if(quiz_counter==2) {
        document.getElementsByClassName('step_counter')[0].innerHTML = "Шаг 3"
        document.getElementsByClassName('offer_text')[0].innerHTML='92% вероятность одобрения заявки';
        document.getElementsByClassName('offer_text')[0].style.fontWeight = '500'
        document.getElementsByClassName('changing_step')[0].innerHTML = '3';
    }
    else if(quiz_counter==3) {
        document.getElementsByClassName('offer_text')[0].style.position = 'static'
        document.getElementsByClassName('quiz_info')[0].innerHTML = 'Ваша заявка принята'
    }
    else if(quiz_counter==0) {
        document.getElementsByClassName('step_counter')[0].innerHTML = "Шаг 1"
        document.getElementsByClassName('offer_text')[0].innerHTML='Получите +50% к вероятности одобрения заявки, заполнив 1-й шаг';
        document.getElementsByClassName('changing_step')[0].innerHTML = '1';
    }
}

function quizGoesBack() {
    quiz_counter--;
    if (quiz_counter >= 0) {
        for (var i = 0; i < quiz_itself.children.length; i++) {
            quiz_itself.children[i].classList.add('invisible_item');
        }
        quiz_itself.children[quiz_counter].classList.remove('invisible_item');
    }
    activatedProgressDots();
    destroyAnimatedProgress();
    changeQuizTexts()
}

function destroyAnimatedProgress() {
    var parent = animated_progress[0].parentNode;
    for(var i = 0; i < 8; i++) {
        parent.removeChild(parent.lastChild)
    }
}

var menu__icon = document.getElementsByClassName('menu__icon')[0];
var hidden_menu = document.getElementsByClassName('hidden_menu')[0];
var overlay = document.getElementsByClassName('overlay')[0];

menu__icon.addEventListener('click', menu_open);

function menu_open() {
    hidden_menu.classList.toggle('invisible_item');
    overlay.classList.toggle('invisible_item');
    document.documentElement.classList.toggle('no_scroll');
}

var header_burger_menu = document.getElementsByClassName("menu")[0];

menu__icon.addEventListener('click', function () {
    header_burger_menu.classList.toggle('menu_state_open');
})
