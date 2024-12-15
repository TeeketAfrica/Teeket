import { Button } from "@chakra-ui/button";
import {
    Avatar,
    Box,
    Divider,
    HStack,
    Text,
    VStack,
    useMediaQuery,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Rectangle from "../../assets/icon/rectangle.svg";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import { mediaApi, teeketApi } from "../../utils/api";
import { AccountName } from "./components/account-name";
import { DeleteAccount } from "./components/delete-account";
import { Password } from "./components/password";

const AccountSettingsPage = () => {
    const toast = useToast();
    const [md] = useMediaQuery("(min-width: 768px)");
    const user = useSelector((state) => state.activeUser);
    const [profileImage, setProfileImage] = useState(user?.profile_image);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
        }
    };

    const handleUploadImage = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            try {
                const res = await mediaApi.post("/upload/picture", formData);
                const imageUrl = res.data?.url;

                const response = await teeketApi.patch("/user/profile", {
                    first_name: user?.firstName,
                    last_name: user?.lastName,
                    profile_image: imageUrl,
                });

                if (response.status !== 200) {
                    throw new Error("Failed to update profile.");
                }

                toast({
                    title: "Profile Updated",
                    description:
                        "You have successfully updated your profile image.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                });
            } catch (error) {
                console.error("Error updating profile image:", error);
                toast({
                    title: "Error",
                    description: "Failed to update profile image.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
    };

    return (
        <main>
            <Header />
            <Container alignItems="start" padding={4}>
                <VStack
                    spacing={md ? 9 : 3}
                    alignItems="start"
                    py={md ? "128px" : "40px"}
                >
                    <HStack spacing={6} w="100%">
                        <Text fontSize={md ? 56 : 26} fontWeight={700}>
                            Account settings
                        </Text>
                        <Rectangle />
                    </HStack>
                    <VStack w="100%" alignItems="start">
                        <HStack spacing={9}>
                            <Avatar
                                size="2xl"
                                name={`${user?.first_name} ${user?.last_name}`}
                                src={selectedImage || profileImage}
                            />
                            <VStack>
                                {selectedImage ? (
                                    <Button
                                        variant="primary"
                                        onClick={handleUploadImage}
                                    >
                                        Upload photo
                                    </Button>
                                ) : (
                                    <Button
                                        as="label"
                                        htmlFor="imageInput"
                                        variant="primary"
                                    >
                                        Change photo
                                    </Button>
                                )}
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={handleRemoveImage}
                                >
                                    Remove photo
                                </Button>
                            </VStack>
                        </HStack>
                    </VStack>
                    <VStack w="100%" alignItems="start">
                        <Text fontSize={md ? "2xl" : "xl"} fontWeight={600}>
                            Email address
                        </Text>
                        <Text color="#5E665E" display="flex">
                            Your email address is &nbsp;
                            <Text> {user?.email}</Text>
                        </Text>
                    </VStack>
                    <Divider w="100%" borderColor="#CBD1CB" />
                    <AccountName
                        data={{
                            firstName: user?.first_name,
                            lastName: user?.last_name,
                        }}
                    />
                    <Password />
                    <Divider w="100%" borderColor="#CBD1CB" />
                    <DeleteAccount />
                </VStack>
            </Container>
            <Footer />
        </main>
    );
};

export default AccountSettingsPage;
