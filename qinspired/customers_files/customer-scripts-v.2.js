
jQuery(function($) {
        $("#Overlay").on('click', function(){
        $("#IframeContainer, #Overlay").hide();
        $("#IframeContainer").find('iframe').attr('src', '');
    });
    
 });
