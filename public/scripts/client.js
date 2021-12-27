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
                <img src="${tweet.user.avatars}">
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
              <i class="fas fa-flag"></i>            
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
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

  });

});
