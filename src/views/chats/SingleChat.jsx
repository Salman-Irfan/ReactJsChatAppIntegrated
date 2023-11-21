import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import ProfileModal from '../../components/miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../../components/miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import BASE_URL, { APIV } from '../../constants/baseUrl/baseUrl'
import endPoints from '../../constants/endPoints/endPoints'
import '../../styles/messages.css'
import ScrollableChat from './ScrollableChat'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    // context api
    const { user, selectedChat, setSelectedChat } = ChatState()
    // state variables
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    // hooks
    const toast = useToast()
    // functions
    const fetchMessages = async () => {
        if (!selectedChat) {
            return
        }
        try {
            // config
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setLoading(true)
            // api call
            const response = await axios.get(`${BASE_URL}${APIV}${endPoints.FETCH_MESSAGES}/${selectedChat._id}`, config)
            const { data } = response
            
            // updating the state
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error while fetching the chats",
                description: "Can't fetched the chat.",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom'
            });
            console.log(error.message)
        }
    }
    // call fetchMessages function inside use effect
    useEffect(() => {
        fetchMessages()
    }, [selectedChat])

    // sendMessage
    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            try {
                // config
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
                // api call
                const response = await axios.post(`${BASE_URL}${APIV}${endPoints.SEND_MESSAGE}`, {
                    content: newMessage,
                    chatId: selectedChat._id
                },
                    config
                )
                const { data } = response
                // set new message to empty
                setNewMessage('')
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error while sending the message",
                    description: "Message can't be send.",
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: 'bottom'
                });
                console.log(error)
            }
        }
    }
    // typingHandler
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        // typing indicator logic here
    }
    return (
        <>
            {
                selectedChat ? (
                    // style this text component of chakra UI as CHat User or Group name Header
                    <>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color="teal.500"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            mb={4}
                        >
                            {
                                !selectedChat.isGroupChat ? (
                                    <>
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                        >
                                            {getSender(user, selectedChat.users)}
                                            <ProfileModal
                                                user={getSenderFull(user, selectedChat.users)}
                                            />
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        {/* update group chat modal */}

                                        <UpdateGroupChatModal
                                            fetchAgain={fetchAgain}
                                            setFetchAgain={setFetchAgain}
                                            fetchMessages={fetchMessages}
                                        />

                                    </>
                                )
                            }
                        </Text>
                        {/* chat display box */}
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            p={3}
                            bg={'#E8E8E8'}
                            w={'100%'}
                            h={'70vh'}
                            borderRadius={'lg'}
                            overflowY={'hidden'}
                        >
                            {/* messages here */}
                            {loading ? (
                                <Spinner
                                    size={'xl'}
                                    color='blue.300'
                                    alignSelf={'center'}
                                    margin={'auto'}
                                />
                            ) : (
                                <div>
                                    {/* messages */}
                                    <div className="messages">
                                        <ScrollableChat messages={messages} />
                                    </div>
                                </div>
                            )}
                            {/* message input */}
                        </Box>
                        <FormControl
                            onKeyDown={sendMessage}
                            isRequired
                            mt={3}
                        >
                            <Input
                                placeholder='Press Enter to send message'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </>
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="300px"
                        width="70%"
                        mx="auto"
                        mt={"13%"}
                        bgGradient="linear(to-r, teal.500, blue.500)"
                        color="white"
                        borderRadius="md"
                        textAlign="center"
                        fontSize="xl"
                        fontWeight="bold"
                        textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
                        boxShadow="lg"
                        p={6}
                    >
                        Click on a user or a group to start a chat
                    </Box>
                )
            }
        </>
    )
}

export default SingleChat