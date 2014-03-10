jQuery(function($) {
$(document).ready(function() {
if (jQuery.browser.msie && jQuery.browser.version == '7.0') {
    // do sth.
    $( "#HeaderAccountLink" ).removeClass( "FancyIframe" );
    $("#HeaderAccountLink").off("click");
}
  
// Select just Internet Explorer 8
if (jQuery.browser.msie && jQuery.browser.version == '8.0') {
   $( "#HeaderAccountLink" ).removeClass( "FancyIframe" ); 
   $("#HeaderAccountLink").off("click");
}

});
		
});