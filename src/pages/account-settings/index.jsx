import { Button } from "@chakra-ui/button";
import {
    Avatar,
    Box,
    Divider,
    HStack,
    Spinner,
    Text,
    VStack,
    useMediaQuery,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rectangle from "../../assets/icon/rectangle.svg";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import { mediaApi, teeketApi } from "../../utils/api";
import { AccountName } from "./components/account-name";
import { DeleteAccount } from "./components/delete-account";
import { Password } from "./components/password";
import { useGetUrl } from "../../hooks/useGetUrl";
import axios from "axios";

const AccountSettingsPage = () => {
    const toast = useToast();
    const [md] = useMediaQuery("(min-width: 768px)");
    const { signedUrl, fetchSignedUrl } = useGetUrl();
    const user = useSelector((state) => state.activeUser);
    const [profileImage, setProfileImage] = useState(user?.profile_image);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
        }
    };

    useEffect(() => {
        fetchSignedUrl();
    }, [selectedImage]);

    useEffect(() => {
        if (signedUrl) handleUploadImage()
    }, [signedUrl])

    const handleUploadImage = async () => {
        setUploading(true)
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            try {
                const res = await axios.post(signedUrl, formData);
                const imageUrl = res.data?.secure_url;

                const response = await teeketApi.patch("/user/profile", {
                    profile_image: imageUrl,
                });

                if (response.status !== 200) {
                    throw new Error("Failed to update profile.");
                }

                toast({
                    title: "Profile Updated",
                    description:
                        "You have successfully updated your profile image. The page would automatically refresh to view your changes",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

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
        setUploading(false)
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
    };

    return (
        <main>
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
                                {/* {selectedImage ? ( */}
                                <Button
                                    variant={`${uploading? "secondary": "primary"}`}
                                    as="label"
                                    htmlFor="imageInput"
                                    disabled={uploading}
                                // onClick={handleUploadImage}
                                >
                                    <span style={{ marginRight: '8px' }}>Upload photo</span>  {uploading && <Spinner />}
                                </Button>
                                {/* // ) : (
                                //     <Button */}
                                {/* //         onClick={()=>{setProfileImage(null); setSelectedImage(null)}}
                                //         as="label"
                                //         htmlFor="imageInput"
                                //         variant="primary"
                                //     >
                                //         Change photo */}
                                {/* //     </Button>
                                // )} */}
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
