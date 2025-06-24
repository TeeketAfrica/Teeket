import{
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  HStack,
  Image,
  Divider,
  Container,
      Avatar,
  Tag,
} from "@chakra-ui/react";
import SearchIconEmpty from "../../../../assets/icon/SearchIconEmpty.svg";
import { filterPolicy, formatEventDateRange } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { teeketApi } from "../../../../utils/api";
import { Button } from "@chakra-ui/button";
import EmptyState from "../../../../components/ui/EmptyState";

const PreviewScanned = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState()

    const fetchOrder = async()=>{
        if (id !== ('All tickets have been scanned' | 'This QR code is invalid')){
            try {
            const response = await teeketApi.get(`/orders/${id}`)
                setOrder(response.data)
            } catch (error) {
            
            }             
        }

        
    }

  useEffect(()=>{
    fetchOrder()
  }, [])

  return (
    <Box 
        display={'flex'}
        justifyContent={'center'}
        width={'100%'}
        height={'100vh'}
        alignContent={'center'}
    >
        {
            id ==='All tickets have been scanned'?
            <Box mt={6}>
                <EmptyState
                    maxW="350px"
                    icon={SearchIconEmpty}
                    title="All tickets has been scanned"
                    desc={
                        <Text
                            fontSize={14}
                            color="gray.600"
                            textAlign="center"
                        >
                            All Tickets for this event has been scanned. Kindly contact event host
                        </Text>
                    }
                    outlineBtn="Scan Ticket"
                    primaryBtn="Back To Dashboard"
                    outlineOnClick={() => {
                    navigate(`/app/scan-to-attend`);
                }}
                    primaryOnClick={() => navigate("/app/overview")}
                />
            </Box>:
            id ==='This QR code is invalid'?
            <Box mt={6}>
                <EmptyState
                    maxW="350px"
                    icon={SearchIconEmpty}
                    title="Invalid QR Code"
                    desc={
                        <Text
                            fontSize={14}
                            color="gray.600"
                            textAlign="center"
                        >
                            The QR code you scanned is invalid. Kindly contact event host.
                        </Text>
                    }
                    outlineBtn="Scan Ticket"
                    primaryBtn="Back To Dashboard"
                    outlineOnClick={() => {
                    navigate(`/app/scan-to-attend`);
                }}
                    primaryOnClick={() => navigate("/app/overview")}
                />
            </Box>:
            order ?
            <Box width={{base:'100%', md:'80%', lg:'60%'}}>



                <Box
                position="relative"
                borderRadius={16}
                border="1px solid"
                borderColor="border2"
                bgColor="black"
                bg="bgGradient"
                h="auto"
                boxShadow="0px 2px 20px 6px rgba(0, 0, 0, 0.25), 0px 0.5px 0px 3px rgba(255, 255, 255, 0.50), 0px 0px 0px 2px #000, 0px 20px 50px 0px rgba(255, 255, 255, 0.20) inset"
                bgSize="cover"
                bgPosition="top left"
                my={8}
                >

                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bgImage={`url(${order?.img || order?.event.banner_image})`}
                    bgSize="cover"
                    bgPosition="center"
                    zIndex={-1}
                />
                <HStack
                    px={6}
                    justifyContent="space-between"
                    borderBottom="1px solid"
                    borderColor="utilityLight100"
                    gap={6}
                >
                    <Box
                    borderRight="1px solid"
                    borderColor="utilityLight100"
                    pr={6}
                    pt={6}
                    pb={4}
                    w="100%"
                    zIndex={1}
                    >
                    <Text color="limeGreen" fontWeight={600} fontSize={14}>
                        {order?.ticketType || order?.event.type} ticket
                    </Text>
                    <Text fontWeight={700} color="white" fontSize={20}>
                        {order?.eventTitle||order?.event.title}
                    </Text>
                    <Container maxW="300px" px={0} mx={0}>
                        <Text fontSize={14} color="utilityLight200">
                        {order?.event.description}
                        </Text>
                    </Container>
                    </Box>
                    <Box w={149}>
                    <Image
                        src={order?.img || order?.event.banner_image}
                        alt={order?.eventTitle}
                        w={101}
                        h={101}
                    />
                    </Box>
                </HStack>
                </Box>
                <Box>

                    <HStack gap="11px">
                    <Avatar
                        border="1px solid"
                        borderColor="gray.800"
                        color="gray.800"
                        name={order?.attendeeName || order?.attendee.first_name}
                        src={order?.attendeeAvatar || order?.attendee.profile_image}
                        bgColor="transparent"
                    />
                    {/* <Image
                        src={order?.attendeeAvatar || order?.attendee.profile_image}
                        alt={order?.attendeeName}
                        w={10}
                        h={10}
                    /> */}
                    <Text fontWeight={700} fontSize="lg">
                        {order?.attendeeName || (`${order?.attendee.first_name} ${order?.attendee.last_name}`)}’s
                    </Text>
                    </HStack>

                    <HStack justifyContent="space-between" mt={6}>
                        <Text fontWeight={500}>Order ID</Text>
                        <Text color="gray.600">{order?.orderId || order?.order_no}</Text>
                    </HStack>
                    <Divider borderColor="gray.300" my={2} />
                    <HStack justifyContent="space-between">
                        <Text fontWeight={500}>Ticket type</Text>
                        <Text color="gray.600">{order?.ticketType || order?.ticket.name}</Text>
                    </HStack>
                    <Divider borderColor="gray.300" my={2} />
                    <HStack justifyContent="space-between">
                        <Text fontWeight={500}>Ticket Cost</Text>
                        <Text color="gray.600">{order?.ticketCost || order?.ticket.price}</Text>
                    </HStack>
                    <Divider borderColor="gray.300" my={2} />
                    <HStack justifyContent="space-between">
                        <Text fontWeight={500}>Purchase date</Text>
                        <Text color="gray.600">{order?.created || order?.date_created.split('T')[0]}</Text>
                    </HStack>
                </Box> 
                <Box mt={6}>
                    <HStack w="full">
                        <Button
                            w="50%"
                            variant="primary"
                            onClick={() => {
                                    navigate(`/app/scan-to-attend`);
                                }}
                        >
                            New Scanning
                        </Button>

                    <Button
                        w="50%"
                        variant="outline"
                        onClick={() => {
                        navigate(`/app/overview`);
                        }}
                    >
                        Back to Dashboard
                    </Button>
                    </HStack>
                </Box>           
            </Box>
            :
            <Box mt={6}>
                                <EmptyState
                                    maxW="350px"
                                    icon={SearchIconEmpty}
                                    title="No Order Found"
                                    desc={
                                        <Text
                                            fontSize={14}
                                            color="gray.600"
                                            textAlign="center"
                                        >
                                            Opps, Something Went Wrong.
                                        </Text>
                                    }
                                    outlineBtn="Scan Ticket"
                                    primaryBtn="Back To Dashboard"
                                    outlineOnClick={() => {
                                    navigate(`/app/scan-to-attend`);
                                }}
                                    primaryOnClick={() => navigate("/app/overview")}
                                />
            </Box>
        }    
    </Box>

       
  );
};

export default PreviewScanned;
