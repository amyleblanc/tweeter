$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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

    if ($(window).scrollTop() > 300) {
      $(".navbar-menu").css("display", "none");
      $(".navbar").css("background-color", "#4056a100");
      btn.addClass("show");
    } else {
      $(".navbar-menu").css("display", "flex");
      $(".navbar").css("background-color", "#4056a1f2");
      btn.removeClass("show");
    }
  });

  $("#scroll-up").click(function() {
    $("html, body").animate({scrollTop: 0}, "300");
    $(".new-tweet").css('display', 'flex');
    return $("#tweet-text").focus();
  });

  $("#navbar-btn").click(function() {
    $(".new-tweet").css('display', 'flex');
    return $("#tweet-text").focus();
  });

  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    const inputBox = $('#tweet-text').val();

    if (inputBox === '') {
      return $("#text-empty").css('display', 'block');
    } else {
      $("#text-empty").css('display', 'none');
    };
    
    if (inputBox.length > 140) {
      return $("#text-excess").css('display', 'block');
    } else {
      $("#text-excess").css('display', 'none');
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
    
    $("#new-tweet-count").html(140);
    $("#submit-tweet").trigger("reset");
    $(".new-tweet").css('display', 'none');

  });

});
