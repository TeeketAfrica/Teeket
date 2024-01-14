import {
  Box,
  Divider,
  FormControl,
  Heading,
  Image,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
import FormLayout from "../components/FormLayout";
import BannerImage from "../../../assets/img/BannerImage.png";
import Map from "../../../assets/icon/Map.svg";
import Clock from "../../../assets/icon/clock.svg";
import Calendar from "../../../assets/icon/calendar-alt.svg";
import TicketNumber from "../../../assets/icon/TicketNumber.svg";
import TicketPrice from "../../../assets/icon/TicketPrice.svg";
import { useForm } from "react-hook-form";

const PublishEvent = () => {
  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
  return (
    <FormLayout
      title="Publish Your Event"
      description="Now that you have finished providing all necessary information to get your event out there, you can go ahead and publish it live or publish to your draft"
    >
      <Stack direction="column" spacing={8}>
        <Box border="1px solid" borderColor="gray.300" borderRadius="16px">
          <Stack direction="row">
            <Box maxW="397px">
              <Image
                src={BannerImage}
                alt="event banner"
                borderRadius="16px 0 0 16px"
              />
            </Box>
            <Box p={6}>
              <Stack direction="column" spacing={2}>
                <Box>
                  <Text color="textSuccess" fontSize="xs" fontWeight="semibold">
                    Animecon
                  </Text>
                  <Heading color="gray.800" fontSize="lg" fontWeight="semibold">
                    Nigeria Anime festival
                  </Heading>
                </Box>
                <Text color="gray.600" fontSize="sm">
                  Now that you have finished providing all necessary information
                  to get your event out there, you can go ahead and publish it
                  live or publish to your draft
                </Text>
                <Text display="flex" color="gray.800" gap={2} fontSize="sm">
                  <Image src={Map} alt="location" />5 ike Anumba close, Wuse II
                </Text>
                <Box>
                  <Heading
                    fontWeight="semibold"
                    color="gray.800"
                    fontSize="md"
                    mb={2}
                  >
                    Date and time
                  </Heading>
                  <Stack direction="row" gap={2}>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image src={Calendar} alt="location" w="14px" h="14px" />
                      5th Jan, 2024
                    </Text>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image src={Clock} alt="location" />
                      6:00PM - 8:00PM
                    </Text>
                  </Stack>
                </Box>
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
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image
                        src={TicketPrice}
                        alt="location"
                        w="14px"
                        h="14px"
                      />
                      $10 - $20
                    </Text>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image src={TicketNumber} alt="location" />
                      100 tickets
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Divider border="1px solid" borderColor="gray.300" />
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
            <Box maxW="600px" w="100%">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing={6}>
                  <FormControl>
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                      <Radio
                        {...register("publishOption")}
                        value="publishLive"
                        size="lg"
                      />
                      <Box>
                        <Heading fontSize="md" fontWeight="medium">
                          Publish event live
                        </Heading>
                        <Text color="gray.600" fontSize="sm">
                          This will place your event publicly for all to see and
                          start purchasing tickets.
                        </Text>
                      </Box>
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Stack direction="row" spacing={3}>
                      <Radio
                        {...register("publishOption")}
                        value="publishDraft"
                        size="lg"
                      />
                      <Box>
                        <Heading fontSize="md" fontWeight="medium">
                          Publish event to draft
                        </Heading>
                        <Text color="gray.600" fontSize="sm">
                          This will not be public and you will be able to review
                          the event from your dashboard to make any changes
                          before going live again.
                        </Text>
                      </Box>
                    </Stack>
                  </FormControl>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </FormLayout>
  );
};

export default PublishEvent;
