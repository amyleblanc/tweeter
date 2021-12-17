$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const result = createTweetElement(tweet);
      $('.tweets').append(result);
    });
  }
  
  const createTweetElement = function(tweet) {
    const $tweet = `
    <article>
          <header>
            <div class="user-info">
              <div>
                <img src="${tweet.user.avatars}">
              </div>
              <div>${tweet.user.name}</div>
            </div>
            <div class="user-handle">${tweet.user.handle}</div>
          </header>
          <div class="message">${tweet.content.text}</div>
          <footer>
            <div class="date">
              ${new Date(tweet.created_at)}
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
  
  const initialTweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1639452559732
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1639538959732
    }
  ];

  renderTweets(initialTweets);

});
