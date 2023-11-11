import { Box, Text, Input, Stack, Button, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        try {

            const response = await axios.post('http://localhost:5000/api/v1/login', {
                email: email,
                password: password
            });
            if(response.data.authtoken){
                localStorage.setItem('authtoken', response.data.authtoken);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));

                toast({
                    title: 'Login Successful',
                    description: 'Redirecting to Chat Page.',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Box bg="teal.700" rounded="md" p={6} w="300px">
                <Stack spacing={3}>
                    <Text color="white" fontSize="xl" fontWeight="bold" mb={3}>
                        Login
                    </Text>
                    <Input
                        placeholder="Email"
                        type="email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Adding the required attribute
                    />
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            variant="filled"
                            pr="4.5rem"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required // Adding the required attribute
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handlePasswordVisibility}
                                color="blue.800"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button colorScheme="teal" size="md" width="100%" type="submit">
                        Log In
                    </Button>
                </Stack>
            </Box>
        </form>
    );
};

export default Login;
