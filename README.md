# Udacity Front-End Developer NanoDegree: Project 5 - Restaurant Review App

## Introduction

This project has been created as part of the [Udacity Front-End Developer Nanodegree](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001) and involved transforming a static webpack into a mobile-ready web application. Completing this task required making the provided site fully mobile responsive, accessible and able to run offline.

For more information about the project, please see the project overview [here](https://classroom.udacity.com/nanodegrees/nd001/parts/b1808a20-5e71-4dd3-bbc1-4ae86beefd6d/modules/8341f413-0af9-434a-a8e1-b0750e2df83f/lessons/9ed091e9-db9d-4888-9737-f1ca00cfe4db/concepts/cfffc21e-a8ce-4bea-a6f6-76bdc626a4cd) and the project rubric [here](https://review.udacity.com/#!/rubrics/1090/view).

## Technologies

This project uses vanilla JavaScript, HTML and CSS.
Media queries are used to allow mobile responsiveness (i.e. the wep application will work on any device). The web application has been built according to WCAG (Web Content Accessibility Guidelines), see [here](https://www.w3.org/TR/WCAG20/) for the guidelines.
The web application has also been made to run offline using a Service Worker (for more information on Service Workers, see [here](https://developers.google.com/web/fundamentals/primers/service-workers/)).

## Prerequisites

In order to run this project, you will require Python. If you do not have Python intalled,head to Python's [website](https://www.python.org/), download and install the software. You can check whether you have Python installed by running `python -v` from the command-line.

## How to run

1. Clone this repository
2. Open up the Command Line and navigate to the project folder (using `cd`).
3. Start the server using: - `python -m SimpleHTTPServer 8000` if you are using Python 2.x - `python -m http.server 8000` if you are using Python 3.x (Note: users who are not using windows will need to enter `python3 -m http.server 8000`). If you are using Visual Studio Code, you can use the Live Server extension to run this code (Note: If using Live Server you may need to change the server port in `dbhelper.js`).
4. Open up a browser and navigate to (http://localhost:8000/)

## Notes

I have added in some additional functionality to the Service Worker so that a popup displays when an update is available. This is triggered by any update to the sw.js file (e.g. incrementing the version number - `const VERSION = x`).

Within the Service Worker, I have implemented a function to remove query parameters (e.g. `?id=2`) from a URL. This is very useful in this project because it enables the Service Worker to cache the file `restaurant.html` and retrieve this from the cache whilst ignoring the query parameters. This does not affect the functionality of the restaurant detail pages because the core HTML is the same for all and the restaurant details are retrieved via JS.
