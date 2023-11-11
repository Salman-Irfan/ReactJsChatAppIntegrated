import { useState } from 'react';
import { Box, Text, Input, Stack, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        if (password === confirmPassword) {
            setPasswordsMatch(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('pic', pic);

            try {
                const response = await axios.post('http://localhost:5000/api/v1/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data)
                // Check if the registration was successful, then show a success message
                if (response.data.message === 'User registered successfully') {
                    toast({
                        title: 'Registration Successful',
                        description: 'Login to Continue.',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                }
                // if user already exists
                if (response.data.error === 'User with this email already exists') {
                    toast({
                        title: 'User with this email already exists',
                        description: 'Login to Continue.',
                        status: 'error',
                        duration: 1500,
                        isClosable: true,
                    });

                }
            } catch (error) {
                console.error(error.message);
            }
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <Box bg="teal.700" rounded="md" p={6} w="300px">
                <Stack spacing={3}>
                    <Text color="white" fontSize="xl" fontWeight="bold" mb={3}>
                        Register
                    </Text>
                    <Input
                        name='name'
                        placeholder="Full Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required // Adding the required attribute
                    />
                    <Input
                        name='email'
                        placeholder="Email"
                        type="email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Adding the required attribute
                    />
                    <InputGroup>
                        <Input
                            name='password'
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
                    <InputGroup>
                        <Input
                            name='confirmPassword'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            variant="filled"
                            pr="4.5rem"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {!passwordsMatch && (
                        <Text color="red.400" fontSize="sm">
                            Passwords do not match.
                        </Text>
                    )}
                    <Input
                        name='pic'
                        type="file"
                        placeholder="Profile Image"
                        accept='image/*'
                        onChange={(e) => setPic(e.target.files[0])}
                    />
                    <Button colorScheme="teal" size="md" width="100%" type="submit">
                        Sign Up
                    </Button>
                </Stack>
            </Box>
        </form>
    );
};

export default Register;
