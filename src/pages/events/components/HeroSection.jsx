import { useContext, useEffect, useState } from "react";
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
import DownIcon from "../../../assets/icon/DownIcon.svg";
import SearchWhite from "../../../assets/icon/SearchWhite.svg";
import { SearchContext } from "../../../context/SearchContext";

const HeroSection = () => {
  const { searchTerm, category, setSearchTerm, setCategory } =
    useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setInputValue("");
    }
  }, [searchTerm]);

  const categories = [
    "Anime",
    "Conference",
    "Dance",
    "Entertainment",
    "Festival",
    "Games",
    "Tech",
    "Students",
    "Party",
    "Celebration",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setSearchTerm(inputValue);
  };

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
              w="100%">
              <Box h="full" maxW="692px" w="full" mx="auto">
                <Center h="full" w="full">
                  <VStack w="full" spacing={8}>
                    <Box maxW="519px" w="full" mx="auto">
                      <Heading
                        fontSize={56}
                        fontWeight={700}
                        textAlign="center">
                        Browse
                        <Text
                          as="span"
                          fontStyle="italic"
                          bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                          bgClip="text">
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
                        alignItems="center">
                        <Box
                          maxW="545px"
                          w="full"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="12px"
                          bgColor="gray.100">
                          <HStack spacing={3} p={2}>
                            <Input
                              placeholder="Search for an event or location"
                              border="none"
                              outline="none"
                              value={inputValue}
                              onChange={handleInputChange}
                              w="320px"
                              flexShrink="0"
                              style={{ boxShadow: "none" }}
                            />
                            <Center height="34px">
                              <Divider
                                borderColor="gray.300"
                                orientation="vertical"
                              />
                            </Center>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<DownIcon />}
                                color="gray.400"
                                fontWeight={400}
                                variant="link"
                                width="100%"
                                textAlign="left"
                                paddingLeft="10px"
                                _hover={{ bg: "transparent" }}>
                                {category == null
                                  ? "Choose category"
                                  : category}
                              </MenuButton>
                              <MenuList>
                                {categories.map((category) => (
                                  <MenuItem
                                    key={category}
                                    onClick={() => setCategory(category)}>
                                    {category}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </HStack>
                        </Box>
                        <Button
                          leftIcon={<SearchWhite />}
                          variant="primary"
                          style={{ height: "56px" }}
                          onClick={handleButtonClick}>
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
