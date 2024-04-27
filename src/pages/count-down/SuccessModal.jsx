import {
  Center,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import FacebookIcon from "../../assets/icon/FacebookIcon.svg";
import TwitterIcon from "../../assets/icon/TwitterIcon.svg";
import InstagramIcon from "../../assets/icon/InstagramIcon.svg";
import LinkedInIcon from "../../assets/icon/LinkedInIcon.svg";
import SuccessIcon from "../../assets/icon/SuccessIcon.svg";

const SuccessModal = ({ isOpen, onClose }) => {
  const socialLinks = [
    {
      img: FacebookIcon,
      link: "https://facebook.com/teeketafrica",
      alt: "facebook",
    },
    {
      img: TwitterIcon,
      link: "https://twitter.com/Teeketafrica",
      alt: "twitter",
    },
    {
      img: InstagramIcon,
      link: "https://instagram.com/teeketafrica",
      alt: "instagram",
    },
    {
      img: LinkedInIcon,
      link: "https://linkedin.com/company/teeketafrica",
      alt: "linkedin",
    },
  ];

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody py={5}>
          <Center mb={5}>
            <Image src={SuccessIcon} alt="success" />
          </Center>
          <Text fontWeight="600" fontSize={18} textAlign="center" mb="1rem">
            Welcome to the Teeket Family
          </Text>
          <Text fontSize={14} color="gray.600" textAlign="center">
            You have successfully joined the waitlist. We will share updates
            with you and notify you of our progress to our product
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <HStack spacing={6}>
            {socialLinks.map((link, i) => (
              <Link key={i} href={link.link} target="_blank">
                <Image src={link.img} alt={link.alt} />
              </Link>
            ))}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
