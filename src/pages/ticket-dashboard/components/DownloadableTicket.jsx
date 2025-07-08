import {
  Box,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectActiveUser } from "../../../features/activeUserSlice";
import TicketBg from "../../../assets/img/TicketBg.png";
import TicketCardIcon from "../../../assets/icon/TicketCardIcon.svg";
import { teeketApi } from "../../../utils/api";

const toBase64Image = async (url) => {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

const DownloadableTicket = ({
  eventTitle,
  eventTime,
  eventLocation,
  ticketQuantity,
  ticketType,
  ticketPrice,
  eventId,
  ticketId,
  ticketRef,
  orderId,
  eventImageUrl,
}) => {
  const activeUser = useSelector(selectActiveUser);
  const [logo, setLogo] = useState("");
  const [signature, setSignature] = useState("");
  const [hero, setHero] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loadingImages, setLoadingImages] = useState(true);

  const getQRSignature = async () => {
    try {
      const response = await teeketApi.get(`/events/tickets/qr-code?order_id=${orderId}`)
      setSignature(response.data.data.signature)
    } catch (error) {

    }
  }

  useEffect(() => {
    getQRSignature()
  }, [orderId])


  useEffect(() => {
    console.log('it got here', encodeURIComponent(`${signature}`))
    const loadImages = async () => {
      const logoBase64 = await toBase64Image(
        "https://res.cloudinary.com/doztcdg5v/image/upload/v1727911001/logo_q4sjwi.svg"
      );
      const heroBase64 = await toBase64Image(eventImageUrl);
      const qrBase64 = await toBase64Image(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          `${signature}`
        )}&size=150x150`
      );

      console.log(qrBase64)

      setLogo(logoBase64);
      setHero(heroBase64);
      setQrCode(qrBase64);
      setLoadingImages(false);
    };

    loadImages();
  }, [signature]);

  if (loadingImages) {
    return <Spinner size="xl" />;
  }

  return (
    <VStack ref={ticketRef} spacing={6} padding={8}>
      <Image src={logo} alt="Teeket Logo" />
      <Text fontSize={20} textAlign={"center"} fontWeight={800}>
        {`Hey, ${activeUser.first_name} you’ve booked a ticket for ${eventTitle}`}
      </Text>
      <Image maxH={200} w={'full'} src={hero} alt="Hero" />
      <Text color="gray.600">Here’s your ticket</Text>

      <Box
        bgImage={`url(${TicketBg})`}
        bgSize="cover"
        bgColor="black"
        bgPosition="center center"
        borderRadius={16}
        p={[2, 3]}
        h="600px"
        w="400px"
      >
        <Box
          bgColor="gray.100"
          w="full"
          h="full"
          borderRadius={8}
          p={[3, 6]}
        >
          <VStack w="full" alignItems="flex-start" spacing={5}>
            <Box>
              <TicketCardIcon />
              <Heading fontWeight={700} fontSize={24} lineHeight="28.8px">
                {eventTitle}
              </Heading>
              <Text color="gray.600">{eventTime}</Text>
              <Text color="gray.600">{eventLocation}</Text>
            </Box>
            <Divider border="1px dashed" borderColor="gray.400" />
            <HStack width="full">
              <Box>
                <Text fontSize={12} color="gray.600">
                  Guest Name
                </Text>
                <Text fontSize={12} fontWeight={600}>
                  {activeUser.first_name} {activeUser.last_name}
                </Text>
              </Box>
              <Box>
                <Text fontSize={12} color="gray.600">
                  Guest Email
                </Text>
                <Text fontSize={12} fontWeight={600}>
                  {activeUser.email}
                </Text>
              </Box>
            </HStack>
            <Divider border="1px dashed" borderColor="gray.400" />
            <Box>
              <Text fontSize={12} color="gray.600">
                Ticket purchased
              </Text>
              <Text fontSize={12} color="gray.600" fontWeight={600}>
                {ticketQuantity} X{" "}
                <Text color="gray.800" as="span">
                  {ticketType}{" "}
                </Text>
                <Text color="gray.800" as="span">
                  @$ {ticketPrice}
                </Text>
              </Text>
            </Box>
            <Divider border="1px dashed" borderColor="gray.400" />
            <Image
              src={qrCode}
              alt="QR Code"
              w="165px"
              h="165px"
              my={6}
              mx="auto"
            />
          </VStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default DownloadableTicket;
