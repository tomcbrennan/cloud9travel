// Imports
import { App } from "./App.js";
import anime from "./../node_modules/animejs/lib/anime.es.js";

// Create Modal
const Modal = {
  showCloseBtn: true,

  show: content => {
    // Create overlayDiv
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "modal-overlay";

    // Append to rootEl
    App.rootEl.appendChild(overlayDiv);

    // Create modalDiv
    let modalDiv = document.createElement("div");
    modalDiv.className = "modal";

    // Create modalContent
    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Insert content
    modalContent.innerHTML = content;

    // Create modalCloseBtn
    let modalCloseBtn = document.createElement("button");
    modalCloseBtn.className = "modal-close-btn";
    modalCloseBtn.innerHTML = '<i class="fa fa-plus"</i>';

    // Append modalContent to modalDiv
    modalDiv.appendChild(modalContent);

    // If closeBtn is TRUE, append modalCloseBtn too
    if (Modal.showCloseBtn === true) {
      modalDiv.appendChild(modalCloseBtn);
    }

    // Append modalDiv to rootEl
    App.rootEl.appendChild(modalDiv);

    // Animate modalDiv entrance using anime.js
    anime({
      targets: overlayDiv,
      keyframes: [
        { opacity: 0, duration: 0 },
        { opacity: 1, duration: 1000 }
      ]
    });

    anime({
      targets: modalDiv,
      keyframes: [
        { opacity: 0, duration: 0 },
        { opacity: 1, duration: 1000 }
      ]
    });

    // Add eventListener to modalCloseBtn
    modalCloseBtn.addEventListener("click", e => {
      Modal.remove();
    });

    // Add esc key press function to trigger Modal.remove()
    Modal.modalEscKey = event => {
      if (event.keyCode == 27) {
        Modal.remove();
      }
    };

    // Listen for esc key press
    document.addEventListener("keydown", Modal.modalEscKey);
  },

  remove: () => {
    // Get overlayDiv
    let overlayDiv = document.querySelector(".modal-overlay");

    // Get modalDiv
    let modalDiv = document.querySelector(".modal");

    // Overlay exit animation

    anime({
      targets: modalDiv,
      opacity: 0,
      duration: 300,
      complete: () => {
        modalDiv.remove();
      }
    });

    // ModalDiv exit animation

    anime({
      targets: overlayDiv,
      opacity: 0,
      duration: 500,
      easing: "linear",
      complete: () => {
        overlayDiv.remove();
      }
    });

    // Stop listening for esc key
    document.removeEventListener("keydown", Modal.modalEscKey);
  }
};

export { Modal };
