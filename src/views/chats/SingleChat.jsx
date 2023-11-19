import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Text } from '@chakra-ui/react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import ProfileModal from '../../components/miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../../components/miscellaneous/UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    // context api
    const { user, selectedChat, setSelectedChat } = ChatState()

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
                            overflow={'hidden'}
                        >

                        </Box>
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