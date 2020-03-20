# Progressive Web Apps @cmda-minor-web · 2019-2020
Repository for the progressiive web apps course

## Table of contents
* [Description](description)
* [Api](api)
* [Prerequisites](prerequisites)
* [Installing](installing)

## Ik wil feedback op
Sinds het vorige feedback gesprek heb ik geen voorderingen gemaakt met het project. Ik heb dus momenteel geen specifieke vragen waarop ik feedback wil hebben.

## Description
With this application you can get insight into who has forked your repository and if they have done any work on your project.

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
