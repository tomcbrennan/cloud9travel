// Imports
import { App } from "../components/App.js";
import { Hotel } from "../components/Hotel.js";
import { Notify } from "../components/Notify.js";
import { TopPick } from "../components/TopPick.js";
import { User } from "../components/User.js";

// Favourites Page Controller
function favouritesPageController() {
  // Code to display on the hotels page
  App.loadPage(
    "Cloud 9 Travel | Favourites",
    "template-page-favourites",
    {},
    () => {
      // Get div #hotels-list
      const favouritesListDiv = document.querySelector("#favourites-list");

      // Check if user has any favourites
      if (User.favHotels.length > 0) {
        // Get all hotels if true
        Hotel.getByIds(User.favHotels)
          .then(hotels => {
            // Loop hotels array
            hotels.forEach(hotel => {
              const hotelObj = Hotel.createHotelObj(hotel);
              favouritesListDiv.appendChild(hotelObj.el);
              favouritesListDiv.style.visibility = "visible";
              document.querySelector("#favourites-title").style.visibility =
                "visible";
            });
          })

          .catch(err => {
            console.log(err);
            Notify.show("Problem getting Hotels");
          });
      } else {
        const favouritesTitleDiv = document.querySelector("#favourites-title");
        favouritesTitleDiv.innerHTML +=
          "No Favourites here! Go to the hotels tab to add your top choices to favourites!";
        document.querySelector("#favourites-list").style.display = "none";
        favouritesTitleDiv.style.visibility = "visible";
        favouritesTitleDiv.style.background = "rgba(0, 0, 0, 0.4)";
        favouritesTitleDiv.style.border = "thin solid white";
        favouritesTitleDiv.style.width = "90%";
        favouritesTitleDiv.style.position = "absolute";
        favouritesTitleDiv.style.top = "50%";
        favouritesTitleDiv.style.left = "50%";
        favouritesTitleDiv.style.transform =
          "translateX(-50%) translateY(-50%)";
      }
    }
  );
}

export { favouritesPageController };
