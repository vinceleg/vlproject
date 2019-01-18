---------------------------------------------------------------------------------------------------------------------
GROUP-16 ESPORTS PAGE
By: Kyle Browne, Vincent Liang, Wade Schmidt
---------------------------------------------------------------------------------------------------------------------

this is group 16's final deliverable for the comp1930 course

Working link: https://esportspage-12ee8.firebaseapp.com/


Folder and files:

- 'css' folder contains our css file used to style our webpages

- 'images' folder contains all the images we used

- 'vendor' folder includes files for bootstrap and jquery

- 'gulpfile.js' file is used to run bootstrap and jquery
 
- 'package.json' and 'package-lock.json' is also used to run bootstrap and jquery


Our main webpages are: index.html, main.html, tournaments.html, and tournaments1signup.html to tournaments4signup.html
included html pages are:
	    
    404.html:
    - default error page made by firebase

    community.html:
    - page NOT completed; would allow users to post threads 

    games.html:
    - page NOT completed; if you click games on the navbar, it will take you to the games page with a selection of games.
    Each page would list 4 games. Currently clicking on any game-page doenst lead anywhere but in future
    iterations it would lead to more detailed info page for each game with rankings, scores, info, schedules
    etc.

    index.html:
    - index is the first page that the user will see. Using firebases own
    sign in method we create instances of our webpage for each unique user.
    The method for signing in is providing an email, first and last name,
    and a password. Once signed up the user simply must enter their email and
    password to use the page.

    main.html:
    - after the sign-in page, the user is brought to the main.html page this serves as 
    the landing page for the user. The home page consists of news stories and headlines
    none of the clickable links lead to any pages at the moment. In future use, these links 
    would go to future web pages

    - at the top of the page is a nav bar, with home hilighted indicating which page you are on.

    news.html:
    - page NOT completed; brought to you once you click news on the navbar, news page is still under construction. 
    Will display news stories that are more game specific.

    profile.html:
    - page NOT completed; profile page, based on who is signed in, will display a personal profile page tied to the authentication module in firebase.
      Currently it just gets the email and the name tied to the the current user.	

    tournaments.html: 
    - clicking on tournaments on the navbar will take you to a list of tournaments for esports. Each game has a clickable button to a sign up page.

    touranments[1..4]signup.html (main feature):
    - each tournament sign up page has a sign up section for a username and a team name. 
      Once entered and clicked submit, the name and team name are sent to the firebase database. 
      The javascript code then gets a snapshot of the current database tree(based on current tournament) from firebase and puts 
      the names and team names in a table for that current tournament.

    -----------------------------------------------------------------------------------------------------------------
    CSS
    -----------------------------------------------------------------------------------------------------------------
	- for css we used free open source boostrap and jquery. and w3 schools open source navbar
  



