# receipts-on-repeat

## Description

Our inspiration for creating Receipts on Repeat was [a concept we'd seen others do manually](https://www.youtube.com/watch?v=Tp1JsZ6ss98), where they take an album or playlist and format it like a store receipt using image manipulation software. We wanted to automate this process by allowing the user to connect their Spotify data, and by simply selecting one of their playlists from a list, our app would do the formatting for them.

Users can now quickly and easily generate a formatted receipt that lists the playlist name, song titles, artists, and even playlist art, transformed and manipulated to look right at home coming out of a receipt printer at your local corner store. We've even generated and included a QR code that will take them to the playlist, as well as the "Spotify Code" that users can scan through the Spotify mobile app for the same purpose.

Throughout the development of this app, we were able to hone our skills working with APIs, successfully implemented OAuth2 for the first time, and gained experience in front-end development, with a focus on making an app that is asthetic and intuitive to use. We also overcame large hurdles related to databases and overall server architecture, and greatly solidified our knowledge of both of these concepts.

While working together, we were able to test and improve our collaborative skills as developers, and further reinforced the importance of organization, communication, and task delegation in a team setting.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Rename the `.env.EXAMPLE` file to `.env`.

You'll need a Spotify account to register your app with [Spotify for Developers](https://developer.spotify.com) so that you can get a `CLIENT_ID` and `CLIENT_SECRET` to enter into your `.env` file. You'll also need to specify a Redirect URI when creating the app, and make sure it matches the `REDIRECT_URI` contained in your `.env` file. You can find instructions on how to do this [here](https://developer.spotify.com/documentation/web-api/tutorials/getting-started).

For local use:
- Run the following commands `npm install` `npm run seed` `npm run build` `npm run develop` to run the program and start the server/database. 
- You will not need to specify anything for the `MONGODB_URI` `NODE_ENV` variables in the `.env` file.
- You will need MongoDB Compass installed and connected, but you do not need to specify any additional settings to use it. 
    - The app will choose a name and create the database for you
    - By running the `npm run seed` command, the database will automatically be cleared out and will populate a sample receipt with the playlist title "music for ducks".

In production (deployed):
- Use `npm run render-build` for the build command, and `npm run start` for the start command. 
- You will need to specify a [MongoDB Atlas](https://www.mongodb.com/lp/cloud/atlas/try4-reg?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_amers-us_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19609124046&adgroup=145188748043&cq_cmp=19609124046&gad_source=1&gbraid=0AAAAADQ14028l1L2sN5EuDw5FkjntiWZ6&gclid=Cj0KCQiAu8W6BhC-ARIsACEQoDAT5d2oE7bTUWE9GArvChKImwk9xOAXw7kg-khjL5oIwOyGpEGtNAUaAgpxEALw_wcB) cluster driver connection link for the `MONGODB_URI` variable.
- you will need to specify `production` for the `NODE_ENV` variable.

## Usage

You can find the deployed site [here](https://receipts-on-repeat.onrender.com). 

You will need a Spotify account to use the features of the app other than viewing playlists that are already saved in the database and posted to the Saved Playlists page. 

If you have a Spotify account (either free or premium), you can use the "Click here to begin!" button on the main page, which will redirect you to Spotify to sign into your account. 

Once authenticated, you will be directed back to the User Profile page, and will be shown your recently created or saved playlists as clickable buttons.
![User Profile](client/src/assets/demopic-w-justlogo-textafter.png)
Clicking one of them will take you to the Current Playlist page, where you can view the stylized receipt for the playlist you selected.
![Receipt Page Bottom](client/src/assets/demopic-of-playlistReceipt-bottom.png)
At the bottom of the page, two buttons give you a choice to either post your receipt to the Saved Playlists Page or to go return to the User Profile page, where you can select a different playlist to view.

## Credits

If you'd like to get in touch with us or take a look at our other work, links to our GitHub profiles can be found below: 
- [Jacob Smith](https://github.com/5mitty)
- [David Cartolano](https://github.com/dcartolano)

A big thanks to our instructor, tutors, and everyone else from Northwestern and the EdX team who helped us out throughout the course and the development of this app. Your expertise, kindness, and patience while answering our many questions was immeasurably appreciated and we truly could not have done it without you.

Here are some resources and tutorials we utilized along the way:
- [How to generate a spotify code using web api?](https://community.spotify.com/t5/Spotify-for-Developers/How-to-generate-a-spotify-code-using-web-api/td-p/5452329o)
- [Get Current User's Playlists](https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists)
- [Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Jason Goodison - Python Spotify API #1 - Everything You Need To Know About OAuth2](https://www.youtube.com/watch?v=g6IAGvBZDkE)
- [Carmelle Codes - React JS Tutorial - 05 How to log in to Spotify in web apps](https://www.youtube.com/watch?v=G_WFk4wg9fk)
- [lyrics.ovh](https://lyrics.ovh)
- [lyrics.ovh API Documentation](https://lyricsovh.docs.apiary.io/#)
- [QR code API](https://goqr.me/api/)

## License

MIT