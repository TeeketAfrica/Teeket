import {
    Avatar,
    Box,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    useDisclosure,
} from "@chakra-ui/react";

import Search from "../../assets/icon/Search.svg";
import TicketIcon from "../../assets/icon/Ticket.svg";
import SearchIcon from "../../assets/icon/SearchIcon.svg";
import PlusIcon from "../../assets/icon/plus-circle.svg";
import GridIcon from "../../assets/icon/grid-2.svg";
import SettingsIcon from "../../assets/icon/Settings.svg";
import SignOutIcon from "../../assets/icon/sign-out-2.svg";
import Hamburger from "../../assets/icon/Hamburger.svg";
import BrandLogo from "../../assets/img/brandLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutModal from "../auth/LogoutModal";
import { selectActiveUser } from "../../features/activeUserSlice";

const DashboardHeader = ({ onOpen }) => {
    const activeUser = useSelector(selectActiveUser);

    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();

    return (
        <Box
            py={[3, 6]}
            px={[3, 8]}
            borderBottom="1px solid"
            borderColor="gray.300"
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box w="107px" h="29px" display={["block", "none"]}>
                    <Link to="/">
                        <Image src={BrandLogo} alt="logo" />
                    </Link>
                </Box>
                <Box maxW="375px" w="100%" display={["none", "block"]}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Search />
                        </InputLeftElement>
                        <Input
                            borderRadius="48px"
                            type="text"
                            placeholder="Search"
                        />
                        <InputRightElement mr={3}>
                            <SearchIcon />
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <HStack
                    w="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={[3, null, null, null, 5]}
                >
                    <Menu>
                        <MenuButton>
                            <Avatar
                                border="1px solid"
                                borderColor="gray.800"
                                color="gray.800"
                                name={activeUser?.name || activeUser?.email}
                                src={activeUser?.profile_image}
                                bgColor="transparent"
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title={activeUser?.email}>
                                <MenuItem
                                    icon={<TicketIcon />}
                                    color="gray.600"
                                    fontSize={14}
                                >
                                    My Account
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup>
                                <MenuItem
                                    icon={<PlusIcon />}
                                    color="gray.600"
                                    fontSize={14}
                                >
                                    Create Event
                                </MenuItem>
                                <MenuItem
                                    icon={<GridIcon />}
                                    color="gray.600"
                                    fontSize={14}
                                    command="⌘N"
                                >
                                    My dashboard
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup>
                                <Link to="/account-settings">
                                    <MenuItem
                                        icon={<SettingsIcon />}
                                        color="gray.600"
                                        fontSize={14}
                                    >
                                        Account settings
                                    </MenuItem>
                                </Link>
                                <MenuItem
                                    icon={<SignOutIcon color="#5E665E" />}
                                    color="gray.600"
                                    fontSize={14}
                                    onClick={onOpenModal}
                                >
                                    Log out
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                    <Box display={["block", null, null, null, "none"]}>
                        <Hamburger
                            height="24px"
                            width="24px"
                            onClick={onOpen}
                        />
                    </Box>
                </HStack>
            </Stack>
            <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />
        </Box>
    );
};

export default DashboardHeader;
