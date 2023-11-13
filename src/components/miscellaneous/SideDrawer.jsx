import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL, { APIV } from '../../constants/baseUrl/baseUrl';
import endPoints from '../../constants/endPoints/endPoints';
import ChatLoading from '../loaders/ChatLoading';
import UserListItem from '../../views/users/UserListItem';

const SideDrawer = () => {
    // hooks
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const toast = useToast()
    // context api
    const { user } = ChatState();
    // state variables
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState()
    const [loading, setLoading] = useState()
    const [loadingChat, setLoadingChat] = useState()

    // logout handler
    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('authtoken')
        navigate('/')
    }
    // handleUserSearchChange
    const handleUserSearchChange = (e) => {
        // console.log(e.target.value)
        setSearch(e.target.value)

    }

    // user search handler
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "please enter something in search",
                status: 'warning',
                duration: 1500,
                isClosable: true,
                position: 'top-left'
            });
            return
        }
        // api call to search user

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.get(`${BASE_URL}${APIV}${endPoints.GET_ALL_USERS}/?search=${search}`, config)
            console.log(response)
            const { data } = response
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error Occured",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            console.log(error)
        }

        // accessChat
        const accessChat = (userId) => {

        }
    }
    return (
        <>

            <Box
                display="flex"
                justifyContent="space-between"
                bg="gray.900"
                width="100%"
                padding="5px 10px 5px 10px"
            >
                {/* search user button */}
                <Tooltip
                    label="Search Users to Chat"
                    hasArrow
                    placement='bottom-end'
                >
                    <Button
                        variant="ghost"
                        _hover={{ backgroundColor: 'gray' }}
                        onClick={onOpen}
                    >
                        <i className="fa-solid fa-magnifying-glass fa-flip-horizontal" style={{ color: '#818488' }} />
                        <Text display={{ base: 'none', md: 'flex' }} px="4" color="whiteAlpha.600">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                {/* app heading */}
                <Heading bgGradient='linear(to-b, #1a1c20, #0d2834)' px={4} rounded='lg' shadow='lg' h="100%" fontSize='4xl' color='teal.300' >Chat Socket Mernify</Heading>
                {/* user profile menu */}
                <div>
                    <Menu>
                        <MenuButton p={1} color='gray.300' fontSize='2xl' >
                            <BellIcon />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='facebook'>
                            <Avatar
                                size='sm'
                                cursor='pointer'
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>

                        <MenuList>
                            <MenuGroup title='Profile'>
                                <ProfileModal user={user}>
                                    <MenuItem>My Profile</MenuItem>
                                </ProfileModal>
                                <MenuDivider />
                                <MenuItem
                                    bgColor='red.300'
                                    color='whiteAlpha.900'
                                    _hover={{ bg: 'red.700', color: 'red.300' }}
                                    onClick={logoutHandler}
                                >
                                    Logout
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                placement='left'
                onClose={onClose}
                isOpen={isOpen}
                size="xs" // Set the size as needed
            >
                <DrawerOverlay />
                <DrawerContent bg="gray.800"> {/* Set the background color here */}
                    <DrawerCloseButton bg={'whiteAlpha.500'} />
                    <DrawerHeader bg={'whatsapp.300'} color={'whiteAlpha.900'}>Search Users</DrawerHeader>
                    {/* body, input */}
                    <DrawerBody>
                        <Box
                            display={'flex'}
                            pb={2}
                        >
                            <Input
                                placeholder='Search by Name or Email '
                                color={'whiteAlpha.500'}
                                mr={2}
                                value={search}
                                onChange={handleUserSearchChange}
                            />
                            <Button
                                colorScheme='green'
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        {/* search results */}
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map(user => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={()=>accessChat(user._id)}
                                />
                            ))
                        )}
                    </DrawerBody>
                    {/* footer, cancel button */}
                    <DrawerFooter>
                        <Button variant='outline' mr={3} colorScheme='red' onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default SideDrawer