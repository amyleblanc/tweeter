$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const resetErrors = function() {
    $("#text-excess").css('display', 'none');
    $("#text-empty").css('display', 'none');
    $("#new-tweet-count").removeClass("new-tweet-error");
  };

  const resetNewTweetForm = function() {
    $("#new-tweet-count").html(140);
    $("#submit-tweet").trigger("reset");
  };

  const createTweetElement = function(tweet) {
    const $tweet = `
    <article>
          <header>
            <div class="user-info">
              <div>
                <img src="${tweet.user.avatars}" alt="Random user avatar headshot">
              </div>
              <div class="user-name">${tweet.user.name}</div>
            </div>
            <div class="user-handle">${tweet.user.handle}</div>
          </header>
          <div class="message">${escape(tweet.content.text)}</div>
          <footer>
            <div class="date">
              ${timeago.format(tweet.created_at)}
            </div>
            <div class="footer-icons">
              <span title="Flag content"><i class="fas fa-flag"></i></span>
              <span title="Retweet"><i class="fas fa-retweet"></i></span>
              <span title="Like this"><i class="fas fa-heart"></i></span>
            </div>
          </footer>
          <br>
        </article>
        <br>  
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('.tweets').empty();
    for (let tweet of tweets) {
      const result = createTweetElement(tweet);
      $('.tweets').prepend(result);
    };
  }
  
  const loadTweets = function () {

    const form = $(this);

    $.ajax({
      type: 'GET',
      url: '/tweets',
      data: form.serialize(),
      success: function(tweets) {
        renderTweets(tweets);
      }
    })
  };
  
  loadTweets();


  $(window).scroll(function() {
    const btn = $("#scroll-up");

    if ($(window).width() < 1024 && $(window).scrollTop() > 300) {
      $(".navbar-menu").css("display", "none");
      btn.addClass("show");
    } else if ($(window).width() < 1024 && $(window).scrollTop() < 299) {
      $(".navbar-menu").css("display", "flex");
      btn.removeClass("show");
    }

    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
    
  });


  $("#scroll-up").click(function() {
    $("html, body").animate({scrollTop: 0}, "300");
    $(".new-tweet").css('display', 'flex');
    return $("#tweet-text").focus();
  });


  $("#navbar-btn").click(function() {
    resetErrors();
    resetNewTweetForm();
    $(".new-tweet").toggle(500);
    $(".new-tweet").css('display', 'flex');
    $("#tweet-text").focus();
  });


  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    const inputBox = $('#tweet-text').val();

    if (inputBox === '') {
      $("#text-empty").css('display', 'block');
      return $("#tweet-text").focus();
    } else {
      resetErrors();
    };
    
    if (inputBox.length > 140) {
      $("#new-tweet-count").addClass("new-tweet-error");
      return $("#text-excess").css('display', 'block');
    } else {
      resetErrors();
    };

    const form = $(this);

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: form.serialize(),
      success: function() {
        loadTweets();
      }
    })
    
    resetNewTweetForm();
    $(".new-tweet").css('display', 'none');

  });

});
