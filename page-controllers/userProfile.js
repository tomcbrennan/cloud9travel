// Imports
import { App } from './../components/App.js';
import { Auth } from './../components/Auth.js';
import { User } from '../components/User.js';
import { Notify } from '../components/Notify.js';


// User Profile Page Controller
function userProfilePageController(){
    let data = {
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email
    }
    App.loadPage('Cloud 9 Travel | Profile', 'template-page-user-profile', data, () => {
        
        // Sign out user on sign out button click
        const signOutBtn = document.querySelector('.sign-out-btn');
        signOutBtn.addEventListener('click', () => {
            Auth.signOut();
        });     

        // Delete user account on delete acount button click
        const deleteUserBtn = document.querySelector('.delete-user-btn');
        deleteUserBtn.addEventListener('click', () => {
            User.delete(User);
        });
    });
}

export { userProfilePageController }