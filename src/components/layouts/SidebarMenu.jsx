import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import SidebarOptions from "./SidebarOptions";
import OverviewIcon from "../../assets/icon/grid.svg";
import DarkOverviewIcon from "../../assets/icon/darkgrid.svg";
import EventsIcon from "../../assets/icon/loudspeaker.svg";
import DarkEventsIcon from "../../assets/icon/darkloudspeaker.svg";
import OrderIcon from "../../assets/icon/receipt.svg";
import FinanceIcon from "../../assets/icon/money.svg";
import DarkFinanceIcon from "../../assets/icon/darkmoney.svg";
import Settings from "../../assets/icon/sidebarsettings.svg";
import Help from "../../assets/icon/question-circle.svg";
import SignOut from "../../assets/icon/sign-out.svg";
import ProfileAvatar from "../../assets/img/Avatars.png";
import BrandLogo from "../../assets/img/brandLogo.png";

const SidebarMenu = () => {
  return (
    <Box
      maxW="272px"
      w="100%"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.300"
      py={6}
      px={2}
    >
      <VStack justifyContent="space-between" h="100%">
        <VStack alignItems="flex-start" spacing={7}>
          <Box px={6}>
            <Image src={BrandLogo} alt="logo" />
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
              darkIcon={DarkFinanceIcon}
              title="Order"
              link="/app/order"
            />
            <SidebarOptions
              icon={FinanceIcon}
              darkIcon={DarkFinanceIcon}
              title="Finance"
              link="/app/finance"
            />
          </Box>
        </VStack>
        <VStack spacing={6}>
          <Box>
            <SidebarOptions
              icon={Settings}
              darkIcon={DarkOverviewIcon}
              title="Organization settings"
              link="/app/organization-settings"
            />
            <SidebarOptions
              icon={Help}
              darkIcon={DarkOverviewIcon}
              title="Help and support"
              link="/help-and-support"
            />
          </Box>
          <HStack justifyContent="space-between">
            <Avatar src={ProfileAvatar}>
              <AvatarBadge boxSize="20px" bg="greenSuccess" />
            </Avatar>
            <Box>
              <Text fontWeight="semibold" fontSize="sm">
                Remi Green
              </Text>
              <Text>re...n@gmail.com</Text>
            </Box>
            <Image src={SignOut} alt="Signout" cursor="pointer" />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SidebarMenu;
