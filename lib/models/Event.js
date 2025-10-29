class Event {
    eventID;
    eventTitle;
    description;
    startTime;
    endTime;
    location;

    constructor(eventID, eventTitle, description, startTime, endTime, location) {
        this.eventID = eventID;
        this.eventTitle = eventTitle;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }

    sendReminder() {}
}

module.exports = Event;