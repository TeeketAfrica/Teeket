import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ModalFlake from "../../../assets/icon/ModalFlake.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectEventPreference, setUserEventPreference } from "../../../features/eventSlice";
import { teeketApi } from "../../../utils/api";
import { set } from "zod";

const EventPreference = ({ isOpen, onClose }) => {
  const toast = useToast()
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [availablePrefs, setAvailablePrefs] = useState([]);
  const dispatch = useDispatch()

  const handleAddPref = (pref) => {
    console.log(pref)
    setSelectedPrefs((prev) =>
      prev.includes(pref)
        ? prev.filter((p) => p !== pref) // deselect
        : [...prev, pref] // select
    );
  };
  const userPreferences  = useSelector(selectEventPreference)

  const fetchAvailablePreference = useCallback(async () => {
    try {
      let url = "/tags?page_size=100";
      const response = await teeketApi.get(url);
      if (response.data.success) {
        setAvailablePrefs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching available preferences:", error);
    }
  }, []);

  const fetchUserPreference = useCallback(async () => {
    try {
      const response = await teeketApi.get(`/user/event_preferences`);
      const preferences = response.data.event_preference;
      dispatch(setUserEventPreference(preferences));
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  }, [dispatch]);

  const handleSavePreference = async()=>{
    const params = {event_preference:selectedPrefs}
        try {
          console.log(params)
          const response = await teeketApi.patch(`/user/event_preferences`, params);
                toast({
                    title: "Updatd Event Preference",
                    description: "Your event preferences has been updated successfully.",
                    status: "success",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
          fetchAvailablePreference()
          onClose();

    } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || "An error occured";
                toast({
                    title: "Failed to save User Preference.",
                    description: `${errorMessage}`,
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
      console.error("Error saving events preference:", error);
    }
  };

  useEffect(()=>{
    fetchUserPreference()
  },[])

  useEffect(()=>{
    if(availablePrefs.length < 1){
      fetchAvailablePreference()
    }
  },[availablePrefs])

  useEffect(()=>{
    if(userPreferences){
      setSelectedPrefs(userPreferences.map((i)=>i.id))
    }
  },[userPreferences])

  const isSelected = (pref) => selectedPrefs.includes(pref);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack>
            <ModalFlake width={42} />
            <Text fontSize={24} fontWeight={700} lineHeight="28.8px">
              Choose your preference
            </Text>
            <Text textAlign="center" fontWeight={400} fontSize={14} mb="1rem">
              We would like to know what kinds of events you’re drawn to, so we
              can build personalized suggestions for you.
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrap spacing={3}>
            {availablePrefs?.map((pref, i) => (
              <WrapItem
                key={pref.id}
                onClick={() => handleAddPref(pref.id)}
                cursor="pointer"
                p="10px"
                borderRadius={48}
                border="1px solid"
                borderColor={isSelected(pref.id) ? "black" : "gray.300"}
                bg={isSelected(pref.id) ? "black" : "transparent"}
                color={isSelected(pref.id) ? "white" : "gray.600"}
                _hover={
                  !isSelected(pref.id)
                    ? {
                        backgroundColor: "black",
                        color: "white",
                        borderColor: "black",
                      }
                    : {}
                }
              >
                <Text
                  fontSize={14}
                  fontWeight={isSelected(pref) ? 600 : 500}
                >
                  {pref.label}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        </ModalBody>
        <ModalFooter>
          <HStack w="full">
            <Button w="50%" variant="outline" onClick={onClose}>
              Skip
            </Button>
            <Button
              w="50%"
              variant="primary"
              onClick={() => {
                handleSavePreference();
              }}
            >
              Save preference
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventPreference;
