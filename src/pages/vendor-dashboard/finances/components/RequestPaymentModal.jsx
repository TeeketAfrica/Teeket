import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import DollarsIcon from "../../../../assets/icon/DollarsIcon.svg";
import RequestDollarFailed from "../../../../assets/icon/RequestDollarFailed.svg";
import { useEffect, useState } from "react";
import { teeketApi } from "../../../../utils/api";
import { useToast } from "@chakra-ui/react";

const RequestPaymentModal = ({ isOpen, onClose, requestPayment }) => {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [revenueId, setRevenueId] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

   const handleChecked = (amount, id, isChecked) => {
    if(isChecked){
      setTotal((prev) => Number(prev) + Number(amount));
      setRevenueId(prevIds =>
        prevIds.includes(id) ? [...prevIds] : [...prevIds, id]
      );
    }
    else{
      setTotal(prev => Number(prev) - Number(amount));
      setRevenueId(prevIds => prevIds.filter(revId => revId !== id));
    }
  };

  const sendRequest = async ()=> {
    setLoading(true);
    if(revenueId.length < 1){
      toast({
          title: "Failed to perform payment request",
          description: `You must select an event with due payment before request`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
      });
      setLoading(false);
      return;
    }
    try{
      let url = "/payment-requests";
      const response = await teeketApi.post(url, {
        "revenue_ids": revenueId,
      })
      if(response.status === 201){
        toast({
            title: "Payment request sent successfully",
            description:
                "You have successfully sent a payment request. Payment will be made within 24hours after your request has been processed",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top-right",
        })
      }
    }
    catch(error){
      console.log(error)
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
          title: "Failed to perform payment request",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
      });
      setLoading(false)
    }
  }

  useEffect(()=>{
    const handleFetchEvents = async () => {
      try {
          let url = "/revenue";
          const response = await teeketApi.get(url);
          const res = response.data.data;

          setEvents(res);

      } catch (error) {
          console.log(error);

          const errorMessage =
              error?.response?.data?.message || "An error occured";
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
  }, [])

  useEffect(()=>{
    if(!isOpen){
      setTotal(0);
      setRevenueId([]);
    }
  }, [isOpen])

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      borderRadius={12}
    >
      <ModalOverlay />
      {requestPayment ? (
        <ModalContent>
          <ModalHeader>
            <DollarsIcon />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={600} fontSize={18} mb="1rem">
              Request payment
            </Text>

            <Text fontSize={14} mb="1rem" color="gray.600">
              Your current events with due payment brings a total of{" "}
              <Text as="span" fontWeight={700}>
                ${events.filter(event => event.status === "due").reduce((sum, event) => sum + Number(event?.amount || 0), 0)}
                ${events.filter(event => event.status === "due").reduce((sum, event) => sum + Number(event?.amount || 0), 0)}
              </Text>
              . All payment will be made within 24hours after your request.
            </Text>
            {
              events && (
                events.filter(event => event.status === "due").map((dueEvent, i)=>(
                  <HStack alignItems="flex-start" mb={4} key={i}>
                    <Checkbox onChange={(e) => handleChecked(dueEvent?.amount, dueEvent?.id, e.target.checked)}/>
                    <Box>
                      <Text fontWeight={500}>{dueEvent?.event?.title}</Text>
                      <Text fontSize={14} color="gray.600">
                        <Text as="span" fontWeight={600}>
                          ${dueEvent?.amount}
                        </Text>
                      </Text>
                    </Box>
                  </HStack>
              ))
              )
            }
            <Divider border="1px solid" my={5} borderColor="gray.300" />
            <HStack justifyContent="space-between">
              <Text color="gray.600" fontSize={14}>
                Total revenue requested
              </Text>
              <Text fontSize={14} fontWeight={500}>
                ${total || 0}
                ${total || 0}
              </Text>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              colorScheme="blue"
              w="100%"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button variant="primary" w="100%" onClick={sendRequest} disabled={loading}>
              Send request
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <RequestDollarFailed />
              <Text fontWeight={600} fontSize={18} mb="1rem">
                You can’t request payment yet
              </Text>
              <Text fontSize={14} mb="1rem" color="grey500" textAlign="center">
                The available payment is still connected to an event that is
                till ongoing. All requests should be made after your event is
                concluded.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary" w="100%">
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default RequestPaymentModal;
