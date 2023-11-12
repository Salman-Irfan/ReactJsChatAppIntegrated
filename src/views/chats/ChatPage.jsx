import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, Flex } from '@chakra-ui/react';
import SideDrawer from '../../components/miscellaneous/SideDrawer';
import MyChats from '../chats/MyChats';
import ChatBox from '../chats/ChatBox'

const ChatPage = () => {
    const { user } = ChatState();

    return (
        <>
            <div style={{ width: '100%' }}>
                {user && <SideDrawer />}
                <Flex>
                    {user && (
                        <Box flex="1" width="25%">
                            <MyChats  />
                        </Box>
                    )}
                    {user && (
                        <Box flex="3" width="75%">
                            <ChatBox />
                        </Box>
                    )}
                </Flex>
            </div>
        </>
    );
};

export default ChatPage;
