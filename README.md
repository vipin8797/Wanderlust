# Wanderlust - App Development Journey

A full-stack Airbnb-like web application built using Node.js, Express, MongoDB, and EJS. This document serves as a structured development log tracking the implemented phases, features, and library integrations.

---

## Phase 1: Core Boilerplate & Layout Setup

* **Description**: Established the initial application structure, view templates, and layout boilerplate.

| Content                | Created & Practiced | Libraries Used |
|------------------------|--------------------|----------------|
| Creating Boilerplate   | 27-Jan             | Mongoose       |
| Navbar                 | 27-Jan             | Method_override|
| Footer                 | 27-Jan             | Express        |
| Styling Index Page     | 27-Jan             | EJS Mate       |
| Styling New Listing    | 27-Jan             |                |
| Styling Edit Listing   | 27-Jan             |                |  

---

## Phase 2: Robust Error Handling & Schema Validation

* **Description**: Added server-side schema validations using Joi and robust asynchronous error handlers to prevent application crashes.

| Content                | Created & Practiced | Libraries Used |
|------------------------|--------------------|----------------|
| Client-Side Validation   | 30-Jan             | Mongoose       |
| Success & Failure text   | 30-Jan             | Method_override|
| Custom Error Handling    | 30-Jan             | Express        |
| Add wrapAsync            | 30-Jan             | EJS Mate       |
| Add ExpressError         | 30-Jan             | Joi            |
| Error.ejs                | 30-Jan             |                |  
| Joi Schema Validation    | 30-Jan             | Joi            |
| JoiValidation middleware | 30-Jan             |                |  

---

## Phase 3: Relational Database & Reviews Features

* **Description**: Implemented one-to-many relationship models allowing users to review listings and handled cascading deletions of associated reviews.

| Content                | Created & Practiced | Libraries Used |
|------------------------|--------------------|----------------|
| listing Deletion       | 31-Jan             | Mongoose       |
| post middleware        | 31-Jan             | Method_override|
| creating Review model  | 31-Jan             | Express        |
| review form            | 31-Jan             | EJS Mate       |
| Joi validation         | 31-Jan             | Joi            |
| Render Reviews         | 31-Jan             |                |  
| Deleting Reviews rel   | 31-Jan             |                |
| Deleting Listing rel   | 31-Jan             |                |  

---

## Phase 4: Express Router & Cookie Parsing

* **Description**: Restructured the monolithic routing structure using Express Router and integrated cookie parsers.

| Content                      | Created & Practiced | Libraries Used |
|------------------------------|--------------------|----------------|
| What is Router               | 4-Feb             | Mongoose       |
| Using Express Router         | 4-Feb             | Method_override|
| Restructuring Listings routes| 4-Feb             | Express        |
| Restructuring Reviews routes | 4-Feb             | EJS Mate       |
| Web Cookies                  | 4-Feb             | Joi            |
| Sending Cookies              | 4-Feb             | Cookie-Parser  |  
| Cookie Parser                | 4-Feb             |                |
|Signed Cookies                | 4-Feb             |                |  

---

## Phase 5: Express Sessions & Flash Notifications

* **Description**: Integrated stateful server-side sessions using express-session and temporary alerts with connect-flash.

| Content                      | Created & Practiced | Libraries Used |
|------------------------------|--------------------|----------------|
| Stateless & Statefull        | 5-Feb             | Mongoose       |
| Express-sessions             | 5-Feb             | Method_override|
| Stroing using sessions       | 5-Feb             | Express        |
| Using connect-flash          | 5-Feb             | EJS Mate       |
| Using res.locals             | 5-Feb             | Joi            |
| implementing session in proj | 5-Feb             | Cookie-Parser  |  
| Cookie in sessions           | 5-Feb             |Express-Sessions|
|implementing flash in proj    | 5-Feb             |                |
|including flash.ejs in boilerplate.ejs| 5-Feb     |                |  

---

## Phase 6: Passport.js Authentication Setup

* **Description**: Added robust authentication, passwords hashing, and local strategies using Passport.js.

| Content                | Created & Practiced | Libraries Used |
|------------------------|--------------------|----------------|
| How pass stored              | 6-Feb             | Mongoose       |
| Hashing & Salting            | 6-Feb             | Method_override|
| Passport                     | 6-Feb             | Express        |
| User Model                   | 6-Feb             | EJS Mate       |
| Local Strategy               | 6-Feb             | Joi            |
| Demo User                    | 6-Feb             | Cookie-Parser  |  
| SignUp Route                 | 6-Feb             | Express-Sessions|
| Login Route                  | 6-Feb             | Passport        |
|                              |                   |Passport-locals  | 
|                              |                    |Passport-locals-mongoose |

---

## Phase 7: Granular User Authorization

* **Description**: Protected critical create, update, and delete actions behind ownership-checking middleware.

| Content                | Created & Practiced | Libraries Used |
|------------------------|--------------------|----------------|
| connecting Login Route       | 8-Feb             | Mongoose       |
| LogOut User                  | 8-Feb             | Method_override|
| Login after SignUp           | 8-Feb             | Express        |
| Post-Login Page              | 8-Feb             | EJS Mate       |
| Listing Owner                | 8-Feb             | Joi            |
| Starting with Authorization  | 8-Feb             | Cookie-Parser  |  
| Listing Authorization        | 8-Feb             | Express-Sessions|
| Revew Authorization          | 8-Feb             | Passport        |
|                              |                   |Passport-locals  | 
|                              |                   |Passport-locals-mongoose |

---

## Phase 8: MVC Architecture & Cloud Storage Integration

* **Description**: Refactored listing logic to follow clean MVC structure and integrated Multer with Cloudinary for handling file uploads.

| Content             | Created & Practiced | Libraries Used                       |
|----------------------|--------------------|--------------------------------------|
| MVC Model            | 10-Feb             | Mongoose                              |
| MVC for Listing      | 10-Feb             | Method_override                     |
| MVC for Review & User| 10-Feb             | Express                               |
| Router.route         | 10-Feb             | EJS Mate                              |
| Restyling Rating     | 10-Feb             | Joi                                  |
| Image Upload         | 10-Feb             | Cookie-Parser, Multer, Dotenv, Cloudinary, Multer-Storage-Cloudinary |
| Manipulating Form    | 10-Feb             | Express-Sessions                      |
| Cloud Setup          | 10-Feb             | Passport, Passport-locals, Passport-locals-mongoose |
| Store Files          | 10-Feb             | -                                     |
| Save Listing in Mongo| 10-Feb             | -                                     |
| Display Image        | 10-Feb             | -   

---

## Phase 9: Image Editing & Dynamic Maps Integration

* **Description**: Added image thumbnail previews for listings editing and integrated location coordinates with geocoding for interactive maps.

| Content               | Created & Practiced | Libraries Used                |
|-----------------------|--------------------|------------------------------|
| Edit Listing Image    | 11-Feb             | Mongoose                      |
| Image Preview edit.ejs | 11-Feb            | Method_override               |
| Getting star with Map | 11-Feb             | Express                       |
| Our First Map         | 11-Feb             | EJS Mate                      |
| Geocoding             | 11-Feb             | Joi                           |
| Storing Coordinates   | 11-Feb             | Cookie-Parser                 |
| Map Marker            | 11-Feb             | Express-Sessions              |
| Map Popup             | 11-Feb             | Passport                      |
|                       |                    | Passport-locals               |
|                       |                    | Passport-locals-mongoose      |
|                       |                    | unknown                       |
|                       |                    | unknown                       |


