import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import EventBg from "../../../assets/img/eventsBg.png";
import DownIcon from "../../../assets/icon/DownIcon";
import SearchWhite from "../../../assets/icon/SearchWhite";

const HeroSection = () => {
  return (
    <section>
      <Box>
        <Container>
          <Box px={109}>
            <Box
              bgImage={`url(${EventBg})`}
              bgSize="cover"
              bgPosition="bottom center"
              h="425px"
              w="100%"
            >
              <Box h="full" maxW="692px" w="full" mx="auto">
                <Center h="full" w="full">
                  <VStack w="full" spacing={8}>
                    <Box maxW="519px" w="full" mx="auto">
                      <Heading
                        fontSize={56}
                        fontWeight={700}
                        textAlign="center"
                      >
                        Browse
                        <Text
                          as="span"
                          fontStyle="italic"
                          bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                          bgClip="text"
                        >
                          {" "}
                          events{" "}
                        </Text>
                        curated for you
                      </Heading>
                    </Box>
                    <Box maxW="692px" w="full">
                      <HStack
                        w="full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          maxW="545px"
                          w="full"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="12px"
                          bgColor="gray.100"
                        >
                          <HStack spacing={3} p={2}>
                            <Input
                              placeholder="Search for an event or location"
                              border="none"
                              outline="none"
                              w={319}
                              style={{ boxShadow: "none" }}
                            />
                            <Center height="34px">
                              <Divider
                                borderColor="gray.300"
                                orientation="vertical"
                              />
                            </Center>
                            <Menu w="full">
                              <MenuButton
                                as={Button}
                                rightIcon={<DownIcon />}
                                color="gray.400"
                                fontWeight={400}
                                variant="link"
                                _hover={{ bg: "transparent" }}
                              >
                                Choose category
                              </MenuButton>
                              <MenuList>
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                        </Box>
                        <Button
                          leftIcon={<SearchWhite />}
                          variant="primary"
                          style={{ height: "56px" }}
                        >
                          Search
                        </Button>
                      </HStack>
                    </Box>
                  </VStack>
                </Center>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default HeroSection;
