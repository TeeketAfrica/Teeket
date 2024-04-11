import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import BoxFrame from "../../../components/layouts/BoxFrame";
import EventBadge from "./EventBadge";
import DetailCard from "./DetailCard";

import HeroImage from "../../../assets/img/event-booking-herobg.webp";
import LightingIcon from "../../../assets/icon/LightingIcon.svg";
import LightingOutlineIcon from "../../../assets/icon/LightingOutline.svg";
import CalendarIcon from "../../../assets/icon/Calendar.svg";
import GPSIcon from "../../../assets/icon/Gps.svg";
import TicketIcon from "../../../assets/icon/Ticket.svg";
import UserAvatar from "../../../assets/img/Avatars.png";
import EventMap from "../../../assets/icon/PlaceMarkMap.svg";

const EventBookingDetail = ({ isRegistered }) => {
  return (
    <VStack width="85%" mx="auto" gap="22px" paddingY="11">
      <Box width="100%" height="420px" overflow="hidden" borderRadius="16px">
        <Image
          src={HeroImage}
          alt="vintage art event image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap="6">
        {/* Left section */}
        <VStack
          width={{ base: "100%", lg: "60%" }}
          gap="6"
          alignItems="flex-start"
        >
          <BoxFrame paddingX="24px" paddingY="24px">
            <Box>
              <EventBadge
                eventBadgeInfo={{
                  badgeTitle: "Trending",
                  state: "trending",
                  icon: LightingIcon,
                }}
              />
              <Text
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                lineHeight={{ base: "30px", sm: "44px" }}
                paddingTop="2"
              >
                The vintage art event africa
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
                  title="Tuesday, 23rd January"
                  subTitle="8:00pm - 10pm"
                />
                <Button variant="secondary" size="sm">
                  Remind me
                </Button>
              </Flex>
              <DetailCard
                icon={GPSIcon}
                title="Register to see address"
                subTitle="Abuja, Nigeria"
              />
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
                <Text>
                  Our communities are full of strong technical folks and we
                  would love to have these talks focus on problems, technical
                  challenges, and your solutions.
                </Text>
                <Text>
                  If you’d like to present, please fill in the optional question
                  when you RSVP for the event. We will reach out to you if your
                  talk fits the above criteria. <br /> Both the MLOps and GenAI
                  collective community thrive on its wonderful members sharing
                  their experiences and learning from each other. The organizers
                  are eagerly looking forward to hosting you and providing space
                  for you to present your learnings and enrich us all
                </Text>
                <Text>
                  Please note that these should not be self-promotion or
                  product/tool marketing pitches!
                </Text>
              </VStack>
            </VStack>
          </BoxFrame>
        </VStack>

        {/* Right section */}
        <VStack
          width={{ base: "100%", lg: "40%" }}
          gap="6"
          alignItems="flex-start"
        >
          <BoxFrame paddingX="24px" paddingY="24px">
            <VStack gap="6" alignItems="flex-start">
              <Text as="h4" fontSize="xl" lineHeight="6" fontWeight="semibold">
                {!isRegistered ? "Get tickets" : "View tickets"}
              </Text>
              {!isRegistered && (
                <DetailCard
                  icon={LightingOutlineIcon}
                  title="This event is trending"
                  subTitle="Hurry up and get your tickets"
                />
              )}

              <HStack gap="10px" alignItems="center">
                <AvatarGroup size="sm" max={3}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                    zIndex={2}
                  />
                  <Avatar
                    name="Kent Dodds"
                    src="https://bit.ly/kent-c-dodds"
                    zIndex={3}
                  />
                </AvatarGroup>
                <Text fontSize="sm" lineHeight="5" color="gray.600">
                  <Text as="span">40</Text>+ people are going already
                </Text>
              </HStack>

              {!isRegistered && (
                <DetailCard
                  icon={TicketIcon}
                  title="Starting price"
                  subTitle="Regular - $10"
                />
              )}

              <Button variant="primary" size="lg" width="100%">
                {!isRegistered ? "Get Your Ticket" : "See my ticket"}
              </Button>
            </VStack>
          </BoxFrame>
          <BoxFrame paddingX="24px" paddingY="24px">
            <VStack gap="4" alignItems="flex-start">
              <HStack justifyContent="space-between" width="100%">
                <Flex gap="2">
                  <Box
                    width="40px"
                    height="40px"
                    borderRadius="100%"
                    overflow="hidden"
                  >
                    <Image
                      src={UserAvatar}
                      alt="avatar icon"
                      objectFi="cover"
                      width="100%"
                    />
                  </Box>
                  <Box>
                    <Text>
                      <Text fontSize="sm" lineHeight="5" color="gray.600">
                        Hosted by
                      </Text>
                      <Text fontSize="md" lineHeight="6" fontWeight="semibold">
                        TheDavinci
                      </Text>
                    </Text>
                  </Box>
                </Flex>
                <Tooltip label="Coming soon!!" aria-label="A tooltip">
                  <Button variant="secondary" size="sm" isDisabled={true}>
                    Subscribe
                  </Button>
                </Tooltip>
              </HStack>
              <Divider borderColor="gray.300" borderWidth="1px" />
              <Text fontSize="sm" lineHeight="5" color="gray.500">
                The best african art event host, building and creating
                experiences for art enthusiats
              </Text>
            </VStack>
          </BoxFrame>
          <BoxFrame paddingX="8px" paddingY="8px">
            <Box position="relative" overflow="hidden" borderRadius="8px">
              <Box
                width="100%"
                maxHeight="222px"
                height="100%"
                overflow="hidden"
                borderRadius="8px"
                border="1px solid"
                borderColor="gray.300"
              >
                <Image
                  src={EventMap}
                  alt="map"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
              <VStack
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%);"
                gap="10px"
                zIndex={4}
              >
                <Image
                  src={GPSIcon}
                  alt="location icon"
                  width="32px"
                  height="32px"
                  objectFit="cover"
                />

                <Button variant="secondary">
                  {!isRegistered ? "Register to view address" : "View address"}
                </Button>
              </VStack>
              {!isRegistered && (
                <Box
                  position="absolute"
                  top="0"
                  bottom="0"
                  left="0"
                  right="0"
                  width="100%"
                  height="100%"
                  backgroundColor="rgba(247, 250, 247, .9)"
                  filter="blur(3px)"
                />
              )}
            </Box>
          </BoxFrame>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default EventBookingDetail;
