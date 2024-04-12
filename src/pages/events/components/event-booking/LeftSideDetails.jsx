import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

import BoxFrame from "../../../../components/layouts/BoxFrame";
import EventBadge from "../EventBadge";
import DetailCard from "../DetailCard";

import LightingIcon from "../../../../assets/icon/LightingIcon.svg";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import GPSIcon from "../../../../assets/icon/Gps.svg";

const LeftSideDetails = () => {
  return (
    <VStack width={{ base: "100%", lg: "60%" }} gap="6" alignItems="flex-start">
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
              Our communities are full of strong technical folks and we would
              love to have these talks focus on problems, technical challenges,
              and your solutions.
            </Text>
            <Text>
              If you’d like to present, please fill in the optional question
              when you RSVP for the event. We will reach out to you if your talk
              fits the above criteria. <br /> Both the MLOps and GenAI
              collective community thrive on its wonderful members sharing their
              experiences and learning from each other. The organizers are
              eagerly looking forward to hosting you and providing space for you
              to present your learnings and enrich us all
            </Text>
            <Text>
              Please note that these should not be self-promotion or
              product/tool marketing pitches!
            </Text>
          </VStack>
        </VStack>
      </BoxFrame>
    </VStack>
  );
};

export default LeftSideDetails;
