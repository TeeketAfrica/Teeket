import { Box, Container, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Tou = () => {
    return (
        <Box backgroundColor="gray.200" py={{ base: "11", md: "13" }} px={{ base: "6", md: "12" }} height="100%">
            <VStack spacing={8} textAlign="justify" alignItems="flex-start">
                <Text
                    as="h2"
                    fontWeight="bold"
                    fontSize={{ base: "xl", md: "6xl" }}
                    lineHeight={{ base: "6", md: "10" }}
                    color="gray.800"
                    alignSelf={"center"}
                >
                    Teeket Terms of Use
                </Text>
                <Text
                    color="gray.600"
                    fontWeight="normal"
                    fontSize={{ base: "md", md: "xl" }}
                    lineHeight={{ base: "6", md: "26px" }}
                >
                    These Terms of Use (“Terms”) govern your access to and use of the services, websites, and applications offered by Teeket, a product of Sppace Brand and Design LTD (“we”, “us”, “our”, or “Teeket”). Please read these Terms carefully, and contact us if you have any questions. By accessing or using Teeket, you agree to be bound by these Terms and our Privacy Policy.
                    If you are using Teeket on behalf of an organization or entity (“Organization”), then you are agreeing to these Terms on behalf of that Organization, and you represent and warrant that you have the authority to bind the Organization to these Terms. In that case, “you” and “your” refers to you and the Organization.

                </Text>
                {termsSections.map((section, index) => (
                    <Box key={index}>
                        <Text
                            as="h3"
                            fontWeight="bold"
                            fontSize={{ base: "lg", md: "2xl" }}
                            mt={6}
                            mb={2}
                            color="gray.800"
                        >
                            {section.title}
                        </Text>
                        {section.paragraphs.map((p, i) => (
                            <Text key={i} color="gray.600" fontSize={{ base: "sm", md: "md" }} mb={2}>
                                {p}
                            </Text>
                        ))}
                    </Box>
                ))}
            </VStack>
        </Box>
    )
}

const termsSections = [
    {
        title: "1. Our Service",
        paragraphs: [
            "Teeket is a platform that allows people to create and manage events, sell or distribute tickets, and build communities through intentional and personalized experiences. We provide the tools; however, we do not create, organize, or own the events listed on Teeket. The event creator (“Host”) is solely responsible for the event and its associated activities.",
            "Unless explicitly stated otherwise by Teeket, Teeket’s responsibilities are limited to providing access to the platform for Hosts and Attendees."
        ]
    },
    {
        title: "2. Access and Use",
        paragraphs: [
            "Subject to these Terms and our policies, we grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services.",
            "You agree not to:",
            "Use the Service for any illegal purpose;",
            "Violate any laws in your jurisdiction (including but not limited to copyright laws);",
            "Use our platform to distribute unsolicited communications or spam;",
            "Collect or harvest any personally identifiable information without consent;",
            "Interfere with or disrupt the integrity or performance of the platform;",
            "Use automated systems (e.g., bots, scrapers) without express permission.",
            "We reserve the right to modify, suspend, or terminate your access to the platform at our discretion and without prior notice."
        ]
    },
    {
        title: "3. Accounts",
        paragraphs: [
            "To access certain features, you must create an account. You are responsible for:",
            "Maintaining the confidentiality of your account credentials;",
            "All activities under your account;",
            "Promptly notifying us of any unauthorized access or use.",
            "You must be at least 16 years old or the age of majority in your jurisdiction, whichever is higher, to use the Service.",
            "We may suspend or terminate your account if you violate any provision of these Terms."
        ]
    },
    {
        title: "4. Events and Tickets",
        paragraphs: [
            "Teeket provides tools for Hosts to manage event registration and ticketing. Teeket is not responsible for the quality, timing, legality, or safety of the events.",
            "When you purchase or reserve a ticket through Teeket, you are entering into a direct agreement with the Host. Teeket is not a party to this agreement and is not responsible for its enforcement.",
            "Refunds, cancellations, and event changes are subject to the Host’s policies. If a Host cancels an event or fails to deliver, your sole recourse is with the Host."
        ]
    },
    {
        title: "5. Payments and Fees",
        paragraphs: [
            "If you are a Host using Teeket to collect payments, you must provide accurate payment information through our third-party payment processor. You are responsible for all applicable taxes and fees associated with ticket sales and your use of the Service.",
            "Teeket may charge service fees to Hosts and/or Attendees. All fees will be clearly disclosed prior to payment. You authorize Teeket and its payment processor to deduct fees from your transactions.",
            "You agree not to circumvent Teeket’s fees by encouraging users to transact outside of the platform."
        ]
    },
    {
        title: "6. Content",
        paragraphs: [
            "You may submit content to the platform, including event details, communications, images, videos, and other materials (“User Content”). You retain ownership of your User Content.",
            "By submitting User Content to Teeket, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, and display such content on the platform and in marketing materials.",
            "You are solely responsible for the content you post. You agree not to submit any content that:",
            "Is false, misleading, or deceptive;",
            "Infringes on any third-party rights;",
            "Contains viruses, malware, or harmful code;",
            "Is defamatory, obscene, or otherwise objectionable.",
            "We reserve the right to remove any content that violates these Terms or our policies."
        ]
    },
    {
        title: "7. Intellectual Property",
        paragraphs: [
            "All intellectual property rights in the Service, including the website, software, and branding, are owned by or licensed to Sppace Brand and Design LTD.",
            "You may not:",
            "Copy, modify, distribute, sell, or lease any part of our Services;",
            "Reverse engineer or attempt to extract source code;",
            "Use our branding or trademarks without our permission.",
            "If you believe your intellectual property rights have been violated, contact us at Privacy@teeketafrica.com."
        ]
    },
    {
        title: "8. Privacy",
        paragraphs: [
            "Your use of Teeket is subject to our Privacy Policy. Please review the policy to understand how we collect, use, and share your information.",
            "You agree not to use the personal information of other users for purposes not explicitly authorized under these Terms.",
            "If you upload personal data (such as guest lists), you represent that you have obtained all necessary consents required under applicable laws."
        ]
    },
    {
        title: "9. Third-Party Services",
        paragraphs: [
            "Our Service may contain links to third-party services, applications, or websites. We are not responsible for the content, privacy policies, or practices of any third-party services.",
            "Your use of third-party services is at your own risk and subject to their terms and conditions."
        ]
    },
    {
        title: "10. Termination",
        paragraphs: [
            "We may suspend or terminate your access to Teeket at any time for any reason, including if you violate these Terms or engage in conduct that we deem harmful to the platform.",
            "Upon termination, all rights granted to you under these Terms will cease immediately.",
            "Provisions that by their nature should survive termination (e.g., intellectual property, indemnification, limitations of liability) will remain in effect."
        ]
    },
    {
        title: "11. Disclaimers",
        paragraphs: [
            "The Service is provided “as is” and “as available,” without warranties of any kind, express or implied.",
            "We disclaim all warranties, including but not limited to:",
            "Fitness for a particular purpose;",
            "Non-infringement;",
            "Availability, reliability, or accuracy of the Service.",
            "We are not responsible for any damage, loss, or liability resulting from your use of the Service."
        ]
    },
    {
        title: "12. Limitation of Liability",
        paragraphs: [
            "To the maximum extent permitted by law, Teeket and Sppace Brand and Design LTD shall not be liable for any:",
            "Indirect, incidental, special, consequential, or punitive damages;",
            "Loss of profits, data, or goodwill;",
            "Damages exceeding the amount paid to us in the previous 6 months.",
            "This limitation applies regardless of the legal theory and even if we have been advised of the possibility of such damages.",
            "Some jurisdictions do not allow limitations of liability, so some of the above may not apply to you."
        ]
    },
    {
        title: "13. Indemnification",
        paragraphs: [
            "You agree to indemnify, defend, and hold harmless Teeket, Sppace Brand and Design LTD, and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:",
            "Your use of the Service;",
            "Your User Content;",
            "Your violation of these Terms;",
            "Your violation of any rights of another."
        ]
    },
    {
        title: "14. Governing Law",
        paragraphs: [
            "These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.",
            "Any dispute arising from these Terms or your use of the Service shall be resolved exclusively in the courts of Lagos State, Nigeria."
        ]
    },
    {
        title: "15. Changes to the Terms",
        paragraphs: [
            "We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on the site.",
            "Your continued use of the Service after changes become effective constitutes your agreement to the updated Terms."
        ]
    },
    {
        title: "16. Miscellaneous",
        paragraphs: [
            "These Terms constitute the entire agreement between you and Teeket regarding the Service and supersede all prior agreements.",
            "If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
            "You may not assign or transfer your rights under these Terms without our prior written consent.",
            "Our failure to enforce any provision shall not constitute a waiver of that right."
        ]
    },
    {
        title: "17. Contact",
        paragraphs: [
            "If you have questions or concerns about these Terms, contact us at:",
            "Sppace Brand and Design LTD",
            "📍 Lagos, Nigeria",
            "📧 Support@teeketafrica.com"
        ]
    }
];

export default Tou
