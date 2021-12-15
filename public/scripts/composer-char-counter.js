$(document).ready(function() {

  $('#tweet-text').on('input',function(){
    const charCount = this.value.length; // num of typed characters
    const countDown = 140 - charCount;

    document.getElementById("new-tweet-count").innerHTML = countDown;

    if (countDown < 0) {
      $("#new-tweet-count").addClass("new-tweet-error");
    } else {
      $("#new-tweet-count").removeClass("new-tweet-error");
    }
  });

});