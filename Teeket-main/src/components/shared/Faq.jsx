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
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How does billing work?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30 minute onboarding call to get you up and running as soon as possible.",
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
