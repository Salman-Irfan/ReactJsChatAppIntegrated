import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            px={2}
            py={1}
            borderRadius='lg'
            m={1}
            mb={2}
            fontSize={12}
            backgroundColor='orange.300'
            color='gray.900'
            cursor='pointer'
            onClick={handleFunction}
            display='flex' // Added this for better flex behavior
            alignItems='center' // Added this for better vertical alignment
        >
            <span>{user.name}</span>
            <CloseIcon
                pl={1}
                color='red.500'
            />
        </Box>
    )
}

export default UserBadgeItem
