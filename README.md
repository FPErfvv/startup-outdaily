# Nature Tracker

[My Notes](notes.md)

Startup Description

The Nature Tracker is a creative and innovative application that is used to encourage people to spend more time in nature. It allows users to log outdoor activities and keeps track of their streak for how many days in a row they spent outside.


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever felt the call of the wild? Have you ever felt like something was missing within yourself? We all have! Due to our fast paced and work oriented society, we often miss out on opportunities to stop and literally smell the roses. This application, the **Nature Tracker**, encourages users to spend more time outside and enjoy the wonderous world in which we live. Its simple design allows the user to track time spent outside and even compete with others to see who can spend the most consecutive days enjoying the beauties of mother nature. Spending more time outside can literally change your life, as mentioned in [this article](https://hsph.harvard.edu/news/time-spent-in-nature-can-boost-physical-and-mental-well-being/).
### Design

![Design image](images/naturetrackerdesign.jpg)

The photo above demonstrates the three main pages (features) of the application.

### Key features

- Secure login to keep track of user data
- Simple entry creation to track time spent
- Streak tracking
- Score algorithm that gives more points based off of a variety of factors
  - length of streak
  - weather at time of the recording of the entry
- Active Leaderboard ranking

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three HTML pages, as shown in the description above. 
  - Login page
  - Entry creation page
  - Leaderboard page
- **CSS** - Application styling that reflects the purpose of the application. This will include nature-like colors such as
  - Green
  - Sky Blue
  - Brown
  - Grey
- **React** - React will be used to display all of the UI logic like controlling login, displaying the entry input, displaying the point scoring, and displaying rankings
- **Service** - Backend functionality for logic and processing
  - API calls to weather (for calculating score)
  - User point calculation
  - User authentication
- **DB/Login** - Stores user information, such as
  - User login information
  - User entry streak
  - User scoring (points/ranking)
- **WebSocket** - As users input entries and the user scores are updated, the websocket will update the ranking of the leaderboard, as well as update the information that the other users can see of each other (streak sharing). When you are displaced from the podium, it will send notifications to let you know that your place has been taken.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://startup.outdaily.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I added three pages. The login and about page: `index.html`, The entry page: `entry.html`, and the leaderboard page: `leaderboard.html`.
- [x] **Proper HTML element usage** - I used a variety of tags to create structure and represent functionality, including the following tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`, `<fieldset>`, `<table>`, `<ul>`, `<li>`, `<label>`, `<input>`, and `<button>`.
- [x] **Links** - I added a variety of links. There are links in the header to other pages. There is a link in the about section of `index.html` to a paper about nature, and then there is a link in the footer to my GitHub page.
- [x] **Text** - I added a text description in the login page to describe the application. Then, there are various places in the document where notes/descriptions are added. For example, if you hover over the points, it adds additional description. 
- [x] **3rd party API placeholder** - I put a box in `entry.html` to list a variety of weather facts (Temperature, humidity, etc). These facts will be pulled from a weather API based off of the location provided in the entry submission. The weather will be used to affect the points received from each entry. For example, the harsher the weather, the more points a user can score from an experience outside. 
- [x] **Images** - I added an image of nature to the front page to set the theme of the application. Then, I added an image in the weather data box to represent what the weather might look like. 
- [x] **Login placeholder** - I added a input tag for the password and email of the user, which will allow them to log into the webpage.
- [x] **DB data placeholder** - The `entry.html` pages shows the users streak and points, which will be stored in the database. Also, the `leaderboard.html` will show the streak and points from other users, which will be also drawn from the database. 
- [x] **WebSocket placeholder** - As soon as an entry is added that changes the points of a user and thus changes the ranking, the leaderboard (in the `leaderboard.html` page) will change on all users devices without needing to reload the page. This will provide real time updates to all users about their current status.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
