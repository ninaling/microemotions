$(document).ready(function(){
    $("#learn_more_button").click(function(){
        $("html, body").animate({
            scrollTop: $("#contact").offset().top
        }, 500, 'easeInCubic');
    });
});