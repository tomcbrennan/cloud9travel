// Imports
import { App } from "./App.js";
import { Modal } from "./Modal.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { hotelsPageController } from "../page-controllers/hotels.js";

// Create Hotel
const Hotel = {
  get: () => {
    // Return new promise
    return new Promise((resolve, reject) => {
      // Fetch hotels.json
      fetch("https://cloud9travel.herokuapp.com/api/hotels")
        .then(res => res.json())

        .then(hotels => {
          resolve(hotels);
        })

        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  getContinents: () => {
    // Return new Promise
    return new Promise((resolve, reject) => {
      // Fetch continents.json
      fetch("https://cloud9travel.herokuapp.com/api/continents")
        .then(res => res.json())

        .then(continents => {
          resolve(continents);
        })

        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  getByIds: ids => {
    // Return new Promise
    return new Promise((resolve, reject) => {
      // Fetch hotels.json
      let url = new URL("https://cloud9travel.herokuapp.com/api/hotels");
      let params = { ids: ids };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then(res => res.json())

        .then(hotels => {
          resolve(hotels);
        })

        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  getInContinent: continentId => {
    // Return new Promise
    return new Promise((resolve, reject) => {
      // Fetch hotels.json
      let url = new URL("https://cloud9travel.herokuapp.com/api/hotels");
      let params = { continent: continentId };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then(res => res.json())

        .then(hotels => {
          resolve(hotels);
        })

        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  createHotelObj: data => {
    // Create empty object
    const hotelObj = {};

    // Set data from parameter
    hotelObj.data = data;

    // Get template HTML
    hotelObj.template = document.querySelector(
      "#template-hotel-entry"
    ).innerHTML;

    // Create the element
    hotelObj.el = document.createElement("div");

    // Render
    (hotelObj.render = () => {
      // Set div class name
      hotelObj.el.className = "hotel-entry";

      // Set hotel id to data:id
      hotelObj.el.setAttribute("id", `hotel-${hotelObj.data._id}`);

      // If hotel is in favourites then add new class
      if (User.favHotels.includes(hotelObj.data._id)) {
        hotelObj.el.classList.add("is-favourite");
      }

      // Render HTML using mustache template
      hotelObj.el.innerHTML = Mustache.render(hotelObj.template, hotelObj.data);

      // Run events()
      hotelObj.events();
    }),
      // Events()
      (hotelObj.events = () => {
        // Get the view-hotel-btn and show on click
        const viewHotelBtn = hotelObj.el.querySelector(".view-hotel-btn");
        viewHotelBtn.addEventListener("click", () => {
          Hotel.showModal(hotelObj);
        });

        // Delete hotel on delete button click & refresh
        const deleteHotelBtn = hotelObj.el.querySelector(".delete-hotel-btn");
        deleteHotelBtn.addEventListener("click", () => {
          Hotel.delete(hotelObj);
        });
      });

    // Run render
    hotelObj.render();

    // Return
    return hotelObj;
  },

  showModal: hotelObj => {
    // Get hotel modal template
    const modalTemplate = document.querySelector("#template-hotel-modal")
      .innerHTML;

    // Render modalContent with Mustache
    const modalContent = Mustache.render(modalTemplate, hotelObj.data);

    // Show the modal
    Modal.show(modalContent);

    // Check if hotel is in favourites
    if (User.favHotels.includes(hotelObj.data._id)) {
      // Get favBtn
      let favBtn = document.querySelector(".modal .fav-btn");

      // Change btn text to 'remove from favourites'
      favBtn.innerText = "Remove from Favourites";
    }

    // Get favBtn
    const favBtn = document.querySelector(".modal .fav-btn");

    // Click
    favBtn.addEventListener("click", () => {
      // If the hotel is in User.favHotels
      if (User.favHotels.includes(hotelObj.data._id)) {
        // Remove from User.favHotels using User.removeHotelFromFavs()
        User.removeHotelFromFavs(hotelObj.data._id);
        Notify.show(`${hotelObj.data.title} REMOVED to favourites`);
      } else {
        // Add hotel to User.favHotels using User.addHotelToFavs()
        User.addHotelToFavs(hotelObj.data._id);
        Notify.show(`${hotelObj.data.title} ADDED to favourites`);
      }

      // Re-render the hotelObj.el
      hotelObj.render();

      // Close the modal
      Modal.remove();
    });
  },

  create: hotelData => {
    // Send hotelData to backend API using fetch - POST
    fetch("https://cloud9travel.herokuapp.com/api/hotels", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotelData)
    })
      .then(res => {
        if (res.status != 201) {
          // Problem creating hotel
          Notify.show("Problem creating hotel");
        } else {
          // Hotel created successfully!
          Notify.show("Hotel created");
        }
      })
      .catch(err => {
        console.log(err);
        Notify.show("Problem creating hotel");
      });
  },

  delete: hotelObj => {
    // Fetch hotelData from backend API using fetch - DELETE
    fetch(
      "https://cloud9travel.herokuapp.com/api/hotels/" + hotelObj.data._id,
      {
        method: "delete"
      }
    )
      .then(res => {
        if (res.status != 200) {
          // Problem deleting hotel
          Notify.show("Problem deleting hotel");
        } else {
          // Hotel deleted successfully!
          alert("Hotel Deleted!");
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
        Notify.show("Problem deleting hotel");
      });
  }
};

export { Hotel };
