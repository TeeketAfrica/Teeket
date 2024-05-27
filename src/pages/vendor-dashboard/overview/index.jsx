import { useNavigate } from "react-router-dom";
import {
  Stack,
  HStack,
  VStack,
  Avatar,
  AvatarGroup,
  Box,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import BoxFrame from "../../../components/layouts/BoxFrame";

import PlusLight from "../../../assets/icon/Plus-light.svg";
import PlusDark from "../../../assets/icon/Plus-dark.svg";
import ChartUp from "../../../assets/icon/Chart-up.svg";
import AIStar from "../../../assets/icon/AI-star.svg";
import Ticket from "../../../assets/icon/Ticket-green.svg";
import Gain from "../../../assets/icon/Arrow-up.svg";

const OverviewDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Overview"
        subTitle="View your organizations summary"
      />
      <HStack
        alignItems="flex-start"
        flexDirection={{ sm: "column", xl: "row" }}
        gap="5"
        padding="8"
      >
        <VStack width="100%" gap="8">
          <BoxFrame backgroundColor="gray.800" color="gray.100">
            <Box
              height="162px"
              width="100%"
              backgroundColor="rgba(255, 255, 255, 0.10)"
              borderRadius="12"
              marginBottom="6"
            >
              <HStack
                height="100%"
                justifyContent="space-between"
                paddingX="3"
                paddingY="4"
              >
                <VStack alignItems="flex-start" gap="0" height="100%">
                  <Text fontSize="md">Your earnings</Text>
                  <Text fontSize="5xl" fontWeight="bold">
                    <Text as="span">$</Text>
                    <Text as="span">40,000</Text>
                  </Text>
                  <HStack fontSize="sm" fontWeight="medium" marginTop="auto">
                    <HStack>
                      <Image src={Gain} alt="Arrow-up icon" />
                      <Text as="span" color="green.400">
                        40%
                      </Text>
                    </HStack>
                    <Text>vs last month</Text>
                  </HStack>
                </VStack>
                <Box>Chart</Box>
              </HStack>
            </Box>
            <HStack justifyContent="space-between">
              <Text fontWeight="semibold" color="rgba(255, 255, 255, 0.75)">
                Your revenue from 3 events last month
              </Text>
              <AvatarGroup direction="row" size="sm" max={3} spacing="-1rem">
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  variant="roundedSquare"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                  variant="roundedSquare"
                />
                <Avatar
                  name="Kent Dodds"
                  src="https://bit.ly/kent-c-dodds"
                  variant="roundedSquare"
                />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                  variant="roundedSquare"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                  variant="roundedSquare"
                />
              </AvatarGroup>
            </HStack>
          </BoxFrame>
          <BoxFrame backgroundColor="gray.100" color="gray.800">
            <VStack
              height="107px"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Event
              </Text>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  0
                </Text>
              </Box>
            </VStack>
          </BoxFrame>
          <BoxFrame backgroundColor="gray.100" color="gray.800">
            <VStack
              height="107px"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Ticket Sold
              </Text>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  230
                </Text>
              </Box>
            </VStack>
          </BoxFrame>
        </VStack>
        <VStack width="100%" gap="8">
          <BoxFrame backgroundColor="gray.100" color="gray.800">
            <Stack width="100%" minHeight="286px">
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  Analytics
                </Text>
                <HStack>
                  <HStack gap="6px">
                    <Box
                      width="8px"
                      height="8px"
                      borderRadius="full"
                      backgroundColor="gray.800"
                    ></Box>
                    <Text fontSize="sm" color="gray.600">
                      Sales
                    </Text>
                  </HStack>
                  <HStack gap="6px">
                    <Box
                      width="8px"
                      height="8px"
                      borderRadius="full"
                      backgroundColor="green.500"
                    ></Box>
                    <Text fontSize="sm" color="gray.600">
                      Visits
                    </Text>
                  </HStack>
                </HStack>
              </HStack>
              <VStack flexGrow="1" justifyContent="center">
                <Image src={ChartUp} alt="chart-up icon" />

                <Text
                  as="h4"
                  fontSize="md"
                  fontWeight="semibold"
                  color="gray.800"
                >
                  No sales analytics
                </Text>
                <Text fontSize="sm">
                  You will get some analytics here from event sales
                </Text>
                <Button
                  leftIcon={<Image src={PlusLight} alt="Plus icon" />}
                  size="sm"
                  variant="primary"
                  marginTop={6}
                  onClick={() => navigate("/app/create-event")}
                >
                  Create Event
                </Button>
              </VStack>
            </Stack>
          </BoxFrame>
          <BoxFrame backgroundColor="gray.100" color="gray.800">
            <Stack width="100%" minHeight="286px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Quick Action
              </Text>

              <HStack flexGrow="1">
                <BoxFrame backgroundColor="gray.800" color="gray.100">
                  <VStack
                    alignItems="self-start"
                    height="232px"
                    justifyContent="flex-end"
                    gap="13px"
                  >
                    <Image src={AIStar} alt="AI star icon" />
                    <Text fontSize="md" fontWeight="semibold">
                      Create an event and make it unforgettable!
                    </Text>
                    <Button
                      leftIcon={<Image src={PlusDark} alt="Plus icon" />}
                      size="sm"
                      variant="secondary"
                      marginTop={6}
                      onClick={() => navigate("/app/create-event")}
                    >
                      Create Event
                    </Button>
                  </VStack>
                </BoxFrame>
                <BoxFrame backgroundColor="gray.200" color="gray.800">
                  <VStack
                    alignItems="self-start"
                    height="232px"
                    justifyContent="flex-end"
                    gap="13px"
                  >
                    <Image src={Ticket} alt="Ticket icon" />
                    <Text fontSize="md" fontWeight="semibold">
                      Don &apos; t miss out - check your orders
                    </Text>
                    <Button
                      size="sm"
                      variant="secondary"
                      marginTop={6}
                      isDisabled={true}
                    >
                      Open Order
                    </Button>
                  </VStack>
                </BoxFrame>
              </HStack>
            </Stack>
          </BoxFrame>
        </VStack>
      </HStack>
    </DashboardLayout>
  );
};

export default OverviewDashboardPage;
