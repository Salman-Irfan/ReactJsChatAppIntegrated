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

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    )
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    ) {
        return 33;
    } else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    ) {
        return 0;
    } else {
        return 'auto';
    }
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id
}