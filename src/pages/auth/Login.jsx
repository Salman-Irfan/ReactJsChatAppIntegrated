import { Box, Text, Input, Stack, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box bg="teal.700" rounded="md" p={6} w="300px">
            <Stack spacing={3}>
                <Text color="white" fontSize="xl" fontWeight="bold" mb={3}>
                    Login
                </Text>
                <Input placeholder="Email" type="email" variant="filled" />
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        variant="filled"
                        pr="4.5rem"
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handlePasswordVisibility}
                            color="blue.800" // Adjust the color here
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button colorScheme="teal" size="md" width="100%">
                    Log In
                </Button>
            </Stack>
        </Box>
    );
};

export default Login;
