import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';
import BASE_URL, { APIV } from '../../constants/baseUrl/baseUrl.js'
import endPoints from '../../constants/endPoints/endPoints';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from '../../components/loaders/ChatLoading.jsx';
import { getSender } from '../../config/ChatLogics.js';
import GroupChatModal from '../../components/miscellaneous/GroupChatModal.jsx';

const MyChats = ({ fetchAgain }) => {
    // context api
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    // state variables
    const [loggedUser, setLoggedUser] = useState();
    // toast
    const toast = useToast();
    // api call to fetch chats
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.get(`${BASE_URL}${APIV}${endPoints.FETCH_CHAT}`, config)
            const { data } = response
            setChats(data)
        } catch (error) {
            toast({
                title: "Error Occurred while fetching chat",
                description: error.message,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            console.log(error)
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
        fetchChats()
    }, [fetchAgain])

    return (
        <>
            {/* available chats */}
            <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                p={3}
                w="100%"
                borderRadius="lg"
                borderWidth="1px"
                bgGradient="linear(to-b, #1a1c20, #0d2834)" // Gradient effect
                color="white"
                height="100vh" // Set a fixed height for the sidebar
                overflowY="auto" // Make the sidebar scrollable
            >
                {/* chat header */}
                <Box
                    pb={3}
                    px={3}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #4a5568" // Border color
                >
                    <Text fontSize="2xl" fontWeight="bold">
                        My Chats
                    </Text>
                    {/* create group button  */}
                    <GroupChatModal>
                        <Button
                            display="flex"
                            rightIcon={<AddIcon />}
                            bg="#38b2ac" // Button background color
                            _hover={{ bg: '#319795' }} // Hover effect
                        >
                            New Group Chat
                        </Button>
                    </GroupChatModal>
                </Box>

                {/* render chat users here */}
                <Box
                    display={'flex'}
                    flexDir={'column'}
                    p={3}
                    w={'100%'}
                    borderRadius={'lg'}
                >
                    {chats ? (
                        <Stack>
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor={'pointer'}
                                    bgColor={selectedChat === chat ? '#38b2ac' : ''}
                                    color={selectedChat === chat ? 'whiteSmoke' : 'whiteAlpha.500'}
                                    px={3}
                                    py={2}
                                    borderRadius={'lg'}
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupChat ? (
                                            getSender(loggedUser, chat.users)
                                        ) : (
                                            chat.chatName
                                        )}
                                    </Text>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <ChatLoading />
                    )}
                </Box>
            </Box>
        </>
    )
}

export default MyChats;
