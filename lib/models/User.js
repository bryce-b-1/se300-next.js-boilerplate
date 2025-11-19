import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/db-models/UserModel';
import Group from './Group';
import mongoose from 'mongoose';


//This is an interface class for Members and Leaders
class User 
{
    //Private attributes
    #userID;
    #email;
    #passwordHash;

    constructor(userID, email, passwordHash) 
    {
        this.#userID = userID;
        this.#email = email;
        this.#passwordHash = passwordHash;
    }

    //GETTERS for private attributes
    get userID() 
    {
        return this.#userID;
    }

    get email() 
    {
        return this.#email;
    }


    /*
    *
    * PASSWORD HASH does not get a GETTER because of security
    *
    */


    logout() 
    {
        console.log(this.#email + ' has logged out.');
        //Logic for destroying the session/token
    }

    updateProfile(newData) 
    {
        console.log('Updating profile for ' + this.#email + '.');
        // Example of updating the private email field
        if (newData.email) 
        {
            this.#email = newData.email;
        }
    }

    createGroup(groupDetails) 
    {
        const newGroup = new Group(groupDetails.GroupID, groupDetails.GroupName, groupDetails.GroupDescription);
        console.log('User ' + this.#userID + ' is creating group: ' + newGroup.GroupName + '.');

        return newGroup;
    }

    deleteGroup(group)
    {
        console.log('User ' + this.#userID + ' is deleting group: ' + group.GroupName + '.');
        //MongoDB logic to delete a group
    }
}

export default User;