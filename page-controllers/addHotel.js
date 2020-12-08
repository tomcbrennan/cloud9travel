// Imports
import { App } from '../components/App.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';
import { Hotel } from '../components/Hotel.js';
import { hotelsPageController } from './hotels.js';


// Add Hotel Page Controller
function addHotelPageController(){
    App.loadPage('Add Hotel', 'template-page-add-hotel', {}, () => {
        
        // Get the sign up form
        let addHotelForm = document.querySelector('#form-add-hotel');

        // Submit event
        addHotelForm.addEventListener('submit', (e) => {
            
            // Prevent form from loading a new page
            e.preventDefault();

            // Create formData object
            let formData = new FormData(addHotelForm);
            
            // Create empty object
            let formDataObj = {};

            // Loop through formData entries
            for(let field of formData.entries()){                
                formDataObj[field[0]] = field[1];
            }            
            // Create Hotel
            Hotel.create(formDataObj);
        });

        // Return to hotels on back button click
        const backBtn = document.querySelector('.add-hotel-back-btn');
        backBtn.addEventListener('click', () => {
            hotelsPageController();
        });
    });
}

export { addHotelPageController }