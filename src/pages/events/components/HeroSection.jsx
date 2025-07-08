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
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import EventBg from "../../../assets/img/eventsBg.png";
import DownIcon from "../../../assets/icon/DownIcon.svg";
import SearchWhite from "../../../assets/icon/SearchWhite.svg";
import { SearchContext } from "../../../context/SearchContext";
import { Filter, ListFilter } from "lucide-react";

const HeroSection = () => {
  const { searchTerm, category, setSearchTerm, setCategory } =
    useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if(inputValue === ""){
      setSearchTerm("")
    }
  }, [inputValue]);

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
          <Box px={[5, null, 109]}>
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
                        fontSize={[40, null, 56]}
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
                      <Stack
                        direction={["column", null, "row"]}
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
                          display={["none", null, null, "block"]}
                        >
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
                            {/* <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<DownIcon />}
                                color="gray.400"
                                fontWeight={400}
                                variant="link"
                                width="100%"
                                textAlign="left"
                                paddingLeft="10px"
                                _hover={{ bg: "transparent" }}
                              >
                                {category == null
                                  ? "Choose category"
                                  : category}
                              </MenuButton>
                              <MenuList>
                                {categories.map((category) => (
                                  <MenuItem
                                    key={category}
                                    onClick={() => setCategory(category)}
                                  >
                                    {category}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu> */}
                          </HStack>
                        </Box>
                        <Button
                          display={["none", "none", "none", "block"]}
                          leftIcon={<SearchWhite />}
                          className="searchbar"
                          variant="primary"
                          style={{ height: "56px",  display: "flex", justifyItems: "center", alignItems: "center", width: "25%"}}
                          onClick={handleButtonClick}
                        >
                          Search
                        </Button>

                        {/* Mobile */}
                        <HStack
                          flexDirection="row"
                          display={["flex", null, null, "none"]}
                          alignItems="inherit"
                          w="full"
                        >
                          <Box
                            maxW="545px"
                            w="full"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="12px"
                            bgColor="gray.100"
                            px={4}
                            display={["block", null, null, "none"]}
                          >
                            <Input
                              placeholder="Search for an event or location"
                              px={0}
                              border="none"
                              outline="none"
                              value={inputValue}
                              onChange={handleInputChange}
                              maxW="320px"
                              w="full"
                              flexShrink="0"
                              style={{ boxShadow: "none" }}
                            />
                          </Box>
                          <Button variant="primary" onClick={handleButtonClick}>
                            <SearchWhite />
                          </Button>
                          {/* <Menu>
                            <MenuButton
                              display={["flex", null, null, "none"]}
                              border="1px solid"
                              as={Button}
                              color="gray.400"
                              variant="link"
                              h="40px"
                              _hover={{ bg: "transparent" }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Center>
                                {category == null ? <ListFilter /> : category}
                              </Center>
                            </MenuButton>
                            <MenuList>
                              {categories.map((category) => (
                                <MenuItem
                                  key={category}
                                  onClick={() => setCategory(category)}
                                >
                                  {category}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu> */}
                        </HStack>
                      </Stack>
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
