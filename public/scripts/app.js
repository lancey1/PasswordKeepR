// Client facing scripts here
$(document).ready(function () {

    const $webListURL = $('.webinfo-card-type');
    $webListURL.click(function() {
        const $webInfo = $(this).siblings('div');
        $webInfo.slideToggle('slow');
    })


});