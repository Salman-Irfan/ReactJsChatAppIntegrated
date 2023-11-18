import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    // context api
    const { user, selectedChat, setSelectedChat } = ChatState()

    return (
        <>
            {
                selectedChat ? (
                    <>asd</>
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