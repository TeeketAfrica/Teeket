import { Stack, Box, Divider, Heading, Text, Collapse, Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";
import { selectEventDetails } from "../../../features/eventSlice";
import {
  formatDate,
  convertTimeFormat,
  calculateMinAndMaxPrices,
} from "../../../utils/utils";
import { DEFAULTBANNERIMAGE } from "../../../utils/constants";
import Map from "../../../assets/icon/Map.svg";
import Clock from "../../../assets/icon/clock.svg";
import Calendar from "../../../assets/icon/calendar-alt.svg";
import TicketNumber from "../../../assets/icon/TicketNumber.svg";
import TicketPrice from "../../../assets/icon/TicketPrice.svg";
import markdownit from 'markdown-it';
import { useEffect, useRef, useState } from "react";


const md = markdownit();

const PublishForm = () => {
  const { values } = useFormikContext();
  const { tickets, totalTicketQuantities } = useSelector(selectEventDetails);
  const [showMore, setShowMore] = useState(false);
  const parsedContent = md.render(values.eventAbout || "");
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      setIsOverflowing(el.scrollHeight > 250);
    }
  }, [parsedContent]);

  const publishOptions = [
    {
      value: "true",
      label: (
        <Box>
          <Heading fontSize="md" fontWeight="medium">
            Publish event live
          </Heading>
          <Text color="gray.600" fontSize="sm">
            This will place your event publicly for all to see and start
            purchasing tickets.
          </Text>
        </Box>
      ),
    },
    {
      value: "false",
      label: (
        <Box>
          <Heading fontSize="md" fontWeight="medium">
            Publish event to draft
          </Heading>
          <Text color="gray.600" fontSize="sm">
            This will not be public and you will be able to review the event
            from your dashboard to make any changes before going live again.
          </Text>
        </Box>
      ),
    },
  ];

  return (
    <Stack direction="column" spacing={8}>
      {/* Event Preview */}
      <Box border="1px solid" borderColor="gray.300" borderRadius="16px">
        <Stack direction="row" flexWrap={{ base: "wrap", lg: "nowrap" }}>
          <Box
            w={{ base: "100%", lg: "397px" }}
            h={{ base: "320px", lg: "auto" }}
            flexShrink="0"
            backgroundImage={`url(${values.eventBannerImage
              ? values.eventBannerImage.secure_url || values.eventBannerImage
              : DEFAULTBANNERIMAGE
              })`}
            backgroundSize="cover"
            backgroundPosition="top"
            borderRadius={{
              base: "16px 16px 0 0",
              lg: "16px 0 0 16px",
            }}
          />
          <Box p={6} overflowX={"hidden"}>
            <Stack direction="column" spacing={2}>
              <Box>
                <Text color="textSuccess" fontSize="xs" fontWeight="semibold">
                  {values.eventOrganizer}
                </Text>
                <Heading color="gray.800" fontSize="lg" fontWeight="semibold">
                  {values.eventTitle}
                </Heading>
              </Box>
              {
                parsedContent ? (
                  <Box>
                    <Collapse startingHeight={250} in={showMore}>
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
                    <Text color="gray.600" fontSize="sm">
                      {values.eventAbout}
                    </Text>
                  )
              }
              {values.eventHosting === "physical" ? (
                <Text display="flex" color="gray.800" gap={2} fontSize="sm" marginTop={10}>
                  <Map /> {values.eventLocation}
                </Text>
              ) : (
                <Text display="flex" color="gray.800" gap={2} fontSize="sm" marginTop={10}>
                  {values.eventLocation}
                </Text>
              )}
              {values.eventStartDate &&
                values.eventStartTime &&
                values.eventEndTime && (
                  <Box>
                    <Heading
                      fontWeight="semibold"
                      color="gray.800"
                      fontSize="md"
                      mb={2}
                    >
                      Date and time
                    </Heading>
                    <Stack direction={["column", "column", "row"]} gap={2}>
                      <Text
                        display="flex"
                        alignItems="center"
                        color="gray.800"
                        gap={2}
                        fontSize="sm"
                        bgColor="gray.200"
                        p={2}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"

                      >
                        <Calendar width="14px" height="14px" />
                        {formatDate(values.eventStartDate)}
                        <Clock />
                        {convertTimeFormat(values.eventStartTime)}
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        color="gray.800"
                        gap={2}
                        fontSize="sm"
                        bgColor="gray.200"
                        p={2}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"
                      >
                        <Calendar width="14px" height="14px" />
                        {formatDate(values.eventEndDate)}
                        <Clock />
                        {convertTimeFormat(values.eventEndTime)}
                      </Text>
                    </Stack>
                  </Box>
                )}
              <Box>
                <Heading
                  fontWeight="semibold"
                  color="gray.800"
                  fontSize="md"
                  mb={2}
                >
                  Ticket sales
                </Heading>
                <Stack direction="row" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    color="gray.800"
                    gap={2}
                    fontSize="sm"
                    bgColor="gray.200"
                    p={2}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="8px"
                  >
                    <TicketPrice width="14px" height="14px" />
                    {
                      calculateMinAndMaxPrices(tickets).minPrice === calculateMinAndMaxPrices(tickets).maxPrice ? (
                        <Text display="inline-flex" gap="2">
                          <Text as="span">
                            ₦{calculateMinAndMaxPrices(tickets).minPrice}
                          </Text>
                        </Text>
                      ) : (
                        <Text display="inline-flex" gap="2">
                          <Text as="span">
                            ₦{calculateMinAndMaxPrices(tickets).minPrice}
                          </Text>
                          -
                          <Text as="span">
                            ₦{calculateMinAndMaxPrices(tickets).maxPrice}
                          </Text>
                        </Text>
                      )
                    }
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    color="gray.800"
                    gap={2}
                    fontSize="sm"
                    bgColor="gray.200"
                    p={2}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="8px"
                  >
                    <TicketNumber />
                    {totalTicketQuantities} tickets
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Divider border="1px solid" borderColor="gray.300" />

      {/* Publishing Settings */}
      <Box>
        <Stack direction="column" spacing={6}>
          <Box>
            <Heading color="black" fontSize="lg" fontWeight="semibold">
              Publishing setting
            </Heading>
            <Text color="gray.600">
              How would you like to publish this event?
            </Text>
          </Box>

          <Box maxW={{ base: "100%", lg: "600px" }} w="100%">
            <FormField
              name="publishLive"
              type={FormFieldType.Radio}
              options={publishOptions}
              radioDirection="column"
              radioMaxWidth="100%"
              radioSpacing="6"
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PublishForm;
