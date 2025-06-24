import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
    Avatar,
    AvatarBadge,
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Image,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";

import { maskEmail } from "../../utils/utils";

import SidebarOptions from "./SidebarOptions";
import OverviewIcon from "../../assets/icon/grid.svg";
import DarkOverviewIcon from "../../assets/icon/darkgrid.svg";
import EventsIcon from "../../assets/icon/loudspeaker.svg";
import DarkEventsIcon from "../../assets/icon/darkloudspeaker.svg";
import OrderIcon from "../../assets/icon/receipt.svg";
import FinanceIcon from "../../assets/icon/money.svg";
import ScanIcon from "../../assets/icon/scan.svg";
import DarkFinanceIcon from "../../assets/icon/darkmoney.svg";
import DarkOrderIcon from "../../assets/icon/DarkOrderIcon.svg";
import Settings from "../../assets/icon/sidebarsettings.svg";
import Help from "../../assets/icon/question-circle.svg";
import SignOut from "../../assets/icon/sign-out.svg";
import BrandLogo from "../../assets/img/brandLogo.png";
import { Link } from "react-router-dom";
import LogoutModal from "../auth/LogoutModal";
import { selectActiveUser } from "../../features/activeUserSlice";
const SidebarMenu = ({ onClose, isOpen }) => {
    const [placement] = useState("left");
    const activeUser = useSelector(selectActiveUser);

    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();
    return (
        <Fragment>
            <Box
                maxW="272px"
                w="100%"
                h="100vh"
                borderRight="1px solid"
                borderColor="gray.300"
                py={6}
                px={2}
                display={["none", null, null, null, "block"]}
            >
                <VStack justifyContent="space-between" h="100%">
                    <VStack alignItems="flex-start" spacing={7}>
                        <Box px={6}>
                            <Link to="/">
                                <Image src={BrandLogo} alt="logo" />
                            </Link>
                        </Box>
                        <Box>
                            <SidebarOptions
                                icon={OverviewIcon}
                                darkIcon={DarkOverviewIcon}
                                title="Overview"
                                link="/app/overview"
                            />
                            <SidebarOptions
                                icon={EventsIcon}
                                darkIcon={DarkEventsIcon}
                                title="Events"
                                link="/app/events"
                            />
                            <SidebarOptions
                                icon={OrderIcon}
                                darkIcon={DarkOrderIcon}
                                title="Order"
                                link="/app/order"
                            />
                            <SidebarOptions
                                icon={FinanceIcon}
                                darkIcon={DarkFinanceIcon}
                                title="Finance"
                                link="/app/finance"
                            />
                            <SidebarOptions
                                icon={ScanIcon}
                                darkIcon={DarkFinanceIcon}
                                title="Scan Ticket"
                                link="/app/scan-to-attend"
                            />
                        </Box>
                    </VStack>
                    <VStack spacing={6}>
                        <Box>
                            { activeUser?.is_creator && 
                                (<SidebarOptions
                                    icon={Settings}
                                    darkIcon={DarkOverviewIcon}
                                    title="Organization settings"
                                    link="/app/organization-settings"
                                />)
                            }
                            <SidebarOptions
                                icon={Help}
                                darkIcon={DarkOverviewIcon}
                                title="Help and support"
                                link="/help-and-support"
                            />
                        </Box>
                        <HStack justifyContent="space-between">
                            <Avatar
                                border="1px solid"
                                borderColor="gray.800"
                                color="gray.800"
                                name={activeUser?.name || activeUser?.email}
                                src={activeUser?.profile_image}
                                bgColor="transparent"
                            >
                                <AvatarBadge boxSize="20px" bg="greenSuccess" />
                            </Avatar>
                            <Box>
                                <Text fontWeight="semibold" fontSize="sm">
                                    {activeUser?.name}
                                </Text>
                                <Text>{maskEmail(activeUser?.email)}</Text>
                            </Box>
                            <SignOut onClick={onOpenModal} />
                        </HStack>
                    </VStack>
                </VStack>
            </Box>

            {/* MOBILE */}
            <Drawer
                display={["block", null, null, null, "none"]}
                placement={placement}
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth="1px"
                        borderColor="gray.300"
                    >
                        <Link to="/">
                            <Image src={BrandLogo} alt="logo" />
                        </Link>{" "}
                        <DrawerCloseButton />
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack justifyContent="space-between" h="100%">
                            <VStack alignItems="flex-start" spacing={7}>
                                <Box>
                                    <SidebarOptions
                                        icon={OverviewIcon}
                                        darkIcon={DarkOverviewIcon}
                                        title="Overview"
                                        link="/app/overview"
                                    />
                                    <SidebarOptions
                                        icon={EventsIcon}
                                        darkIcon={DarkEventsIcon}
                                        title="Events"
                                        link="/app/events"
                                    />
                                    <SidebarOptions
                                        icon={OrderIcon}
                                        darkIcon={DarkOrderIcon}
                                        title="Order"
                                        link="/app/order"
                                    />
                                    <SidebarOptions
                                        icon={FinanceIcon}
                                        darkIcon={DarkFinanceIcon}
                                        title="Finance"
                                        link="/app/finance"
                                    />
                                    <SidebarOptions
                                        icon={ScanIcon}
                                        darkIcon={DarkFinanceIcon}
                                        title="Scan Ticket"
                                        link="/app/scan-to-attend"
                                    />
                                </Box>
                            </VStack>
                            <VStack spacing={6}>
                                <Box>
                                    {
                                        activeUser.is_creator && 
                                        <SidebarOptions
                                            icon={Settings}
                                            darkIcon={DarkOverviewIcon}
                                            title="Organization settings"
                                            link="/app/organization-settings"
                                        /> 
                                    }
                                    <SidebarOptions
                                        icon={Help}
                                        darkIcon={DarkOverviewIcon}
                                        title="Help and support"
                                        link="/help-and-support"
                                    />
                                </Box>
                                <HStack justifyContent="space-between">
                                    <Avatar
                                        border="1px solid"
                                        borderColor="gray.800"
                                        color="gray.800"
                                        name={
                                            activeUser?.name ||
                                            activeUser?.email
                                        }
                                        src={activeUser?.profile_image}
                                        bgColor="transparent"
                                    >
                                        <AvatarBadge
                                            boxSize="20px"
                                            bg="greenSuccess"
                                        />
                                    </Avatar>
                                    <Box>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize="sm"
                                        >
                                            {activeUser?.name}
                                        </Text>
                                        <Text>
                                            {maskEmail(activeUser?.email)}
                                        </Text>
                                    </Box>
                                    <SignOut onClick={onOpenModal} />
                                </HStack>
                            </VStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />
        </Fragment>
    );
};

export default SidebarMenu;
