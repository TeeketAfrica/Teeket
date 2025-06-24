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
import { formatAmount } from "../../../utils/utils";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const FinancesDashboardPage = () => {
    const toast = useToast();
    const [viewHistory, setViewHistory] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [requestPayment] = useState(true);

    const [revenueData, setRevenueData] = useState(null);
    const [revenueSummary, setRevenueSummary] = useState(null);

    useEffect(() => {
        const handleFetchRevenueSummary = async () => {
            try {
                let url = "/revenue/summary";

                const response = await teeketApi.get(url);
                const res = response.data;

                console.log(res)
                setRevenueSummary(res);
                setRevenueData(res.overview);
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message ||
                    "Unable to fetch revenue summary";
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

        handleFetchRevenueSummary();
    }, []);

    const exportToExcel = async () => {
        try {
            let url;
            if (!viewHistory) {
                url = "/revenue/export-csv";
            } else {
                url = "/payment-requests/export-csv";
            }
        
            // Fetch CSV data as text
            const response = await teeketApi.get(url, { responseType: 'text' });
            const csvData = response.data;

            const workbook = XLSX.read(csvData, { type: 'string' });

            const excelBuffer = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            // Create a Blob and download
            const blob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            !viewHistory? saveAs(blob, 'revenue-export.xlsx'): saveAs(blob, 'payment-request-history-export.xlsx');

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "Unable to export";
            toast({
                title: "Failed to export revenue",
                description: `${errorMessage}`,
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        }
    };

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
                <HStack width={{base:'100%', md:'350px'}} spacing="12px">
                    <Button
                        spacing={4}
                        gap={2}
                        variant="secondary"
                        width={{ base: "50%", md: "150px" }}
                        p={2}
                        onClick={exportToExcel}
                    >
                        <Export />
                        Export
                    </Button>
                    <Button
                        variant="primary"
                        p={2}
                        onClick={onOpen}
                        isDisabled={!revenueData?.total_revenue}
                    >
                        ₦ Request payment
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
                    revenueTotal={revenueData?.total_revenue || 0}
                    percentIncrease={formatAmount((revenueSummary?.percentage_change || 0), 2)}
                    desc={`${
                        revenueSummary?.gain_or_loss ? "increase" : "decrease"
                    } vs last revenue`}
                    growthRate={revenueSummary?.gain_or_loss}
                    color="grey500"
                />
                <RevenueCard
                    icon={AvailableRevenue}
                    revenueTitle="Available revenue"
                    revenueTotal={revenueData?.available_revenue || 0}
                    desc="You can request payment in after event completion"
                    color="blue.400"
                />
                <RevenueCard
                    icon={RemittedRevenue}
                    revenueTitle="Remitted revenue"
                    revenueTotal={revenueData?.remitted_revenue || 0}
                />
            </SimpleGrid>
            <RevenueTable viewHistory={viewHistory} setViewHistory={setViewHistory}/>
            <RequestPaymentModal
                isOpen={isOpen}
                onClose={onClose}
                requestPayment={requestPayment}
            />
        </DashboardLayout>
    );
};

export default FinancesDashboardPage;
