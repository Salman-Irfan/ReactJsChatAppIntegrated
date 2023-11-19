import BASE_URL from '../constants/baseUrl/baseUrl'

export const getSender = (loggedUser, users) => {
    // Ensure that users array is not undefined and has at least two elements
    if (users && users.length >= 2) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    }
    // Handle the case where users array is undefined or doesn't have enough elements
    return "Unknown Sender";
}


export const getSenderFull = (loggedUser, users) => {
    // Ensure that users array is not undefined and has at least two elements
    if (users && users.length >= 2) {
        const otherUser = users[0]._id === loggedUser._id ? users[1] : users[0];

        // Assuming pic is present in the user object
        const picUrl = otherUser.pic
            ? `${BASE_URL}/images/${otherUser.pic}`
            : 'http://localhost:5000/images/default-pic.jpg'; // Replace with a default pic URL if pic is not available

        return {
            ...otherUser,
            pic: picUrl,
        };
    }

    // Handle the case where users array is undefined or doesn't have enough elements
    return {
        name: "Unknown Sender",
        pic: 'http://localhost:5000/images/default-pic.jpg', // Replace with a default pic URL
    };
};
