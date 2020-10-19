# Fare Weather Wanderers
---
## Code Institute = Interactive Frontend Development Milestone Project Two
---
[Live Project can be viewed here.](https://rhyspollarddevelopment.github.io/InteractiveFrontEndMilestone/)

The goal of this project was the creation of an interactive front-end site which will respond to the users' actions. It must also allow users to actively engage with data and alter how the site displays the information for their own preferred goals.
My milestone project was the development of "Fare Weather Wanderers" website/tool. This is a mobile-first, interactive travel planning web-page who's purpose is to allow users to find the weather on their trip at specific times of day at various locations. The page uses two APIs to retrieve travel and weather data for the user to visualise.

## User Experience
---
Fare Weather Wanderers was intended as a tool for users/visitors who want to check the weather on any trips they are taking which covers a medium to large distance. For example, those who are driving to a different county for a visit/walk/outing and want to know how to prepare weather wise, or those who just want to see how the weather conditions might change during a long drive.

This website in particular is also tailored to
* Outdoor Road Trips
* Trips which cover multiple days or large distances.
* Hiking

While there are similar websites such as [WeatherCast](http://www.weathercast.co.uk/services/travel-weather.html) and [Morecast](https://morecast.com/en/plan-your-route), almost no well designed webpages were suited for this purpose.

### User Stories
1.	As a customer, I want to be see the weather along my driving route so I can know how to prepare for my walk/activity.
2.	As a user, I am planning a multi-day trip and need to be able to select dates for my route.
3.	As a user, I want to be able to expand on the simple information for more information and times.
4.	As a user, I need to be able to add waypoints for my trip and set times of day.
5.	As a mobile user, the information needs to be easy to read and manipulated as I have limited space.
6.	As a mobile user, the map and weather needs to be well proportioned on the screen.
7.	As a laptop user, the map needs to be visible at all times so it does not get covered by the search bar.
8.	As a user, I would like the option to change the weather metrics to my preferred values.

### Wireframes
All wireframes were constructed using the Balsamiq tool. Due to the nature of this as a single page website, there was not much content to select for. However, as this is a very visual website it was highly important to maximise the amount of screen space offered for the map regardless of device viewed upon. Offsetting all the forms and important information to the screens edges helps the site offer maximum space.

* [Laptop Wireframe](assets/wireframes/laptopwireframe.pdf)
* [Mobile Wireframe](assets/wireframes/mobilewireframe.pdf)
* [Tablet Wireframe](assets/wireframes/tabletwireframe.pdf)

### Surface Design
* #### Colour Scheme:

    For the main colours of my website I went for something simple in design and colour. The theme was something along the lines of a smoking jacket, warm rich reds which were not too strong and went well with a smart, simple font like Playfair Display. I did not want to have too much white since the map already can be very pale and takes up most of the the users view.

* #### Images:

    I have very few images in my website as the map is main focus. There are some edited icons of weather which I have selected since they're simple and hard to mistake.

* #### Typography:

    I have chosen Playfair Display as it is very crisp and easy to see but does not distract from the map as that is the main focus. It also is easily readable and stands out well against background colours while looking smart.

## Features
---
This is a summary of the features this project employs in its user focussed design to effectively present information.

Navigation Bar:
*	Highlights the company business brand.
*	Holds a reset button to refresh route and form inputs.

Footer:
* Displays company copyright and social media links.
* Offers contact us modal button for comments and requests.

Side Panel Form:
* Holds inputs for both text and date-time which can be edited by user.
* Autocomplete for google locations using the text input field.
* Add waypoint button allows user to insert new locations between the start and end locations.
* Submission button to send request for weather and directions.

Reset Button
* Clears the map, input fields and background data.

Text Inputs
* Allows the user to search for addresses or locations with the use of google autocomplete.

Date/time inputs:
* Allows users to select the day and time for the weather they are interested in.
* Restricted to 7 days from the current day for accurate information.

Map Markers:
* Custom map markers for each search location.
* Weather dependent markers related to the time and location of each waypoint.
* Clickable weather markers which open an info window with more information.

Weather Info-Windows:
* Dismissible info-windows with indepth weather information for each location.

Modal Contact Us Form:
* Modal pop up page for contacting company.
* Email Validation

### Features to Implement:
⦁	Rearranging of waypoints.
⦁	Conversion of weather values such as temperature and wind speed.
⦁	Automatic route/weather update when searching locations

## Technologies
---
### Languages
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
* [CSS3](https://developer.mozilla.org/en-US/docs/Archive/CSS3)
* [Javascript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Specifically ECMAScript 6/2015

### Libraries, Frameworks and Tools
1. [Bootstrap v4.7.0](https://getbootstrap.com/): Front end framework for development of websites, offers pre-designed components and classes which can be further customised.
2. [jQuery](https://jquery.com/): Library of base JavaScript, allowing the use of interactivity and features on components and simplifying DOM.
3. [Gitpod](https://www.gitpod.io/): The Integrated Development Environment (IDE) I have chosen to use for this project.
4. Git: Version control system used to catalogue project development.
5. [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools): Online resource in Chrome browser, used to make edit pages quickly to diagnose problems or test changes.
6. [Google Fonts](https://fonts.google.com/): Library used to embed and link expanded font choices into the project.
7. [Font-Awesome](https://fontawesome.com/): Library offering a wide icon set for use in projects.
8. [Favicon.io](): Favicon generator which converts images into favicons for use in the browser tab.
9. [Adobe Color](https://color.adobe.com/explore): Online tool used for identifying colour palettes and themes. Used to extrapolate colours from images and find suitable colour ranges.
10. [Balsamiq](https://balsamiq.com/): Wireframing tool for concept creation and design for website.
11. [Microsoft Publisher](https://www.microsoft.com/en-gb/microsoft-365/publisher): Document design tool for creation of downloadable documents.
12. [Clip Paint Studio](https://www.clipstudio.net/en_03?utm_expid=.dtAmymurQo6-GHgfn11JjA.2&utm_referrer=https%3A%2F%2Fwww.google.com%2F): Art tool used to make some backgrounds, brand icon and some picture edits.
14. [Autoprefixer CSS Online](https://autoprefixer.github.io/): parsed CSS and produced webkit vendor prefixes for CSS stylings to work correctly on other browsers.
15. [Popper.js](https://popper.js.org/): A library for javascript which enables and helps control popovers, used in conjunction with Bootstrap.
16. [Visual Studio Code](https://code.visualstudio.com/): A programming environment for developing which allows for extensions and testing.
17. [Prettier](https://prettier.io/): A tool used in combination with VS Code to format and style code.
18. [Jasmine](https://jasmine.github.io/): A tool used in combination with VS code to perform unit testing.

### APIs
1. [Google Maps Javascript API v3](https://developers.google.com/maps/documentation/javascript/overview): An API for the use of google maps on a website requiring the use of Javascript.
2. [Open Weather Map](https://openweathermap.org/api): A weather API which returns weather data for a location and icons on request.

## Testing
---