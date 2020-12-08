// Imports
import { App } from '../components/App.js';
import { Auth } from '../components/Auth.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';


// Sign In Page Controller
function signInPageController() {
    App.loadPage('Sign In', 'template-page-sign-in', {}, () => {
        
        // Get the sign in form
        let signInForm = document.querySelector('#form-sign-in');

        // Listen for the submit event
        signInForm.addEventListener('submit', (e) => {
            // Prevent the form from loading a new page
            e.preventDefault();
            
            // Create formData object
            let formData = new FormData(signInForm);

            // Create empty object 
            let formDataObj = {};

            // Loop through formData entries
            for(let field of formData.entries()){
                
                // Create new property for empty object (eg. first_name = john)
                formDataObj[field[0]] = field[1];
            }

            // Send the form data object to Auth.signIn
            Auth.signIn(formDataObj);
        });
        
    });
}

export { signInPageController }