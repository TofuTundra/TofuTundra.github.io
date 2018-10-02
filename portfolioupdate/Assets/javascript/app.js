$('.dropdown-toggle').on('show.bs.dropdown', function () {
    $('body').append($('.dropdown-toggle').css({
      position:'absolute',
      left:$('.dropdown').offset().left, 
      top:$('.dropdown').offset().top
    }).detach());
  });
  
  $('.dropdown-toggle').on('hidden.bs.dropdown', function () {
    $('.dropdown').append($('.dropdown-toggle').css({
      position:false, left:false, top:false
    }).detach());
  });