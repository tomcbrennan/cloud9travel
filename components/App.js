// Imports
import { Auth } from "./Auth.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";

// Create App
const App = {
  // App Properties
  name: "Cloud9Travel.app",
  version: "1.0.0",
  author: "Thomas Brennan",
  rootEl: document.querySelector("#app"),
  routes: {},

  init: () => {
    Notify.init();
    Auth.check(() => {
      App.router();
      window.addEventListener("hashchange", App.router);
    });
  },

  addRoute: (path, pageController) => {
    App.routes[path] = {
      controller: pageController
    };
  },

  router: () => {
    // Get the current hash location
    const path = location.hash || "#";

    // Find route for this path or hash
    const route = App.routes[path];
    if (route) {
      route.controller();
    } else {
      alert("404 page/file not found");
    }
  },

  loadPage: (title, templateId, data, callback) => {
    // Setting the document title
    document.title = title;

    // Grab the template and store in a variable
    let template = document.querySelector(`#${templateId}`).innerHTML;
    let output = Mustache.render(template, data);

    // Insert the output HTML into the root element with animation
    // Fade out app div
    App.rootEl.className = "hidden";

    // Load in new HTML and fade in
    setTimeout(function() {
      App.rootEl.innerHTML = output;
      App.rootEl.className = "";
      App.loadNav();

      // Run callback
      if (typeof callback == "function") {
        callback();
      }
    }, 300);
  },

  loadNav: () => {
    // Get main nav div
    let mainNav = document.querySelector("#main-nav");

    if (Auth.authenticated) {
      // Signed in - show nav items favourites, profile and sign out
      mainNav.innerHTML += `
            <a href="#hotels">My Hotels</a>
            <a href="#featured">Featured</a>`;
    } else {
      // Not signed in - show nav items sign up and sign in
      if (mainNav) {
        mainNav.innerHTML += `
            <a href="#signIn">Sign In</a>
            <a href="#signUp">Create Account</a>`;
      }
    }

    App.refreshNav();
  },

  refreshNav: () => {
    // Get the current path
    let currentPath = location.hash || "#";
    let navItems = document.querySelectorAll("#main-nav > a");
    navItems.forEach(navLink => {
      if (navLink.getAttribute("href") == currentPath) {
        navLink.classList.add("active");
      }
    });
  },

  refreshHamburgerNav: () => {
    let currentPath = location.hash || "#";
    let hamburgerNavItems = document.querySelectorAll("#hamburger-nav > a");
    hamburgerNavItems.forEach(hamburgerNavLink => {
      if (hamburgerNavLink.getAttribute("href") == currentPath) {
        hamburgerNavLink.classList.add("active");
      }
    });
  }
};

export { App };
