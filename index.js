// Import App ------------------------------------------

import { App } from "./components/App.js";

// Import Page Controllers -----------------------------

import { addHotelPageController } from "./page-controllers/addHotel.js";

import { hotelsPageController } from "./page-controllers/hotels.js";

import { homePageController } from "./page-controllers/home.js";

import { favouritesPageController } from "./page-controllers/favourites.js";

import { featuredPageController } from "./page-controllers/featured.js";

import { signUpPageController } from "./page-controllers/signUp.js";

import { signInPageController } from "./page-controllers/signIn.js";

import { userProfilePageController } from "./page-controllers/userProfile.js";

// Routes ----------------------------------------------
// Home
App.addRoute("#", homePageController);

// #Hotels
App.addRoute("#hotels", hotelsPageController);

// #Featured
App.addRoute("#featured", featuredPageController);

// #Favourites
App.addRoute("#favourites", favouritesPageController);

// #SignUp
App.addRoute("#signUp", signUpPageController);

// #SignIn
App.addRoute("#signIn", signInPageController);

// #AddHotel
App.addRoute("#addHotel", addHotelPageController);

// #UserProfile
App.addRoute("#userProfile", userProfilePageController);

// Load App --------------------------------------------
document.addEventListener("DOMContentLoaded", App.init);
