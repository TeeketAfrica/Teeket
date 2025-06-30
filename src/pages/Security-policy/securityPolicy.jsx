import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const SecurityPolicy = () => {
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
                    Teeket Security Policy
                </Text>
                <Text color="gray.600" fontSize={{ base: "md", md: "xl" }}>
                    Effective Date: June 11, 2025
                </Text>
                <HStack>
                    <Text fontSize={{ base: "md", md: "xl" }} color={"gray.600"}>
                        Platform:
                    </Text>
                    <Link color="#06CC06" textDecoration="underline" href='https://teeketafrica.com' fontSize={{ base: "md", md: "xl" }}>
                        https://teeketafrica.com
                    </Link>
                </HStack>
                <Text color="gray.600" fontSize={{ base: "md", md: "xl" }}>
                    Entity: Teeket, a product of Sppace Brand and Design LTD
                </Text>
                <Text
                    color="gray.600"
                    fontWeight="normal"
                    fontSize={{ base: "md", md: "xl" }}
                    lineHeight={{ base: "6", md: "26px" }}
                >
                    This page outlines the security practices followed by Teeket to protect the integrity, confidentiality, and availability of data entrusted to us by users, creators, and organizations. We believe security is a core pillar of user trust and experience.
                </Text>

                {sections.map((section, index) => (
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

const sections = [
    {
        title: "1. Payments and PCI Compliance",
        paragraphs: [
            "Teeket does not store or process credit card or bank details directly. All payment processing is handled by Stripe, our third-party payment partner.",
            "Stripe is:",
            "Fully PCI-DSS v3.2.1 Level 1 compliant",
            "Certified as a secure third-party payment provider",
            "Responsible for encrypting and tokenizing payment data",
            "All payment data is transmitted securely between the user and Stripe using SSL/TLS protocols."
        ]
    },
    {
        title: "2. Data Privacy and Handling",
        paragraphs: [
            "Teeket follows strict data handling procedures in line with:",
            "General Data Protection Regulation (GDPR)",
            "Nigeria Data Protection Regulation (NDPR)",
            "Africa Union Convention on Cyber Security and Personal Data Protection (Malabo Convention)",
            "We never sell or trade personal data. Our data handling is purpose-limited, consent-based, and strictly access-controlled.",
            "All employees, contractors, and partners undergo periodic security and privacy training and sign NDAs to ensure confidentiality.",
            "Please refer to our Privacy Policy for full data collection and use disclosures."
        ]
    },
    {
        title: "3. Infrastructure and Hosting",
        paragraphs: [
            "Teeket is hosted on Amazon Web Services (AWS), leveraging secure and scalable infrastructure.",
            "AWS compliance includes:",
            "ISO 27001",
            "PCI-DSS Level 1",
            "SOC 1, SOC 2, and SOC 3",
            "CSA STAR Certification",
            "We use AWS EC2, ECS, and RDS, which provide:",
            "Role-based access control (RBAC)",
            "Secure network isolation via Virtual Private Clouds (VPCs)",
            "Auto-scaling and failover",
            "Continuous monitoring and automated backups"
        ]
    },
    {
        title: "4. Encryption",
        paragraphs: [
            "Teeket employs end-to-end encryption:",
            "Data in transit is encrypted using HTTPS (TLS 1.2 and above)",
            "Data at rest is encrypted using AES-256 encryption within AWS",
            "All API traffic and user sessions are protected by HSTS and SSL enforced by Cloudflare.",
            "We also enforce secure password hashing using bcrypt with adaptive cost factors."
        ]
    },
    {
        title: "5. Application Security",
        paragraphs: [
            "We use both automated and manual tools to assess the integrity and safety of our application, including:",
            "Static and dynamic code analysis",
            "Regular vulnerability scanning",
            "Dependency monitoring for CVEs (e.g., via Dependabot or GitHub Security)",
            "Secure development lifecycle practices (SDLC)",
            "Each deployment undergoes a rigorous review process, including peer-reviewed code and automated testing pipelines."
        ]
    },
    {
        title: "6. Authentication and Access Control",
        paragraphs: [
            "Teeket offers the following authentication and access safeguards:",
            "Enforced strong password policies",
            "Session expiration and invalidation logic",
            "OAuth integration with providers (e.g., Google, Apple)",
            "Optional multi-factor authentication (MFA) for admins and partners",
            "Admin-level activities logged and auditable",
            "Access to infrastructure and sensitive data is restricted to trained personnel using:",
            "Role-based access control (RBAC)",
            "Hardware security keys or MFA",
            "Strict need-to-know principles"
        ]
    },
    {
        title: "7. Incident Response",
        paragraphs: [
            "Teeket maintains a robust Incident Response Plan (IRP). All engineers and security personnel are trained to:",
            "Identify and assess the scope of any data or system breach",
            "Contain and mitigate vulnerabilities within the shortest response time",
            "Notify affected users and regulatory authorities (as required by law)",
            "Perform root cause analysis and strengthen future defenses",
            "Monitoring is in place 24/7 for abnormal traffic, failed login attempts, and performance issues."
        ]
    },
    {
        title: "8. Disaster Recovery and Business Continuity",
        paragraphs: [
            "Teeket’s infrastructure is built with redundancy and disaster recovery in mind. Measures include:",
            "Automated daily database backups stored across multiple secure locations",
            "Geo-distributed content delivery via Cloudflare CDN",
            "Uptime monitoring and alerting systems",
            "Failover strategies for database and compute infrastructure",
            "In the event of a disruption, our engineering team can restore core services within 4–6 hours in most scenarios."
        ]
    },
    {
        title: "9. SOC 2 & Compliance",
        paragraphs: [
            "Teeket is in the process of obtaining SOC 2 Type I certification and will update this section upon completion.",
            "All partners and subprocessors (e.g., Stripe, AWS, Cloudflare) already meet industry compliance standards and undergo annual audits."
        ]
    },
    {
        title: "10. Vulnerability Disclosure",
        paragraphs: [
            "We value the contributions of ethical hackers and security researchers.",
            "If you discover a vulnerability in our systems or software:",
            "Email us immediately at security@teeketafrica.com",
            "Please include a detailed description, steps to reproduce, and any supporting evidence (screenshots, logs)",
            "We will review, assess, and remediate confirmed vulnerabilities with high priority. Critical disclosures may be eligible for a bounty or public acknowledgment (subject to review)."
        ]
    },
    {
        title: "11. Contact",
        paragraphs: [
            "If you have questions about our security practices or wish to report a concern, contact:",
            "Teeket Security Team",
            "📧 security@teeketafrica.com",
            "📍 Lagos, Nigeria"
        ]
    }
];

export default SecurityPolicy
