import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import BASE_URL, { APIV } from '../../constants/baseUrl/baseUrl'
import endPoints from '../../constants/endPoints/endPoints'
import UserListItem from '../../views/users/UserListItem'
import UserBadgeItem from './UserBadgeItem'
const GroupChatModal = ({ children }) => {
    // context api
    const { user, chats, setChats } = ChatState()
    // hooks
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    // state variables
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    // functions
    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            // console.log(config)
            const response = await axios.get(`${BASE_URL}${APIV}${endPoints.GET_ALL_USERS}/?search=${search}`, config)
            const { data } = response

            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error while fetching the user ",
                description: error.message,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            console.log(error)
        }
    }
    // submit
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 1500,
                isClosable: true,
                position: 'top'
            });
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.post(`${BASE_URL}${APIV}${endPoints.CREATE_GROUP}`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id))
                },
                config
            )
            const { data } = response
            setChats([data, ...chats])
            onClose()
            if (data) {
                toast({
                    title: 'New Group Chat created',
                    status: 'warning',
                    duration: 1500,
                    isClosable: true,
                    position: 'top'
                })
            }
        } catch (error) {
            toast({
                title: 'Failed to create a new group chat',
                status: 'warning',
                duration: 1500,
                isClosable: true,
                position: 'top'
            })
            console.log(error.message)
        }
    }
    // handleGroup
    const handleGroup = (userToAdd) => {
        // if user is already added
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'User already added',
                status: 'warning',
                duration: 1500,
                isClosable: true,
                position: 'top'
            });
            return
        }
        // add user to selected Users
        setSelectedUsers([...selectedUsers, userToAdd])
    };
    // handleDelete
    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => {
                return sel._id !== delUser._id
            })
        )
    };
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={35}
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    {/* body */}
                    <ModalBody
                        display={'flex'}
                        flexDir={'column'}
                        alignItems={'center'}
                    >
                        {/* group name */}
                        <FormControl>
                            <Input
                                placeholder='Group Chat Name'
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        {/* add users */}
                        <FormControl>
                            <Input
                                placeholder='Add Users'
                                mb={3}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {/* render selected users here */}
                        <Box
                            w={'100%'}
                            display={'flex'}
                            flexWrap={'wrap'}
                        >
                            {
                                selectedUsers.map((u) => (
                                    <UserBadgeItem
                                        key={user._id}
                                        user={u}
                                        handleFunction={() => handleDelete(u)}
                                    />
                                ))
                            }
                        </Box>
                        {/* render searched users */}
                        {
                            loading ? (
                                <div><Spinner /></div>
                            ) : (
                                searchResult
                                    // ?.slice(0, 4)
                                    .map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                    ))
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal