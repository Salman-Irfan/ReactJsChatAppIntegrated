export const getSender = (loggedUser, users) => {
    // Ensure that users array is not undefined and has at least two elements
    if (users && users.length >= 2) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    }
    // Handle the case where users array is undefined or doesn't have enough elements
    return "Unknown Sender";
}
