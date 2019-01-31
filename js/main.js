function countMortgage() {
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
});
