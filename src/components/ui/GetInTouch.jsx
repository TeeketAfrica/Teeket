import {
    Grid,
    VStack,
    Box,
    Text,
    Link,
} from "@chakra-ui/react";
import MailIcon from "../../assets/icon/MailIcon.svg";
import PhoneIcon from "../../assets/icon/Phone.svg";
import LocationIcon from "../../assets/icon/Location.svg";

import { ContactInfo } from "../../pages/home/config";


const GetInTouch = () => {
    const iconMap = {
        email: <MailIcon />,
        office: <LocationIcon />,
        phone: <PhoneIcon />,
    };
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            alignItems="center"
            width="100%"
            gap="9"
        >
            {ContactInfo.map((data) => (
                <VStack
                    key={data.type}
                    gap={["4", "5"]}
                    maxWidth="360px"
                    marginX="auto"
                >
                    <Box
                        p="12px"
                        backgroundColor="gray.600"
                        border="8px solid"
                        borderColor="gray.400"
                        borderRadius="full"
                    >
                        {iconMap[data.type]}
                    </Box>
                    <VStack gap={["1", "2"]}>
                        <Text
                            color="white"
                            fontWeight="semibold"
                            fontSize={["lg", "xl"]}
                            lineHeight={["7", "30px"]}
                            textTransform="capitalize"
                        >
                            {data.type}
                        </Text>
                        <Text
                            color="#EAECF0"
                            fontWeight="normal"
                            fontSize="md"
                            lineHeight="6"
                        >
                            {data.content}
                        </Text>
                    </VStack>
                    {data.type === "email" ? (
                        <Link
                            href={`mailto:${data.address}`}
                            _hover={{ textDecoration: "none" }}
                            fontWeight="semibold"
                            fontSize="md"
                            lineHeight="6"
                        >
                            {data.address}
                        </Link>
                    ) : (
                        <Text fontWeight="semibold" fontSize="md" lineHeight="6">
                            {data.address}
                        </Text>
                    )}
                </VStack>
            ))}
        </Grid>
    )
}

export default GetInTouch