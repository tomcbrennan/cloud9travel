// Imports
import { App } from "../components/App.js";
import { TopPick } from "../components/TopPick.js";
import { Notify } from "../components/Notify.js";

// Top Picks Page Controller
function featuredPageController() {
  // Code to display the top picks page
  let data = {
    intro: "Check out some of our top picks below..."
  };

  App.loadPage(
    "Cloud 9 Travel | Our Top Picks",
    "template-page-top-picks",
    data,
    () => {
      // Get div #top-picks-list
      const topPicksListDiv = document.querySelector("#top-picks-list");

      // Get all top picks
      function getAllTopPicks() {
        TopPick.get()
          .then(topPicks => {
            // Loop hotels array
            topPicks.forEach(topPick => {
              const topPickObj = TopPick.createTopPickObj(topPick);
              topPicksListDiv.appendChild(topPickObj.el);
              topPicksListDiv.style.visibility = "visible";
              document.querySelector("#hotels-title").style.visibility =
                "visible";
            });
          })
          .catch(err => {
            console.log(err);
            Notify.show("Problem getting top picks");
          });
      }

      // Get all top picks by default when loaded
      getAllTopPicks();
    }
  );
}

export { featuredPageController };
