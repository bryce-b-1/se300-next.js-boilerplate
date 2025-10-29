class Poll {
    pollID;
    question;
    options;
    postDate;
    closingDate;

    constructor(pollID, question, options, postDate, closingDate) {
        this.pollId = pollId;
        this.question = question;
        this.options = options;
        this.postDate = postDate;
        this.closingDate = closingDate;
    }

    submitVote() {}

    closePoll() {}

    getResults() {}
}

module.exports = Poll;