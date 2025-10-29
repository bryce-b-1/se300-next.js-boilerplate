class Announcement {
    announcementID;
    announcementTitle;
    description;
    postDate;

    constructor(announcementID, announcementTitle, description, postDate) {
        this.announcementID = announcementID;
        this.announcementTitle = announcementTitle;
        this.description = description;
        this.postDate = postDate;
    }

    deleteAnnouncement() {}

    sendReminder() {}

    editAnnouncement() {}
}

module.exports = Announcement;