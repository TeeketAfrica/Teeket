import { Box, Container, Link, Text, VStack, List, ListItem } from '@chakra-ui/react'
import React from 'react'

const PrivacyPolicy = () => {
    return (
        <Box backgroundColor="gray.200" py={{ base: "11", md: "13" }} px="6" height="100%">
            <VStack gap="5" mb="11" textAlign="justify">
                <Text
                    as="h2"
                    fontWeight="bold"
                    fontSize={{ base: "xl", md: "6xl" }}
                    lineHeight={{ base: "6", md: "10" }}
                    color="gray.800"
                >
                    Teeket Privacy Policy
                </Text>
                <Text
                    color="gray.600"
                    fontWeight="normal"
                    fontSize={{ base: "md", md: "xl" }}
                    lineHeight={{ base: "6", md: "26px" }}
                >
                    Sppace Brand and Design LTD ("us", "we", or "our") operates the website <Link href='https://teeketafrica.com' color="#06CC06" textDecoration="underline">https://teeketafrica.com</Link> (the "Service") under the brand name Teeket. This page outlines our policies regarding the collection, use, and disclosure of personal data when you use our Service, and the choices you have associated with that data. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
                </Text>
            </VStack>

            <VStack align="start" spacing={6} textAlign="left">
                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>1. Information We Collect</Text>
                <Text fontWeight="semibold">1.1 Personal Data</Text>
                <Text>While using our Service, we may ask you to provide us with personally identifiable information ("Personal Data"), which may include, but is not limited to:</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>Full Name</ListItem>
                    <ListItem>Email Address</ListItem>
                    <ListItem>Phone Number</ListItem>
                    <ListItem>Payment Information (via third-party processors)</ListItem>
                    <ListItem>Location Data (based on IP or browser settings)</ListItem>
                    <ListItem>Social Media Handles (if integrated)</ListItem>
                    <ListItem>Event-related details (when creating or joining an event)</ListItem>
                </List>
                <Text>We use this data to:</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>Provide and maintain our Service</ListItem>
                    <ListItem>Process ticket purchases or RSVPs</ListItem>
                    <ListItem>Send notifications and communications</ListItem>
                    <ListItem>Offer personalized experiences</ListItem>
                    <ListItem>Ensure user safety and system integrity</ListItem>
                    <ListItem>Comply with legal obligations</ListItem>
                </List>
                <Text fontWeight="semibold">1.2 Usage Data</Text>
                <Text>We may also collect information on how the Service is accessed and used ("Usage Data"). This includes:</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>Your device’s Internet Protocol (IP) address</ListItem>
                    <ListItem>Browser type and version</ListItem>
                    <ListItem>Pages visited on our Service</ListItem>
                    <ListItem>Time and date of visit</ListItem>
                    <ListItem>Time spent on pages</ListItem>
                    <ListItem>Referral data (how you found us)</ListItem>
                    <ListItem>Unique device identifiers</ListItem>
                </List>
                <Text>We use this data for analytics, to monitor usage trends, improve functionality, and detect anomalies or abuse.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>2. Cookies and Tracking Technologies</Text>
                <Text>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are small files stored on your device. They may include an anonymous unique identifier. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, you may not be able to use some portions of the Service.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>3. How We Use Your Data</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>To operate and maintain our platform</ListItem>
                    <ListItem>To provide customer support</ListItem>
                    <ListItem>To manage account creation and login processes</ListItem>
                    <ListItem>To notify you about changes to our Service</ListItem>
                    <ListItem>To enable communication between hosts and attendees</ListItem>
                    <ListItem>To detect, prevent, and address technical issues</ListItem>
                    <ListItem>To improve our platform and user experience</ListItem>
                    <ListItem>To comply with legal and regulatory requirements</ListItem>
                </List>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>4. Sharing and Disclosure</Text>
                <Text fontWeight="semibold">4.1 With Event Hosts and Attendees</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>If you register for an event, your data will be shared with the host.</ListItem>
                    <ListItem>If you are a host, your name and email may be shared with attendees.</ListItem>
                    <ListItem>We encourage hosts to respect user data and comply with privacy obligations.</ListItem>
                </List>
                <Text fontWeight="semibold">4.2 With Payment Processors</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>We use Paystack to process payments. Relevant data is securely shared with Paystack.</ListItem>
                    <ListItem>Teeket does not store or access full card details.</ListItem>
                    <ListItem>Paystack is PCI-DSS compliant and responsible for its data handling.</ListItem>
                </List>
                <Text fontWeight="semibold">4.3 With Service Providers</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>Facilitate our Service</ListItem>
                    <ListItem>Provide analytics (e.g., Google Analytics)</ListItem>
                    <ListItem>Deliver communications (e.g., MailerLite)</ListItem>
                    <ListItem>Secure our infrastructure (e.g., AWS, Cloudflare)</ListItem>
                </List>
                <Text fontWeight="semibold">4.4 As Required by Law</Text>
                <Text>We may disclose your data to comply with a legal obligation, protect rights or investigate wrongdoing, or respond to law enforcement.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>5. International Data Transfers</Text>
                <Text>Your data may be transferred and stored outside your country. We ensure your data is treated securely under applicable data laws including the GDPR and NDPR.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>6. Data Retention</Text>
                <Text>We retain personal data as long as necessary to provide the Service, meet legal obligations, resolve disputes, and enforce agreements. When no longer needed, we securely delete or anonymize it.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>7. Your Data Rights</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>Access your data</ListItem>
                    <ListItem>Correct inaccurate data</ListItem>
                    <ListItem>Request deletion</ListItem>
                    <ListItem>Object or restrict processing</ListItem>
                    <ListItem>Withdraw consent</ListItem>
                    <ListItem>Request data portability</ListItem>
                </List>
                <Text>Contact us at <Link href="mailto:privacy@teeketafrica.com" color="green.600">privacy@teeketafrica.com</Link>. EU residents may lodge complaints with a data protection authority.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>8. Data Security</Text>
                <List spacing={2} pl={4} styleType="disc">
                    <ListItem>SSL/HSTS encryption</ListItem>
                    <ListItem>Amazon AWS infrastructure</ListItem>
                    <ListItem>Regular audits and monitoring</ListItem>
                    <ListItem>Access control and tokenized payments</ListItem>
                    <ListItem>Cloudflare protection</ListItem>
                </List>
                <Text>No method is 100% secure. Use strong passwords and safeguard your credentials.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>9. Children’s Privacy</Text>
                <Text>Our Service is not intended for children under 16. If a child has provided us data, contact us to delete it.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>10. External Services and APIs</Text>
                <Text>We integrate with external APIs like Google Calendar, Maps, Zoom, and social sharing. By authorizing these, you grant us limited access. We comply with their policies and do not use the data to train AI models or transfer to third-party tools.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>11. Changes to This Privacy Policy</Text>
                <Text>We may update this policy and notify you via email, homepage notice, or updated date. Continued use means you accept the changes.</Text>

                <Text as="h3" fontWeight="bold" fontSize={{ base: "lg", md: "3xl" }}>12. Contact Us</Text>
                <Text>If you have questions, contact us at:</Text>
                <Text>
                    Teeket (by Sppace Brand and Design LTD)
                    <br />📧 <Link href="mailto:hello@teeketafrica.com" color="#06CC06" textDecoration="underline">hello@teeketafrica.com</Link>
                    <br />📍 Lagos, Nigeria
                </Text>
            </VStack>
        </Box>
    )
}

export default PrivacyPolicy