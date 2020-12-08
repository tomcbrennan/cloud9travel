// Imports
import { App } from '../components/App.js';
import { Notify } from '../components/Notify.js';
import { Modal } from '../components/Modal.js';
import { Auth } from '../components/Auth.js';


// Home Page Controller
function homePageController(){
    
    // Code to display on the homepage
    let data = {
        intro: 'Cloud 9 Travel', 
        secondaryContent: 'You may not always be able to travel . . .',
        thirdContent: 'But you can always start planning your next adventure!'
    }

    App.loadPage('Cloud 9 Travel | Home', 'template-page-home', data, () => {
        const homeTitle = document.querySelector('#home-title');

        
    });
}

export { homePageController }