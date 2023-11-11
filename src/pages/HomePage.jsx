import React from 'react';
import {
    Container,
    Box,
    Text,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stack,
} from '@chakra-ui/react';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';

const HomePage = () => {
    return (
        <Container maxW='container.sm' textAlign='center' mt={20} display='flex' justifyContent='space-between'>
            {/* position on the left half side of screen */}
            <Box flex='1' pr={4}>
                <Box bgGradient='linear(to-b, #1a1c20, #0d2834)' px={20} py={10} rounded='lg' shadow='lg' h="100%">
                    <Heading fontSize='4xl' color='teal.300' mb={6}>Chat Socket Mernify</Heading>
                    <Text color='gray.300' fontSize='xl' mt={4}>
                        Welcome to a world of real-time communication and seamless interaction!
                    </Text>
                </Box>
            </Box>

            {/* position on the right half side of the screen */}
            <Box flex='1' pl={4}>
                <Tabs variant='enclosed' colorScheme='green'>
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;
