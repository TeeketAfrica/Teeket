import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Policies = () => {
    return (
        <HStack spacing={6} fontSize={"sm"} textDecoration={"underline"}>
            <Link to="/terms-of-use">
                Terms of use
            </Link>
            <Link to="/privacy-policy">
                Privacy Policy
            </Link>
            <Link to={"/security-policy"}>
                Security Policy
            </Link>
        </HStack>
    )
}

export default Policies