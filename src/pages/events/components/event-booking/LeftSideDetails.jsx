import { Box, Button, Flex, Text, useToast, VStack } from "@chakra-ui/react";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import GPSIcon from "../../../../assets/icon/Gps.svg";
import LightingIcon from "../../../../assets/icon/LightingIcon.svg";
import BoxFrame from "../../../../components/layouts/BoxFrame";
import { formatDateAndTime } from "../../../../utils/utils";
import DetailCard from "../DetailCard";
import EventBadge from "../EventBadge";
import useStorage from "../../../../utils/storage";

const LeftSideDetails = ({ event, location, user }) => {
  const startDate = formatDateAndTime(event.start_date, "long");
  const endDate = formatDateAndTime(event.end_date, "long");
  const toast = useToast();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  user = user.is_creator === null || !token ? false : true;

  const handleCopy = () => {
    if (!event.event_location) return;
    navigator.clipboard.writeText(event.event_location);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard.",
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <VStack width={{ base: "100%", lg: "60%" }} gap="6" alignItems="flex-start">
      <BoxFrame paddingX="24px" paddingY="24px">
        <Box>
          {event.status && (
            <EventBadge
              eventBadgeInfo={{
                badgeTitle: `${event.status?.split("_").join(" ")}`,
                state: event.status === 'past_event'? "past" :"trending",
                icon: LightingIcon,
              }}
            />
          )}
          <Text
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            lineHeight={{ base: "30px", sm: "44px" }}
            paddingTop="2"
          >
            {event?.title}
          </Text>
        </Box>
        <Flex flexDirection="column" gap="6" marginTop="6">
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            gap="2"
            justifyContent="space-between"
            alignItems={{ base: "flex-start", sm: "center" }}
          >
            <DetailCard
              icon={CalendarIcon}
              title={`${startDate.date.day}, ${startDate.date.dayNumber} ${startDate.date.month}`}
              subTitle={`${startDate.time} - ${endDate.time}`}
            />
            {
              event.status !== 'past_event' && 
            <Button variant="secondary" size="sm">
              Remind me
            </Button>              
            }

          </Flex>
          {event?.hosting_site === "physical" && (
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              gap="2"
              justifyContent="space-between"
              alignItems={{ base: "flex-start", sm: "center" }}
            >
              <DetailCard
                icon={GPSIcon}
                title="Event Address"
                subTitle={event.event_location}
              />
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                Copy Address
              </Button>
            </Flex>
          )}
        </Flex>
      </BoxFrame>
      <BoxFrame paddingX="24px" paddingY="24px">
        <VStack gap="4" alignItems="flex-start">
          <Text as="h4" fontSize="xl" lineHeight="6" fontWeight="semibold">
            About this event
          </Text>
          <VStack
            gap="4"
            alignItems="flex-start"
            fontSize="sm"
            lineHeight="5"
            color="gray.500"
          >
            <Text>{event?.description}</Text>
          </VStack>
        </VStack>
      </BoxFrame>
    </VStack>
  );
};

export default LeftSideDetails;
