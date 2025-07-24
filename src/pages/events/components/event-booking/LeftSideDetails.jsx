import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import GPSIcon from "../../../../assets/icon/Gps.svg";
import LightingIcon from "../../../../assets/icon/LightingIcon.svg";
import BoxFrame from "../../../../components/layouts/BoxFrame";
import { formatDateAndTime } from "../../../../utils/utils";
import DetailCard from "../DetailCard";
import EventBadge from "../EventBadge";
import useStorage from "../../../../utils/storage";
import { BellRing, Copy, Link } from "lucide-react";
import markdownit from 'markdown-it';
import { useEffect, useRef, useState } from "react";

const md = markdownit();

const LeftSideDetails = ({ event, user }) => {
  const startDate = formatDateAndTime(event.start_date, "long");
  const endDate = formatDateAndTime(event.end_date, "long");
  const toast = useToast();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  user = user.is_creator === null || !token ? false : true;
  const parsedContent = md.render(event.description || "");
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      setIsOverflowing(el.scrollHeight > 350);
    }
  }, [parsedContent]);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard.",
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <VStack width={{ base: "100%", lg: "60%" }} gap="6" alignItems="flex-start" >
      <BoxFrame paddingX="24px" paddingY="24px">
        <Box>
          {event.status && (
            <EventBadge
              eventBadgeInfo={{
                badgeTitle: `${event.status?.split("_").join(" ")}`,
                state: event.status === "past_event" ? "past" : "trending",
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
            gap="2"
            justifyContent="space-between"
            alignItems={{ base: "flex-start", sm: "center" }}
          >
            <DetailCard
              icon={CalendarIcon}
              title={`${startDate.date.day}, ${startDate.date.dayNumber} ${startDate.date.month}`}
              subTitle={`${startDate.time} - ${endDate.time}`}
            />
            {event.status !== "past_event" && (
              <>
                <Button
                  variant="secondary"
                  display={{ base: "none", sm: "block" }}
                  size="sm"
                >
                  Remind me
                </Button>
                <Button
                  variant="outline"
                  display={{ base: "block", sm: "none" }}
                  size="sm"
                >
                  <BellRing color="gray" size={15} />
                </Button>
              </>
            )}
          </Flex>
          {event?.hosting_site === "physical" ? (
            <Flex
              gap="2"
              justifyContent="space-between"
              alignItems={{ base: "flex-start", sm: "center" }}
            >
              <DetailCard
                icon={GPSIcon}
                title="Event Address"
                subTitle={event.event_location}
              />
              <>
                <Button
                  variant="secondary"
                  display={{ base: "none", sm: "block" }}
                  size="auto"
                  padding={1}
                  onClick={() => handleCopy(event.event_location)}
                >
                  Copy Address
                </Button>
                <Button
                  variant="secondary"
                  display={{ base: "block", sm: "none" }}
                  size="auto"
                  padding={1}
                  onClick={() => handleCopy(event.event_location)}
                >
                  <Copy size={18} />
                </Button>
              </>
            </Flex>
          ) : (
            <Flex
              gap="2"
              justifyContent="space-between"
              alignItems={{ base: "flex-start", sm: "center" }}
            >
              <DetailCard
                icon={GPSIcon}
                title="Event Link"
                subTitle={event.event_link}
              />
              <>
                <Button
                  variant="secondary"
                  display={{ base: "none", sm: "block" }}
                  size="sm"
                  padding={2}
                  onClick={() => handleCopy(event.event_link)}
                >
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  display={{ base: "block", sm: "none" }}
                  size="sm"
                  padding={2}
                  onClick={() => handleCopy(event.event_link)}
                >
                  <Link color="gray" size={15} />
                </Button>
              </>
            </Flex>
          )}
        </Flex>
      </BoxFrame>
      <BoxFrame paddingX="24px" paddingY="24px">
        <VStack gap="4" alignItems="flex-start" overflowX={"auto"}>
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
            {
              parsedContent ? (
                <Box>
                  <Collapse startingHeight={350} in={showMore}>
                    <Box
                      as="article"
                      wordBreak="break-word"
                      className="prose"
                      ref={contentRef}
                      dangerouslySetInnerHTML={{ __html: parsedContent }}
                    />
                  </Collapse>

                  {isOverflowing && (
                    <Button
                      size="sm"
                      variant="secondary"
                      mt={2}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Show Less" : "Read More"}
                    </Button>
                  )}
                </Box>
              ) :
                (
                  <Text>{event?.description}</Text>
                )
            }
          </VStack>
        </VStack>
      </BoxFrame>
    </VStack>
  );
};

export default LeftSideDetails;
