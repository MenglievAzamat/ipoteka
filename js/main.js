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
    var timerId = setInterval(function() {
        if(x < 4) {
            for(var i = 0; i < animated_progress.length; i++) {
                animated_progress[i].classList.remove('added_opacity');
            }
            animated_progress[x].classList.add('added_opacity');
            x++;
        }

        else {
            x = 0;
        }
      }, 700);
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
    if(Number(sum_of_mortgage) > 0 || Math.round(sum_of_mortgage / (12 * Number(mortgage_time))) > 0) {
        condition_value.innerHTML = sum_of_mortgage.toLocaleString() + " руб.";
        result.innerHTML = Math.round(sum_of_mortgage / (12 * Number(mortgage_time))).toLocaleString() + " руб.";
    } 
    else {
        condition_value.innerHTML = 0 + " руб.";
        result.innerHTML = 0 + " руб.";
    }

}