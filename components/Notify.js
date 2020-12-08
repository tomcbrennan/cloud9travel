//Imports
import anime from "./../node_modules/animejs/lib/anime.es.js";

// Create notify
const Notify = {
  showDuration: 3000,
  container: null,

  init: () => {
    //create div
    Notify.container = document.createElement("div");

    //set id to notifications
    Notify.container.setAttribute("id", "notifications");

    //append container to <body>
    document.body.appendChild(Notify.container);
  },

  show: message => {
    // Create notificationEntryDiv and set class
    const notificationEntryDiv = document.createElement("div");
    notificationEntryDiv.className = "notification-entry";

    //set innerHTML to content message
    notificationEntryDiv.innerHTML = message;

    //Append notificationEntryDiv to container div
    Notify.container.appendChild(notificationEntryDiv);

    //Animation way
    anime({
      targets: notificationEntryDiv,
      keyframes: [
        { opacity: 0, translateY: "50px", duration: 0 },
        {
          opacity: 1,
          translateY: "0px",
          duration: 1000,
          endDelay: Notify.showDuration
        },
        { opacity: 0, translateY: "50px", duration: 1500 }
      ],

      complete: () => {
        notificationEntryDiv.remove();
      }
    });
  }
};

export { Notify };
