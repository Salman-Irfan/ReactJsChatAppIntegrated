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

const HomePage = () => {
    return (
        <>
            <Container maxW='container.sm' textAlign='center' mt={20}>
                {/* header / chat socket mernify */}
                <Stack
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: 4, lg: 8 }}
                    align='center'
                    justify='center'
                >
                    <Box bgGradient='linear(to-b, #1a1c20, #0d2834)' p={10} rounded='lg' shadow='lg'>
                        <Heading fontSize='4xl' color='teal.300' mb={6}>
                            Chat Socket Mernify
                        </Heading>
                        <Text color='gray.300' fontSize='xl' mt={4}>
                            Welcome to a world of real-time communication and seamless interaction!
                        </Text>
                    </Box>
                    <Box>

                        <Tabs variant='soft-rounded' colorScheme='green'>
                            <TabList>
                                <Tab>Login</Tab>
                                <Tab>Sign Up</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <p>Login Component</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>Sign Up Component</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Stack>
            </Container>
        </>
    );
};

export default HomePage;
