
jQuery(document).ready(function ($) {  

var movie = document.getElementById('events-video');
document.getElementById('pause').addEventListener('click', function() { movie.pause(); }, false);     
  $("#events-video").bind('ended', function(){
  
          $( "#main-image" ).addClass( "display-yes" ); 
          $( "#events-video" ).addClass( "display-none" );
          
    });  
   $("#allcat").click(function(){
       $(".discounted-item").fadeIn('1000','linear');
       $("#catpicker a").removeClass("current");
       $(this).addClass("current");
       return false;
   });
   
   $(".filter").click(function(){
        var thisFilter = $(this).attr("id");
        $(".discounted-item").fadeOut('linear');
        $("."+ thisFilter).fadeIn('1000','linear');
        $("#catpicker a").removeClass("current");
        $(this).addClass("current");
        return false;
   });
   


});