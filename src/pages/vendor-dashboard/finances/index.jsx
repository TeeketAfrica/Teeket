import {
    Button,
    HStack,
    SimpleGrid,
    Stack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import RevenueCard from "./components/RevenueCard";
import TotalRevenue from "../../../assets/icon/TotalRevenue.svg";
import RemittedRevenue from "../../../assets/icon/RemittedRevenue.svg";
import AvailableRevenue from "../../../assets/icon/AvailableRevenue.svg";
import RevenueTable from "./components/RevenueTable";
import RequestPaymentModal from "./components/RequestPaymentModal";
import { useEffect, useState } from "react";
import { teeketApi } from "../../../utils/api";

const FinancesDashboardPage = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [requestPayment] = useState(true);

    useEffect(() => {
        const handleFetchEvents = async () => {
            try {
                let url = "/revenue/overview";

                const response = await teeketApi.get(url);
                const res = response.data;
                console.log(res);
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || "Unable to fetch revenue";
                toast({
                    title: "Failed to fetch revenue",
                    description: `${errorMessage}`,
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
            }
        };

        handleFetchEvents();
    }, [toast]);

    return (
        <DashboardLayout>
            <Stack
                borderBottom="1px solid"
                borderColor="gray.300"
                direction={["column", "row"]}
                justifyContent="space-between"
                w="100%"
                alignItems="flex-start"
                pb={6}
                px={[4, 8]}
            >
                <DashboardPageHeaders
                    pageTitle="Finance"
                    subTitle="Get an overview of all event-related revenue"
                />
                <HStack spacing="12px">
                    <Button spacing={2} variant="secondary" p={2}>
                        <Export />
                        Export
                    </Button>
                    <Button variant="primary" p={2} onClick={onOpen}>
                        $ Request payment
                    </Button>
                </HStack>
            </Stack>
            <SimpleGrid
                columns={[1, 2, null, 3]}
                borderBottom="1px solid"
                borderColor="gray.300"
                spacing={6}
                w="100%"
                py={6}
                px={[4, 8]}
            >
                <RevenueCard
                    icon={TotalRevenue}
                    revenueTitle="Total revenue made"
                    revenueTotal="$40,000"
                    percentIncrease="20%"
                    desc="increase vs last revenue"
                    color="grey500"
                />
                <RevenueCard
                    icon={AvailableRevenue}
                    revenueTitle="Available revenue"
                    revenueTotal="$10,000"
                    desc="You can request payment in 4days time"
                    color="blue.400"
                />
                <RevenueCard
                    icon={RemittedRevenue}
                    revenueTitle="Remiited revenue"
                    revenueTotal="$40,000"
                />
            </SimpleGrid>
            <RevenueTable />
            <RequestPaymentModal
                isOpen={isOpen}
                onClose={onClose}
                requestPayment={requestPayment}
            />
        </DashboardLayout>
    );
};

export default FinancesDashboardPage;
