# Tweeter Project

Welcome to my Tweeter Project!

Tweeter is a simple, single-page Twitter clone used to showcase my skills honed to date using JavaScript, jQuery, AJAX, HTML and CSS.

Features include:
* Post "tweets" up to 140 characters
* Error message displayed for empty tweets or tweets exceeding 140 character limit
* Animated compose-tweet form can be visible or hidden by clicking on "Write a New Tweet" in the Navigation Bar
* Navigation Bar disappears when scrolling down on tablet screens
* When scrolling down on both desktop and tablet screens, a "scroll to the top" button appears in the bottom right corner. Clicking on this will return the user to the top and open the compose-tweet form for input.

N.B. This app is built primarily for tablet and desktop screens.

## Demo

!["Desktop version demo"](https://github.com/amyleblanc/tweeter/blob/master/docs/desktop-tweeter.gif)

!["Tablet version demo"](https://github.com/amyleblanc/tweeter/blob/master/docs/tablet-tweeter.gif)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Node version 14 or above
- Express
- Body-parser
- Chance
- MD5
