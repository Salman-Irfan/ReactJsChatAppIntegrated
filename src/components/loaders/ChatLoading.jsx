import { Skeleton, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
    return (
        <>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        </>
    )
}

export default ChatLoading