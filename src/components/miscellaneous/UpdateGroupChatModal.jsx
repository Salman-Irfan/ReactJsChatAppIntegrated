import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../../components/miscellaneous/UserBadgeItem'
import BASE_URL, { APIV } from '../../constants/baseUrl/baseUrl'
import endPoints from '../../constants/endPoints/endPoints'
import axios from 'axios'
import UserListItem from '../../views/users/UserListItem'
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    // context menu
    const { selectedChat, setSelectedChat, user } = ChatState()
    // hooks
    const { isOpen, onOpen, onClose } = useDisclosure()
    // state variables
    const [groupChatName, setGroupChatName] = useState('')
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    // toast
    const toast = useToast()
    // functions
    const handleRemove = async (user1) => {
        // only admin can add users to group
        console.log(selectedChat.groupAdmin._id)
        console.log(selectedChat.groupAdmin._id)
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can remove users to group",
                description: "You do not have permission to add users to the group.",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            return;
        }
        try {
            setLoading(true);
            // config
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.put(`${BASE_URL}${APIV}${endPoints.REMOVE_FROM_GROUP}`, {
                chatId: selectedChat._id,
                userId: user1._id,
            },
                config
            )
            const { data } = response
            user1._id === user._id ? setSelectedChat() : (
                setSelectedChat(data)
            )
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error while deleting the user from the group",
                description: "Can't delete the user.",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom'
            });
            console.log(error)
        }
    }
    // handleRename
    const handleRename = async () => {
        if (!groupChatName) {
            return
        }
        try {
            setRenameLoading(true)
            // config
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.put(`${BASE_URL}${APIV}${endPoints.RENAME_GROUP}`, {
                chatId: selectedChat._id,
                chatName: groupChatName,
            },
                config
            )
            const { data } = response

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "Error while renaming the group ",
                description: error.message,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            console.log(error)
        }
    }
    // handleAddUser
    const handleAddUser = async (user1) => {
        // if user already in the group
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already in group",
                description: "User is already a member of the group.",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: 'top'
            });
            return;
        }
        // only admin can add users to group
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can add users to group",
                description: "You do not have permission to add users to the group.",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left'
            });
            return;
        }
        // api call
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const response = await axios.put(`${BASE_URL}${APIV}${endPoints.ADD_TO_GROUP}`, {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config);
            const { data } = response;
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error while adding user",
                description: error.message,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom'
            });
            console.log(error);
        }
    };

    // handleSearch
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
    return (
        <>
            <IconButton onClick={onOpen} icon={<ViewIcon />} marginLeft={'2%'} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            w={'100%'}
                            display={'flex'}
                            flexWrap={'wrap'}
                            pb={3}
                        >
                            {
                                selectedChat.users.map((u) => (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleRemove(u)}
                                    />
                                ))
                            }
                        </Box>
                        {/* rename and update */}
                        <FormControl
                            display={'flex'}
                        >
                            <Input
                                placeholder='Group Chat Name'
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            {/* rename button */}
                            <Button
                                variant={'solid'}
                                colorScheme='green'
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        {/* add users to group */}
                        <FormControl>
                            <Input
                                placeholder='Add User to group'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {/* searched users for add in group */}
                        {
                            loading ? (
                                <Spinner
                                    size={'lg'}
                                />
                            ) : (
                                searchResult?.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleAddUser(user)}
                                    />
                                ))
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={() => handleRemove(user)}
                            colorScheme='red'
                        >
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal