class Group {
    groupID;
    groupName;
    groupDescription;

    constructor(groupID, groupName, groupDescription) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.groupDescription = groupDescription;
    }

    displayName() {
        return this.groupName;
    }
}

module.exports = Group;