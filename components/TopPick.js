// Imports
import { App } from "./App.js";
import { Modal } from "./Modal.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { featuredPageController } from "../page-controllers/featured.js";

// Create TopPick
const TopPick = {
  get: () => {
    // Return new promise
    return new Promise((resolve, reject) => {
      // Fetch toppicks.json
      fetch("https://cloud9travel.herokuapp.com/api/toppicks")
        .then(res => res.json())

        .then(toppicks => {
          resolve(toppicks);
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
      // Fetch toppicks.json
      let url = new URL("https://cloud9travel.herokuapp.com/api/toppicks");
      let params = { ids: ids };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then(res => res.json())

        .then(toppicks => {
          resolve(toppicks);
        })

        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  createTopPickObj: data => {
    // Create empty object
    const topPickObj = {};

    // Set data from parameter
    topPickObj.data = data;

    // Get template HTML
    topPickObj.template = document.querySelector(
      "#template-top-pick-entry"
    ).innerHTML;

    // Create the element
    topPickObj.el = document.createElement("div");

    // Render
    (topPickObj.render = () => {
      // Set div class name
      topPickObj.el.className = "top-pick-entry";

      // Set top pick id to data:id
      topPickObj.el.setAttribute("id", `hotel-${topPickObj.data._id}`);

      // If top pick is in favourites then add new class
      if (User.favHotels.includes(topPickObj.data._id)) {
        topPickObj.el.classList.add("is-favourite");
      }

      // Render HTML using mustache template
      topPickObj.el.innerHTML = Mustache.render(
        topPickObj.template,
        topPickObj.data
      );

      // Run events()
      topPickObj.events();
    }),
      // Events()
      (topPickObj.events = () => {
        // Get the view-top-pick-btn and show on click
        const viewHotelBtn = topPickObj.el.querySelector(".view-hotel-btn");
        viewHotelBtn.addEventListener("click", () => {
          TopPick.showModal(topPickObj);
        });
      });

    // Run render
    topPickObj.render();

    // Return
    return topPickObj;
  },

  showModal: topPickObj => {
    // Get hotel modal template
    const modalTemplate = document.querySelector("#template-top-pick-modal")
      .innerHTML;

    // Render modalContent with Mustache
    const modalContent = Mustache.render(modalTemplate, topPickObj.data);

    // Show the modal
    Modal.show(modalContent);
  }
};

export { TopPick };
