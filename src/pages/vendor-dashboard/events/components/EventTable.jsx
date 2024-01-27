import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import Search from "../../../../assets/icon/Search";
import Check from "../../../../assets/icon/Check";
import DownIcon from "../../../../assets/icon/DownIcon";

const EventTable = () => {
  return (
    <Box>
      <Stack
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        spacing="24px"
        alignItems="flex-start"
        pt={8}
        pb={6}
        px={8}
      >
        <InputGroup w="375px">
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input type="text" placeholder="Search for all events" />
        </InputGroup>
        <Menu>
          <MenuButton
            p={2}
            border="1px solid"
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            File <DownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>
              New File <Check />
            </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open...</MenuItem>
            <MenuItem>Save File</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
};

export default EventTable;
