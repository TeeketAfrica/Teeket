import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTicketStep } from "../../../features/eventSlice";
import { TickCircle } from "iconsax-react";
import BrandLogo from "../../../assets/img/brandLogo.png";
import TicketIcon from "../../../assets/icon/Ticket.svg";
import PlusIcon from "../../../assets/icon/plus-circle.svg";
import GridIcon from "../../../assets/icon/grid-2.svg";
import SettingsIcon from "../../../assets/icon/Settings.svg";
import SignOutIcon from "../../../assets/icon/sign-out-2.svg";
import { selectActiveUser } from "../../../features/activeUserSlice";
import LogoutModal from "../../../components/auth/LogoutModal";
import useStorage from "../../../utils/storage";

export const EventGetTicketHeader = ({ paid, profile }) => {
  const { ticketStep, isBookedTicket, isSetDetails } = useSelector(
    (state) => state.event
  );
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log({"paid": paid, "booked": isBookedTicket, "details": isSetDetails})

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useEffect(() => {
    if (ticketStep == 1) {
      setSearchParams({ step: "ticket-type" });
    } else if (ticketStep === 2) {
      setSearchParams({ step: "your-details" });
    } else if (ticketStep == 3) {
      setSearchParams({ step: "payment" });
    }
  }, [setSearchParams, ticketStep]);

  useEffect(() => {
    if (searchParams.get("step") == "ticket-type") {
      dispatch(changeTicketStep(1));
    } else if (searchParams.get("step") == "your-details" && isBookedTicket) {
      dispatch(changeTicketStep(2));
    } else if (searchParams.get("step") == "payment" && isBookedTicket) {
      dispatch(changeTicketStep(3));
    }
  }, [dispatch, isBookedTicket, isSetDetails, searchParams]);

  return (
    <Box py={6} px={4} borderBottom="1px solid" borderColor="gray.300">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        w="full"
      >
        <Link to="/">
          <Image w="full" src={BrandLogo} alt="logo" />
        </Link>

        <HStack spacing="2">
          <Button
            rounded={12}
            bg={ticketStep == 1 && "gray.200"}
            paddingX={4}
            paddingY={2}
            display="flex"
            gap="2"
            alignItems="center"
            onClick={() => {
              dispatch(changeTicketStep(1));
            }}
            disabled={paid}
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              fontWeight={600}
              color={ticketStep == 1 ? "gray.800" : "gray.500"}
            >
              1/
            </Text>
            <Text
              fontSize={{ base: 12, md: 16 }}
              fontWeight={600}
              color={ticketStep == 1 ? "gray.800" : "gray.500"}
              display={{ base: "none", sm: "initial", md: "initial" }}
            >
              Ticket type
            </Text>

            {isBookedTicket && (
              <TickCircle
                variant="Bold"
                color="#06CC06"
                opacity={ticketStep == 1 ? 1 : 0.7}
              />
            )}
          </Button>
          <Button
            rounded={12}
            paddingX={4}
            paddingY={2}
            display="flex"
            bg={ticketStep == 2 && "gray.200"}
            gap="2"
            alignItems="center"
            onClick={() => {
              dispatch(changeTicketStep(2));
            }}
            isDisabled={!isBookedTicket || paid}
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              fontWeight={600}
              color={ticketStep == 2 ? "gray.800" : "gray.500"}
            >
              2/
            </Text>
            <Text
              fontSize={{ base: 12, md: 16 }}
              fontWeight={600}
              color={ticketStep == 2 ? "gray.800" : "gray.500"}
              display={{ base: "none", sm: "initial", md: "initial" }}
            >
              Your details
            </Text>
            {isSetDetails && isBookedTicket && (
              <TickCircle
                variant="Bold"
                color="#06CC06"
                opacity={ticketStep == 2 ? 1 : 0.7}
              />
            )}
          </Button>
          <Button
            rounded={12}
            paddingX={4}
            paddingY={2}
            display="flex"
            gap="2"
            alignItems="center"
            onClick={() => {
              dispatch(changeTicketStep(3));
            }}
            isDisabled={true} // implement !isBookedTicket && !isSetDetails here so users can only click on this if they have a details set and have booked a ticket
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              fontWeight={600}
              color="gray.500"
            >
              3/
            </Text>
            <Text
              fontSize={{ base: 12, md: 16 }}
              fontWeight={600}
              color="gray.500"
              display={{ base: "none", sm: "initial", md: "initial" }}
            >
              Payment
            </Text>
            {isSetDetails && isBookedTicket && ticketStep === 3 && paid && (
              <TickCircle
                variant="Bold"
                color="#06CC06"
                opacity={ticketStep == 2 ? 1 : 0.7}
              />
            )}
          </Button>
        </HStack>

        {/* Menu Dropdown (copied from DashboardHeader) */}
        <Menu>
          <MenuButton>
            <Avatar
              border="1px solid"
              borderColor="gray.800"
              color="gray.800"
              name={profile?.name || profile?.email}
              src={profile?.profile_image}
              opacity={profile?.is_creator === null || !token ? 0 : 100}
              bgColor="transparent"
            />
          </MenuButton>
          {(profile || token) && (
            <MenuList>
              <MenuGroup title={profile?.email}>
                <Link to="/my-tickets">
                  <MenuItem
                    icon={<TicketIcon />}
                    color="gray.600"
                    fontSize={14}
                  >
                    My Tickets
                  </MenuItem>
                </Link>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <Link to="/create-event">
                  <MenuItem icon={<PlusIcon />} color="gray.600" fontSize={14}>
                    Create Event
                  </MenuItem>
                </Link>
                {profile?.is_creator && (
                  <Link to="/app/overview">
                    <MenuItem
                      icon={<GridIcon />}
                      color="gray.600"
                      fontSize={14}
                    >
                      My Dashboard
                    </MenuItem>
                  </Link>
                )}
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
          )}
        </Menu>
      </Stack>

      <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />
    </Box>
  );
};
