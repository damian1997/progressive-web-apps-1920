# Progressive Web Apps @cmda-minor-web · 2019-2020
Repository for the progressiive web apps course

## Table of contents
* [Description](description)
* [Concept](concept)
* [Optimizations](optimizations)
* [Api](api)
* [Prerequisites](prerequisites)
* [Installing](installing)

## Description
During this course i will be converting my client side webside that i build for the [web-app-from-scratch](https://github.com/damian1997/web-app-from-scratch-1920) course to a serverside rendered web application.
The coals of this course is to add as much optimisations to the application to make it run more smooth and enhance the experience the user gets. We will do this by
implementing:
* Server side rendering
* Optimizing the critical render path
* Service Workers
* Manifests
* Compression

### Application description
With this application you can see what the students have worked on based on their commits they made to their forked repository of this course.

## Concept
This web app gives you an insight into how the students have been working on their project and how they structure their commits. The user will be able
to see what changes the student has made to their files for each commit.

<details>
<summary>Designs</summary>

**Desktop design overviewpage**

<img src="./github/images/design-1.png" alt="">

**Mobile designs**

<img src="./github/images/design-2.png" alt="">

<img src="./github/images/design-3.png" alt="">

</details>

## Optimizations
I first started of by doing a audit on the web-app-from-scratch application to see what point we are starting off from.

<details>
<summary>Web-app-from-scratch audit</summary>
As you can see from the image below the application functions terribly and has really low scores across the board. So we have a long way to go.
<img src="./github/images/testing/audit-pwa.png" alt="wafs audit starting point">
</details>

### Server side rendering
I started of by refactoring my project to be able to be rendered from the server, in the web-app-from-scratch course i rendered the whole application from the browser using a virtual dom and diffing algorithm.
What i noticed is that my api does not like the amount of fetches i need to do in order to get the data i need, so i made a prebuild data fetching script that writes the data into a file on the server so i dont have to
keep asking the api for the information i need.

<details>
<summary>Audit after refactoring to server side</summary>
As you can see from the image below the scores look really promising, but this is to be expected because there is no styling or javascript loading in yet.
<img src="./github/images/testing/server-side-audit.png" alt="Audit after refactoring to server side rendering">
</details>

## Api
This project makes use of the following Api
* [Github Api V3](https://developer.github.com/v3/)

### Rate limiting
For API requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic authentication For API requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic Authentication or an [OAuth](https://developer.github.com/v3/#oauth2-token-sent-in-a-header) was used.

For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

#### Used authentication
This project currentcly fetched data with unauthenticates requests.

## Prerequisites
* Nodejs
* NPM

## Installing
Clone repository into local directory
```
git clone https://github.com/damian1997/progressive-web-apps-1920.git
```

Install packages
```
npm install
```

Run local server
```
npm run dev
```
