const User = require('./User'); // Import the parent class
const Leader = require('./Leader');

const Announcement = require('./Announcement');
const Poll = require('./Poll');
const Event = require('./Event');

class Member extends User 
{
    constructor(userID, email, passwordHash)
    {
        super(userID, email, passwordHash);
    }

    //METHODS for Members

    // Right now, Members cannot access the announcement ATTRIBUTES directly. (announcementTlitle)
    viewAnnouncement(announcement) 
    {
        console.log('Member' + this.userID + 'is viewing announcement' + announcement.announcementTitle + '.');
        // DB logic to fetch and display an announcement
    }

    viewCalendar(CalendarID)
    {
        /*
        *  Some API call to be able to connect Outlook or Goodle Calendars
        */
    }


    // Right now, Members cannot access the poll ATTRIBUTES directly. (question)
    voteForPoll(poll, option) 
    {
        console.log('Member' + this.userID + 'is voting for' + option + 'in poll' + poll.question + '.');
        // DB logic to record the vote
    }
  
  
}

module.exports = Member;