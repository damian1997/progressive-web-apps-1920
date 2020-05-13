# Progressive Web Apps @cmda-minor-web · 2019-2020
Repository for the progressiive web apps course

## Table of contents
* [Description](#description)
* [Concept](#concept)
* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Optimizations](#optimizations)
* [Api](#api)
* [Conclusion](#conclusion)

## Description
During this course I will be converting my client side webside that i build for the [web-app-from-scratch](https://github.com/damian1997/web-app-from-scratch-1920) course to a serverside rendered web application.
The coals of this course is to add as much optimizations to the application to make it run more smooth and enhance the experience the user gets. We will do this by
implementing:
* Server side rendering
* Optimizing the critical render path
* Service Workers
* Manifests
* Compression
* Loading Javascript inside the head using defer to make it non-blocking

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

## Optimizations
I first started of by doing a audit on the web-app-from-scratch application to see what point we are starting off from.

<details>
<summary>Web-app-from-scratch audit</summary>
As you can see from the image below the application functions terribly and has really low scores across the board. So we have a long way to go.
<img src="./github/images/testing/audit-pwa.png" alt="wafs audit starting point">
</details>

### Server side rendering
I started of by refactoring my project to be able to be rendered from the server, in the web-app-from-scratch course I rendered the whole application from the browser using a virtual DOM and diffing algorithm.
What I noticed is that my api does not like the amount of fetches i need to do in order to get the data I need, so I made a prebuild data fetching script that writes the data into a file on the server so I don't have to
keep asking the API for the information I need.

<details>
<summary>Audit after refactoring to server side</summary>
As you can see from the image below the scores look really promising, but this is to be expected because there is no styling or javascript loading in yet.
<img src="./github/images/testing/server-side-audit.png" alt="Audit after refactoring to server side rendering">
</details>

### Styling and javascript minimization
Now it is time to start adding the styling. To minimize the size of the css and javascript files I will be using webpack. By minimizing the files through webpack you will remove
all the whitespace and comments. Webpack can also do a lot of other optimizations such a tree shaking where it checks if there is any redundant imports inside your javascript and will
remove those redundant pieces of code to decrease the bundle size.

<details>
<summary>Audit and network tab after implementing styling</summary>

<img src="./github/images/testing/audit-styling.png" alt="Audit after adding styling to the application">

<img src="./github/images/testing/networktab-styling.png" alt="Network tab after adding styling to application">
</details>

### Gzip compression
Gzip compression for express is a middleware that decreases the size of the response body. This will increase the speed of the application, this wont be that much because its a small
application but it is really easy to implement.

<details>
<summary>Network tab after implementing gzip compression</summary>
When you compare the network tab after gzip implementation you see a 1ms improvement when rendering the page for the first meaningful paint.
<img src="./github/images/testing/gzip-compression.png" alt="Network tab after gzip compression has been implemneted">
</details>

### Caching with service workers
For this project we implemented service workers, with service workers you can give your users a rich offline experience and do background syncrsynchronisation
aswell as caching and pushing notifications to the user.

The main reason why I implemented a service worker is to cache webpages and assets to make the page load faster if it has already been visited.
<details>
<summary>Caching core assets</summary>
As you can see my styling has been cached alonside my javascript and images. I also have a page called offline inside the cache so if the user has trouble with his connection
and tries to go onto a page he has not visited before he will see a page with information about his Internet connection. The reason we do this is to prevent the user from
looking at a empty screen.

<img src="./github/images/testing/core-asset-caching.png" alt="Core assets inside browser cache">
</details>

#### Problems with caching html pages
As mentioned before I use webpack for minifying my css and javascript, when compiling I let webpack put a hash inside the name for the css and js file
(hash is based on content of the file). This makes wil ensure the correct stylesheet is always loaded and not some older version snuck into the application.
In order to get this working i had to use some packages:
* [Serviceworker webpack plugin](https://www.npmjs.com/package/serviceworker-webpack-plugin)
* [Webpack manifest plugin](https://www.npmjs.com/package/webpack-manifest-plugin)

With these 2 packages implemented I now have access to the up to date names of the css an js file I need inside my service worker, I need this to be able to cache them.
But somehow somewhere when implementing these 2 packages I lost the ability to cache my html pages, I have not found out what causes this problem but I think it has
something to do with the serviceworker webpack plugin compiling my serviceworker the wrong way. Caching my html pages worked perfectly before implementing these 2 packages.

<details>
<summary>Caching before implementing 2 packages</summary>
As you can see in these images below I was able to cache my html pages before implementing the 2 packages, but not able to cache the css and js.

<img src="./github/images/testing/service-workerv1.png" alt="Cached html pages">

<img src="./github/images/testing/service-workerv1-2.png" alt="Cached assets">
</details>

### Non-blocking javascript loading
In the web-app-from-scratch course I loaded the javascript in the tail of the body, this is not best practice when it comes to time to interactive.
I decided to put my javascript inside the head, this ensure that the javascript will be loaded in quicker, the only problem with this is that you will
block the rendering of your html page because you are waiting for all of your javascript to be loaded. To fix this problem I added the defer attribute to
my script tag, defer will make the javascript file load in asynchronously and thus not block the loading of the html.

#### Critical rendering path
The critical rendering path are the steps the browser takes until it shows the user a screen with pixels. This means converting the html, css, and javascript to the website the user can
interact with. To optimize this process you need to look at what files have the highest priority and place them inside the call order according to their importance, example is
the javascript file I discussed above.

## Api
This project makes use of the following Api
* [Github Api V3](https://developer.github.com/v3/)

For this project I retrieve all the people who have fetched the [Progressive web apps](https://github.com/cmda-minor-web/progressive-web-apps-1920) repository,
once I have this information for every person that forked the repository I fetch their commits (can only fetch the last 30). I do this all during a pre build
step and write it into a JSON file on the server. When a user wants to see the changes of a commit I will fetch the files that have been changed
for that specific commit.

### Rate limiting
For API requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic authentication For API requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic Authentication or an [OAuth](https://developer.github.com/v3/#oauth2-token-sent-in-a-header) was used.

For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

#### Used authentication
This project currently fetched data with unauthenticated requests.

## Conclusion
> Je snapt het verschil tussen client side en server side renderen en kan server side rendering toepassen voor het tonen van data uit een API

The project i build for web-app-from-scratch I heavily leaned on the client-side javascript, my whole application was build from the client and there would be nothing
on the screen if the user had no javascript enabled. During this course I re factored the whole project and made it possible to render the application
on the server and this enables the user to consume the content even if he/she has no javascript enabled.

> Je begrijpt hoe een Service Worker werkt en kan deze in jouw applicatie op een nuttige wijze implementeren.

During this course I have used the service worker to enhance the user experience by making sure the user never sees a empty screen when he/she has no Internet connection
and improve the loading speed of the application by implementing caching. I ran into some difficulties but i tried my best to explain what happened in this readme.

> Je begrijpt hoe de critical render path werkt, en hoe je deze kan optimaliseren.

For this project I made implemented a few fixes to optimize the critical rendering path.
* Compiling and compressing css and javascript files
* Tree shaking javascript files
* Asking for important files at the beginning without them blocking the rendering path.
