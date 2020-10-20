# Fare Weather Wanderers
---
## Code Institute - Interactive Frontend Development Milestone Project Two
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
* Rearranging of waypoints.
* Conversion of weather values such as temperature and wind speed.
* Automatic route/weather update when searching locations.
* Updated visuals for date-time picker on smaller devices.

## Technologies
---
#### Languages
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
19. [ESLint](https://eslint.org/): Linting tool installed in visual studio code.

### APIs
1. [Google Maps Javascript API v3](https://developers.google.com/maps/documentation/javascript/overview): An API for the use of google maps on a website requiring the use of Javascript.
2. [Open Weather Map](https://openweathermap.org/api): A weather API which returns weather data for a location and icons on request.

## Testing
---
The majority of testing of performed throughout development of this website, primarily through the use of the Chrome DevTools. Devtools allowed for any obvious errors to be tweaked, edited or corrected and then a solution identified and implemented into the main code where it could effectively solve most issues. This opportunity to trial the website changes was not only useful visually but also programatically for javascript.
Being able to debug code and follow the scripts running through their sequences and logic was crucial for highlighting when code was not performing the task as expected or if logic had been incorrectly used. For example, the use of being able to check variables and their values made it possible to see why some verifications or true false statements were not matching their target response or whether the data being received was in the correct format/type for the function which required it. 

Following a final discussion with my mentor Brian, it is possible to find the user-agent and determine which type of browser is being used. With this information I can specify the type of input required dependent on the browser in the future.

### User story testing

1.	##### As a customer, I want to be see the weather along my driving route so I can know how to prepare for my walk/activity.

    This is achieved by the submission button once all required locations and searches have been completed

2.	##### As a user, I am planning a multi-day trip and need to be able to select dates for my route.

    ##### There are datetime-local inputs for every waypoint so that time of day or days may be selected across the trip upto 7 days away.

3.	##### As a user, I want to be able to expand on the simple information for more information and times.

    Weather icons presented upon submission of a route can be select5ed by a click to display more information than is originally available.

4.	##### As a user, I need to be able to add waypoints for my trip and set times of day.

    It is possible to add more waypoints upto a total of 10, including the starting two locations. This is done by a waypoint button below the search locations.

5.	#####  a mobile user, the information needs to be easy to read and manipulated as I have limited space.

    I have tried to achieve this by seperating the page into two parts ideally, a selection/search area and large screen section devoted to the map.

6.	##### As a mobile user, the map and weather needs to be well proportioned on the screen.

    To make sure the map is well sized, I have desginated a large slot of space for it with minimal distractions on mobile an tablet devices. Plus the map takes up a large portion of the screen so should be easy to read and select.

7. ##### As a laptop user, the map needs to be visible at all times so it does not get covered by the search bar.

    To ensure visibility, the location search and date time have been offset to ensure that the map has the maximum space available.

8.	##### As a user, I would like the option to change the weather metrics to my preferred values.

    Sadly this has not been possible so far, but ideally is something the website can provide at a later date.

### W3C CSS validator
The CSS code was parsed by the W3C CSS validator with not warnings or errors.
* An issue was found with overflow-y: overlay when websites such as reponsinator force input scroll bars for phones, etc. This causes the screen to overflow its travel tabs. Found by validator and corrected using percentages.

### HTML validator
All HTML pages were parsed through the W3C HTML validator with no errors or warnings.

### JSHint
Maps.js and the jasmine testing suite mapsspec.js were parsed through JS Hint:
* One warning is still present: "Functions declared within loops referencing an outer scoped variable may lead to confusing semantics." However this is not an actual error and with such short code less of a concern.
* One unused variable for initMap, however as the page is called from the html I feel this is not necessarily true.

### Unit Testing
[Testing was also performed using jasmine in the head of a seperate index page called index testing which can be found here](https://rhyspollarddevelopment.github.io/InteractiveFrontEndMilestone/testing).

This suite was useful for creating test data and ensuring that the outcomes I expected were achieved. Testing should have followed a more TDD (Test Driven Development) manner, however due to the lack of experience with javascript it was not always possible to manage my work flow in such a way. There are some parts which were not tested in this suite:

* `routeValidations()`, `formatWeather(`) and `calculatedAndDisplayRoute()` were not tested in this suite as their use of external dependencies and my inexperience meant it was not possible
to write adequate tests which proved anything effectively.
* The test for `"should set map when completed the route validation"` was removed as the AJAX request return was asynchronous and would break random tests.
* Cannot test `formatWeather()` as the functions and constructor rely on the current datetime being generated and cannot be easily compared to created data. Since data is also taken from external sources this is beyond my capabilities to test.
* WeatherRequest is also not reliable for me to test as it requires multiple ajax requests which are not easily accessible outside the class and are difficult to assess.
* For future projects the use of async-wait and other code will be useful to control the flow of data from AJAX requests.

Besides the above testing the webpage was also run through the following tools or sites to compare and identify any issues:
1. [AmIResponsive?](http://ami.responsivedesign.is/): A page which runs four instances of the project at difference sizes.
2. [Responsinator](https://www.responsinator.com/): A tool which tests the responsiveness of your page on a range of pseudo-devices.
3. [Browserstack](https://www.browserstack.com/): This tool lets you use your project across all forms of browsers (including versions) and a range of phones and tablets.

Key findings from testing on all possible browsers and emulated safari and mobile devices found the majority of site features worked as intended. Only two major issues have arisen:
First, the datetime-local input which is used along side location text is not supported on firefox and safari for browsers, but is for phones, as the input degrades into a text input. To combat this I have put a placeholder text suggesting the correct format for firefox/safari users along with an information i button to also offer the specific information required. Validation and transformation of text type value to a correct date time has been inserted.

Second, Landscape mode on long phones had the unfortunate effect of setting the screen to a tablet or even laptop width and editing the mode to match. Due to the way the map is set up then the input container stretches beyond the length of the page as the map is linked to viewport size. Media queries were tried but a more sensible option was to 

#### Known Bugs:
* As this was written entirely in ECMAScript 6, this website does not work properly on Internet Explorer. This is because IE does not work with ECMAScript 6 or above. As Internet explorer is not commonly used and has officially been replaced with microsoft Edge, I have not considered this a high priority issue.
* The use of a text input instead of datetime-local (the recommended input) on safari and firefox for browser.
* Limited to certain measurements for weather api as is required in the call and is an extra goal to include in this project in future.
* Google maps does not correctly adjust the map viewport to fit all markers, instead updating viewport with newest selection unless route is called.


## Deployment
---
For my projects development, changes were committed to Git and pushed to GitHub. To deploy this website, GitHub Pages was used by the following procedure:

### GitHub Pages
* On the Github website, navigate to the relevant repository.
* Under the repository name (just above the green buttons for code and Gitpod), click the Settings” button.
* Scroll down the new page until you find the “GitHub Pages” heading.
* Under the “Source” subheading, used the dropdown to select the master branch to run the page from.
* Click the save button to the right, the screen with auto refresh.
* A new highlighted ribbon will appear with the projects url for you to access saying **Your site is published at https://rhyspollarddevelopment.github.io/InteractiveFrontEndMilestone/**.
* How to clone the repository:
* Navigate to the correct repository from the GitHub dashboard.
* Above the list of files, click the green “Code” button.
* From the dropdown, select the “Clone with HTTPS” by selecting the clipboard icon.
* Open Git Bash and change the working directory to the location you would like the clone to be.
* Type git clone, and past the URL you have copied. (Should be in the format $ git clone https://github.com/username/repository.)
* Press "Enter" to create your local clone.

### How to clone the repository:

1.	Navigate to the correct repository from the GitHub dashboard.
2.	Above the list of files, click the green “Code” button.
3.	From the dropdown, select the “Clone with HTTPS” by selecting the clipboard icon.
4.	Open Git Bash and change the working directory to the location you would like the clone to be.
5.	Type `git clone`, and past the URL you have copied. (Should be in the format `$ git clone https://github.com/username/repository`.)
6.	Press "Enter" to create your local clone.

## Credits
---
### Content
The website, brand and styling are all copyright to RhysPollardDevelopment. 
The map, route displayed and blue icon are all property of Google, while the weather information and weather icons are property of Open Weather Maps.

### Media
All map based media (excluding icons) are property of Google/Google Maps.
Weather based icon pngs are property of [Open Weather Map](https://openweathermap.org/api), these have been edited slightly to make them easier to see for accessiblity.

## Acknowledgements:
---
Special thanks to my mentor Brian Macharia for his help and advice in development this project.

Libraries for google fonts, bootstrap, jQuery and font-awesome were used throughout my project.

W3C was frequently used for tutorials and examples of how to write or structure code.

Stack Overflow was also frequently referenced for fixes to problems during in-development testing.

While many external resources and guides have been referenced in code comments, almost the entirity of this code pertaining to the initialisation of the map, directions request, use of markers and infor windows was found on google maps documentation.
Key documentation can be found below:
* [Google Maps JS markers](https://developers.google.com/maps/documentation/javascript/reference/marker)
* [Google Maps JS info Window](https://developers.google.com/maps/documentation/javascript/reference/info-window)
* [Autocomplete and travel tabs](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions#maps_places_autocomplete_directions-javascript)
* [Directions Handling](https://developers.google.com/maps/documentation/javascript/examples/directions-simple)

Inspiration for this website was found from the following sources.

* [WeatherCast](http://www.weathercast.co.uk/services/travel-weather.html)
* [Morecast](https://morecast.com/en/plan-your-route)
* [RoadTrippers](https://roadtrippers.com/)
* [Highway Weather](https://www.weatherroute.io/)

### Disclaimer
This project has been made for purely academic purposes.