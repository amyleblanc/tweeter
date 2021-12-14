$(document).ready(function() {

  $('#tweet-text').on('input',function(){
    const charCount = this.value.length; // num of typed characters
    const countDown = 140 - charCount;

    document.getElementById("new-tweet-count").innerHTML = countDown;
  });

});