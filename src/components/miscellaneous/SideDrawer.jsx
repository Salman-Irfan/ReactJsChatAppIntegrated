import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
    const navigate = useNavigate()
    const { user } = ChatState();
    const [search, setSearch] = useState()
    const [searchResult, setSearchResult] = useState()
    const [loading, setLoading] = useState()
    const [loadingChat, setLoadingChat] = useState()

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('authtoken')
        navigate('/')
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
        </>
    )
}

export default SideDrawer