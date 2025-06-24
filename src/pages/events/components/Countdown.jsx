import { Text } from "@chakra-ui/react";
import { Box } from "iconsax-react";
import { useState, useEffect } from "react";
import WarningIcon from "../../../assets/icon/Warning.svg";

export const Countdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        (() => {
          const difference = new Date(endDate) - new Date();
          let timeLeft = {};

          if (difference > 0) {
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const hours = Math.floor((difference / 1000 / 60 / 60) % 24);

            timeLeft = {
              hours: hours < 10 ? `0${hours}` : hours,
              minutes: minutes < 10 ? `0${minutes}` : minutes,
            };
          } else {
            timeLeft = {
              hours: "00",
              minutes: "00",
            };
          }

          return timeLeft;
        })()
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);
  <div>
    Time left: {timeLeft.hours}:{timeLeft.minutes}
  </div>;

  return (
    <Box w="100%" display="flex" gap={3} alignItems="center">
      <WarningIcon />
      <Text color="gray.600" size={14}>
        Time left: 09:58
      </Text>
    </Box>
  );
};
