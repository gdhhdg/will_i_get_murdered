$(document).ready(function() {
    $('select').material_select();
    $('.slider').slider({"indicators":"false"});
    $('#states').on('change', function(){
        $(this).closest('form').submit();
        $('.loading').css('visibility','visible');
    });

});
