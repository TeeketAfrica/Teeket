import {
    VStack,
    Text,
} from "@chakra-ui/react";

const GridBg = ({ colouredText, firstSubHeading, secondSubHeading, paragraph }) => {
    return (
        <VStack gap="3" textAlign="center" marginBottom="10">
            <Text
                as="h1"
                fontWeight="semibold"
                fontStyle="italic"
                fontSize={{ base: "3xl", md: "8xl" }}
                lineHeight={{ base: "34px", md: "56px" }}
                bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                bgClip="text"
            >
                {colouredText}{" "}
                <Text
                    as="span"
                    fontStyle="normal"
                    fontSize={{ md: "7xl" }}
                    lineHeight={{ md: "10" }}
                    color="gray.800"
                >
                    {firstSubHeading} <br /> {secondSubHeading}
                </Text>
            </Text>
            <Text
                fontWeight="normal"
                fontSize={{ base: "sm", md: "lg" }}
                lineHeight={{ base: "5", md: "7" }}
                color="gray.600"
                maxWidth="54ch"
                marginX="auto"
            >
                {paragraph}{" "}
            </Text>
        </VStack>
    )
}

export default GridBg