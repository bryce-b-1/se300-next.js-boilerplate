const User = require('./User'); // Import the parent class

const Event = require('./Event');
const Announcement = require('./Announcement');
const Poll = require('./Poll');

class Leader extends User 
{

    constructor(userID, email, passwordHash) 
    {
        //super() calls the constructor of the parent class (User)
        super(userID, email, passwordHash);
    }

    //METHODS for Leaders

    addMember(memberID) 
    {
        console.log('Leader ' + this.userID + ' is adding member ' + memberID + '.');
        //MongoDB logic to add a member to a group
    }

    removeMember(memberID)
    {
        console.log('Leader ' + this.userID + ' is removing member ' + memberID + '.');
        //MongoDB logic to remove a member from a group
    }

    createEvent(eventDetails) 
    {
        const newEvent = new Event(eventDetails.eventID, eventDetails.eventTitle, eventDetails.description, 
                                    eventDetails.startTime, eventDetails.endTime, eventDetails.location);
        console.log('Leader ' + this.userID + 'is creating an event: ' + newEvent.eventTitle + '.');
        //MongoDB logic to create a new event

        return newEvent;
    }

    deleteEvent(event)
    {
        console.log('Leader ' + this.userID + ' is deleting event ' + event.eventTitle + '.');
        //MongoDB logic for removing event
    }

    createAnnouncement(announcementDetails) 
    {
        const newAnnouncement = new Announcement(announcementDetails.announcementID, announcementDetails.announcementTitle, 
                                                    announcementDetails.description, announcementDetails.postDate);
        console.log('Leader ' + this.userID + ' is creating an announcement titled: ' + newAnouncementDetails.announcementTitle + '.');
        //MongoDB logic for creating annuncements
        return newAnnouncement;
    }

    deleteAnnouncement(announcement)
    {
        console.log('Leader ' + this.userID + ' is deleting announcement ' + announcement.announcementTitle + '.');
        //MongoDB logic for deleting an announcement
    }

    createPoll(pollDetails)
    {
        const newPoll = new Poll(pollDetails.pollId, pollDetails.question, pollDetails.options, 
                                    pollDetails.postDate, pollDetails.closingDate);
        console.log('Leader ' + this.userID + ' is creating a poll titled: ' + newPoll.question + '.');
        //MongoDB logic for creating a poll
        return newPoll;
    }

    deletePoll(poll)
    {
        console.log('Leader ' + this.userID + ' is deleting poll ' + poll.question + '.');
        //MongoDB logic
    }
  
}

module.exports = Leader;


