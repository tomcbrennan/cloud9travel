// Imports
import { App } from "./App.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";

// Create Auth
const Auth = {
  authenticated: false,

  signIn: userData => {
    // Send userData to backend API using fetch
    fetch("https://cloud9travel.herokuapp.com/api/auth/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (res.status != 200) {
          // Problem signing in (grabbed from auth error sign in)
          res.json().then(res => {
            Notify.show(res.message);
          });
        } else {
          // Sign in success
          res.json().then(res => {
            // Save the token to local storage
            localStorage.setItem("token", res.token);
            // Set authenticated to true
            Auth.authenticated = true;
            // Set user info in User
            User.firstName = res.user.first_name;
            User.lastName = res.user.last_name;
            User.email = res.user.email;

            // Redirect to the hotels page
            location.hash = "#hotels";

            // Show welcome notification
            Notify.show(`Welcome ${User.firstName}!`);
          });
        }
      })
      .catch(err => {
        console.log(err);
        Notify.show("Problem Signing In");
      });
  },

  check: callback => {
    // Check if jwt token exists in local storage
    if (localStorage.getItem("token")) {
      // Validate token using backend api - make fetch request (GET)
      fetch("https://cloud9travel.herokuapp.com/api/auth/validate", {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          if (res.status != 200) {
            // Token validation failed
            // Set authenticated to false
            Auth.authenticated = false;
            // Remove local token due to being invalid
            localStorage.removeItem("token");
            // Redirect to sign in page
            location.hash = "#signIn";
            Notify.show("Please log in");
            if (typeof callback == "function") {
              callback();
            }
          } else {
            // Token is valid
            res.json().then(res => {
              // console.log("User authorised");
              // console.log(res);
              // Set Auth.authenticated to true
              Auth.authenticated = true;
              // Set user info in User
              User.firstName = res.user.first_name;
              User.lastName = res.user.last_name;
              User.email = res.user.email;
              User.id = res.user._id;

              // Callback
              if (typeof callback == "function") {
                callback();
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          Notify.show("Problem authorising");
          if (typeof callback == "function") {
            callback();
          }
        });
    } else {
      // Redirect to home page
      location.hash = "#";
      if (typeof callback == "function") {
        callback();
      }
    }
  },

  signOut: () => {
    // Remove local token
    localStorage.removeItem("token");
    // Set Auth.authenticated to false
    Auth.authenticated = false;
    // Redirect to home page
    location.hash = "#";
    Notify.show(`See you next time ${User.firstName}!`);
  }
};

export { Auth };
