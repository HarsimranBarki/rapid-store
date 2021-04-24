import { Box, HStack, Text } from '@chakra-ui/layout'
import React from 'react'

function Footer() {
    return (
        <Box bg='gray.100' textColor='teal.800' padding={10}>
            <HStack justifyContent='center' fontSize='lg' spacing={10} mb={5}>
                    <Text cursor='pointer'>Home</Text>
                    <Text cursor='pointer'>About</Text>
                    <Text cursor='pointer'>Shop</Text>
                    <Text cursor='pointer'>Jobs</Text>
                    <Text cursor='pointer'>Partners</Text>
            </HStack>
        <Text textAlign='center'>&#169; 2021 Radid Store Inc. All rights reserved</Text>
        </Box>
    )
}

export default Footer
