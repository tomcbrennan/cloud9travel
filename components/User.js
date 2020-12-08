// Imports
import { App } from "./App.js";
import { Auth } from "./Auth.js";
import { Notify } from "./Notify.js";

// Create User
const User = {
  firstName: null,
  lastName: null,
  email: null,
  lastLogin: null,
  favHotels: [],

  create: userData => {
    // Send new user data to backend api using fetch - POST
    fetch("https://cloud9travel.herokuapp.com/api/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },

      // Convert the javascript userData from signUp into json
      body: JSON.stringify(userData)
    })
      .then(res => {
        // Expecting a 201 (created successfully), so check if it is not a 201
        if (res.status != 201) {
          // Problem creating user
          Notify.show("Problem creating user");
        } else {
          // User created successfully
          Notify.show("User account created");

          // Redirect user to the sign in page #signIn
          location.hash = "#signIn";
          Notify.show("Please Sign In");
        }
      })
      .catch(err => {
        console.log(err);
        Notify.show("Problem creating user");
      });
  },

  delete: User => {
    // Fetch userData from backend API using fetch - DELETE
    fetch("https://cloud9travel.herokuapp.com/api/users/" + User.id, {
      method: "delete"
    })
      .then(res => {
        if (res.status != 200) {
          // Problem deleting user
          Notify.show("Problem deleting user");
          Notify.show("Try refreshing the page and pressing delete again");
        } else {
          // User deleted successfully!
          Notify.show("User deleted");
          Notify.show("Features are deactivated, please sign out");
        }
      })
      .catch(err => {
        console.log(err);
        Notify.show("Problem deleting user");
      });
  },

  addHotelToFavs: id => {
    // Add the id into User.favHotels
    User.favHotels.push(id);
  },

  removeHotelFromFavs: id => {
    // Get index of the id in the User.favHotels
    const index = User.favHotels.indexOf(id);
    if (index > -1) {
      User.favHotels.splice(index, 1);
    }
  }
};

export { User };
