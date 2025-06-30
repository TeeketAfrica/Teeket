import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Box,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import Container from "@/components/ui/Container";
import MinusCircle from "@/assets/icon/MinusCircle.svg";
import PlusCircle from "@/assets/icon/PlusCircle.svg";

export const Faq = ({ children }) => {
  const FAQSInfo = [
    {
      question: "How do I create an event on Teeket?",
      answer:
        "Creating events on Teeket is refreshingly simple. Our intuitive event creation form lets you set up an experience in just a few clicks,  from naming your event to setting date, time, location, ticketing, and even payment options. You don’t need to be tech-savvy — just bring your idea, and we’ll handle the rest.",
    },
    {
      question: "Can I track how well my event is doing?",
      answer:
        "Yes! Teeket gives you a clear, data-driven dashboard where you can track ticket sales, attendee engagement, and registration trends in real-time. Whether you're a seasoned creator or just starting out, you'll have the insights you need to grow your event, optimize pricing, and increase impact.",
    },
    {
      question: "How do I find events that match my interests?",
      answer:
        "Teeket’s powerful search and discovery tools let you filter events by type, date, location, and keywords. Whether you’re into fitness, tech, art, or spiritual gatherings, Teeket helps you discover meaningful events tailored to your lifestyle, values, and vibe — so you never miss out on what matters to you.",
    },
    {
      question: "Is it easy and safe to buy tickets on Teeket?",
      answer:
        "Absolutely. Teeket offers seamless, secure ticketing with guest checkout options, card payments via Stripe, and zero hidden fees. Whether you’re a frequent event-goer or just dropping in for one special occasion, you can book tickets in seconds and with full confidence.",
    },
    {
      question: "What happens when I arrive at an event? Will there be queues?",
      answer:
        "No more standing in line! Teeket’s registration system is designed for smooth check-ins and quick access. Simply show your e-ticket and you’re in. We make sure the focus is on the experience — not the wait.",
    },
    {
      question: "What kind of events can I attend on Teeket?",
      answer:
        "From niche workshops to big festivals, from healing retreats to creative showcases — Teeket is your gateway to emotionally rich, culturally resonant events. Whether you're showing up solo or with friends, you'll find experiences that spark connection, discovery, and joy.",
    },
  ];
  return (
    <Box backgroundColor="gray.200" py={{ base: "11", md: "13" }}>
      <Container padding={"16px"}>
        <VStack gap="5" marginBottom="11" textAlign="center">
          <Text
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "xl", md: "6xl" }}
            lineHeight={{ base: "6", md: "10" }}
            color="gray.800"
          >
            Frequently asked questions
          </Text>
          <Text
            color="gray.600"
            fontWeight="normal"
            fontSize={{ base: "md", md: "xl" }}
            lineHeight={{ base: "6", md: "26px" }}
          >
            Everything you need to know about the product and billing.
          </Text>
        </VStack>

        <Box maxWidth="768px" marginX="auto" marginBottom="11">
          <Accordion allowToggle>
            {FAQSInfo.map((data, idx) => (
              <AccordionItem
                key={data.question}
                borderColor="#EAECF0"
                borderTop={idx === 0 && "none"}
                borderBottom={idx === FAQSInfo.length - 1 && "none"}
              >
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton
                        _hover={{ bg: "none" }}
                        _expanded={{ bg: "none", pb: "0" }}
                        pt={6}
                        pb={8}
                        pl={0}
                      >
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="medium"
                          fontSize={{ base: "md", md: "lg" }}
                          color="gray.800"
                          lineHeight={{ base: "6", md: "7" }}
                        >
                          {data.question}
                        </Box>
                        {isExpanded ? (
                          <Box w={5}>
                            <MinusCircle />
                          </Box>
                        ) : (
                          <PlusCircle fillColor="#06CC06" size="24" />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pt={2}
                      pb={8}
                      pl={0}
                      fontWeight="normal"
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.600"
                      lineHeight={{ base: "5", md: "6" }}
                    >
                      {data.answer}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        {children}
      </Container>
    </Box>
  );
};
