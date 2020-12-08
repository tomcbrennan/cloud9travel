// Imports
import { App } from '../components/App.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';

// Sign Up Page Controller
function signUpPageController() {
    App.loadPage('Sign Up', 'template-page-sign-up', {}, () => {
        
        // Get the sign up form
        let signUpForm = document.querySelector('#form-sign-up');

        // Listen for the submit event
        signUpForm.addEventListener('submit', (e) => {
            // Prevent the form from loading a new page
            e.preventDefault();
            
            // Create formData object
            let formData = new FormData(signUpForm);

            // Create empty object 
            let formDataObj = {};

            // Loop through formData entries
            for(let field of formData.entries()){
                
                // Create new property for empty object (eg. first_name = john)
                formDataObj[field[0]] = field[1];
            }

            // Send the form data object to User.create()
            User.create(formDataObj);
        });
        
    });
}

export { signUpPageController }