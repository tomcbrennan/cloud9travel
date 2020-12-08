// Imports
import { App } from "../components/App.js";
import { Hotel } from "../components/Hotel.js";
import { Notify } from "../components/Notify.js";
import { addHotelPageController } from "./addHotel.js";

// Hotels Page Controller
function hotelsPageController() {
  // Code to display the hotels page
  let data = {
    intro: "View your hotels collection here..."
  };

  App.loadPage("Cloud 9 Travel | Hotels", "template-page-hotels", data, () => {
    // Get div #hotels-list
    const hotelsListDiv = document.querySelector("#hotels-list");

    // Get div #hotels-list-filters
    const hotelsListFiltersDiv = document.querySelector("#hotels-list-filters");

    // Render genre buttons
    Hotel.getContinents()
      .then(continents => {
        // Loop through each continent and create a button
        continents.forEach(continent => {
          // Create button
          let continentBtn = document.createElement("button");
          continentBtn.className = "button filter-btn";
          continentBtn.innerText = continent.name;

          // Append continentBtn to #hotels-list-filters div
          hotelsListFiltersDiv.appendChild(continentBtn);

          // Add click event to buttons
          continentBtn.addEventListener("click", () => {
            // Remove is-active from all buttons
            let allContinentBtns = document.querySelectorAll(".filter-btn");
            allContinentBtns.forEach(btn => {
              btn.classList.remove("is-active");
            });

            // Make current button active when clicked
            // Adds a class if active, or removes if not active
            continentBtn.classList.add("is-active");

            // Remove all html in the div (remove elements)
            hotelsListDiv.innerHTML = "";

            // Backend api call - Get hotels only from certain genre
            Hotel.getInContinent(continent._id)
              .then(hotels => {
                // Loop through hotels array
                hotels.forEach(hotel => {
                  const hotelObj = Hotel.createHotelObj(hotel);
                  hotelsListDiv.appendChild(hotelObj.el);
                });
              })
              .catch(err => {
                console.log(err);
                Notify.show("Problem loading hotels");
              });
          });
        });
      })

      .catch(err => {
        console.log(err);
      });

    // Create clear filters button
    let clearFiltersBtn = document.createElement("button");
    clearFiltersBtn.className = "button filter-btn";
    clearFiltersBtn.innerText = "All Continents";
    hotelsListFiltersDiv.appendChild(clearFiltersBtn);

    // Click event listener
    clearFiltersBtn.addEventListener("click", () => {
      // Remove is-active from all buttons
      let allContinentBtns = document.querySelectorAll(".filter-btn");
      allContinentBtns.forEach(btn => {
        btn.classList.remove("is-active");
      });
      hotelsListDiv.innerHTML = "";
      getAllHotels();
    });

    // Get all hotels
    function getAllHotels() {
      Hotel.get()
        .then(hotels => {
          // Loop hotels array
          hotels.forEach(hotel => {
            const hotelObj = Hotel.createHotelObj(hotel);
            hotelsListDiv.appendChild(hotelObj.el);
            hotelsListDiv.style.visibility = "visible";
            document.querySelector("#hotels-title").style.visibility =
              "visible";
          });
        })
        .catch(err => {
          console.log(err);
          Notify.show("Problem getting Hotels");
        });
    }

    // Get all Hotels by default when loaded
    getAllHotels();

    // Go to add hotel page on button click
    const addHoteBtn = document.querySelector("#add-hotel-btn");
    addHoteBtn.addEventListener("click", () => {
      addHotelPageController();
    });

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 20) {
        document.getElementById("main-nav").style.top = "0px";
        // document.getElementById("nav-icons").style.top = "0px";
        document.querySelector(".logo").style.top = "0px";
      } else {
        document.getElementById("main-nav").style.top = "-400px";
        // document.getElementById("nav-icons").style.top = "-400px";
        document.querySelector(".logo").style.top = "-400px";
      }
      prevScrollpos = currentScrollPos;
    };
  });
}

export { hotelsPageController };
