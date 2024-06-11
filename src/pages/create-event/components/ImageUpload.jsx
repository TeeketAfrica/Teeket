import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Box,
  Text,
  Image,
  Divider,
  AbsoluteCenter,
  Button,
  Spinner,
  ListItem,
  UnorderedList,
  HStack,
} from "@chakra-ui/react";

import {
  getImageDimensions,
  isValidImage,
  readAsBinary,
} from "../../../utils/utils";

import Document from "../../../assets/icon/Document.svg";
import FileUploadStatus from "../../../assets/icon/FileUploadStatus.svg";
import Reload from "../../../assets/icon/Reload.svg";
import CloudUpload from "../../../assets/icon/CloudUpload.svg";
import mediaApi from "../../../api/mediaApi";
import useIsUserAuth from "../../../hooks/useIsUserAuth";

const ImageUpload = ({ handleSetImage }) => {
  const { register } = useForm();
  const fileInputRef = useRef(null);
  const [imageData, setImageData] = useState("");
  const token = useIsUserAuth();

  const [imageUploadState, setImageUploadState] = useState({
    default: true,
    loading: false,
    error: {
      state: false,
      message: "",
    },
  });

  const handleImageChange = async (e) => {
    let selectedImage =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

    if (selectedImage) {
      try {
        const dimensions = await getImageDimensions(selectedImage);
        setImageData(selectedImage);

        if (
          isValidImage(selectedImage) &&
          dimensions.width <= 2160 &&
          dimensions.height <= 1080
        ) {
          setImageUploadState({
            default: false,
            loading: true,
            error: { state: false },
          });

          const imageBinary = await readAsBinary(selectedImage);

          const res = await mediaApi.post(
            "/upload/picture",
            { file: imageBinary },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          handleSetImage(res.data);
        } else {
          setImageUploadState({
            default: false,
            loading: false,
            error: {
              state: true,
              message:
                "Invalid image type or dimensions exceed the maximum size (800x400)",
            },
          });
        }
      } catch (error) {
        setImageUploadState({
          default: false,
          loading: false,
          error: {
            state: true,
            message: "",
          },
        });
        console.error("Error reading or converting the selected image:", error);
      } finally {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    //TODO: Drag and drop functionality
  };

  return (
    <FormControl>
      <Text marginBottom="2" color="gray.600">
        Upload a banner image
      </Text>
      <VStack
        justifyContent="center"
        h="264px"
        w="100%"
        border="1.5px dashed"
        borderColor="gray.300"
        borderRadius="12px"
        overflow="hidden"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageUploadState.default && (
          <FormLabel htmlFor="upload" m="0" cursor="pointer">
            <VStack
              flexDirection="column"
              justifyContent="center"
              gap="5"
              w="100%"
            >
              <VStack justifyContent="center">
                <Box
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  bg="gray.200"
                >
                  <Image src={CloudUpload} alt="icon" />
                </Box>
                <Box mt="4">
                  <Text fontWeight="normal">
                    <Text
                      as="span"
                      fontSize="md"
                      fontWeight="semibold"
                      color="green.400"
                      cursor="pointer"
                    >
                      Click to upload
                    </Text>{" "}
                    <Text as="span" fontSize="sm" color="gray.600">
                      or drag and drop
                    </Text>
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </Box>
              </VStack>
              <Box position="relative" w="100%">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  Or
                </AbsoluteCenter>
              </Box>
              <Button size="sm">
                <FormLabel htmlFor="upload" m="0" cursor="pointer">
                  Browse files
                </FormLabel>
              </Button>
            </VStack>
          </FormLabel>
        )}
        {(imageUploadState.error.state || imageUploadState.loading) && (
          <VStack
            justifyContent="center"
            backgroundColor="gray.200"
            width="100%"
            height="100%"
          >
            {imageUploadState.loading && (
              <>
                <Box position="relative" marginBottom="2">
                  <Image src={Document} alt="document" />
                  <Box
                    position="absolute"
                    top="35%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.100"
                    width="100%"
                    backgroundColor="#C548F1"
                    fontSize="2"
                  >
                    <Text>JPG</Text>
                  </Box>
                </Box>
                <HStack
                  justifyContent="center"
                  width="100%"
                  marginTop="2"
                  marginBottom="4"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.300"
                    color="green.500"
                    size="xl"
                  />
                </HStack>
                <Text fontWeight="semibold" fontSize="sm">
                  Uploading Document...
                </Text>
                <Text fontWeight="normal" fontSize="xs">
                  {imageData?.name}
                </Text>
              </>
            )}

            {imageUploadState.error.state && (
              <>
                <VStack justifyContent="center" marginBottom="2">
                  <Image src={FileUploadStatus} alt="icon" />

                  <Box textAlign="center">
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      marginTop="4"
                      marginBottom="2"
                    >
                      Failed to upload
                    </Text>
                    <Text fontWeight="normal" fontSize="xs">
                      {imageUploadState.error.message &&
                        imageUploadState.error.message}
                    </Text>
                  </Box>

                  <Box marginTop="6">
                    <Button
                      leftIcon={<Image src={Reload} alt="icon" />}
                      type="button"
                      h="0"
                      color="red.400"
                      onClick={() =>
                        setImageUploadState({
                          default: true,
                          loading: false,
                          error: { state: false, message: "" },
                        })
                      }
                    >
                      Try again
                    </Button>
                  </Box>
                </VStack>
              </>
            )}
          </VStack>
        )}
      </VStack>
      <Input
        id="upload"
        type="file"
        accept="image/*"
        {...register("upload", {
          required: "This is required",
        })}
        size="lg"
        border="none"
        display="none"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <UnorderedList
        color="gray.600 "
        fontSize="xs"
        marginLeft="18px"
        marginTop="2"
      >
        <ListItem>Recommended image size: 2160 x 1080px</ListItem>
        <ListItem>Maximum file size: 10MB</ListItem>
        <ListItem>Supported image files: JPEG or PNG</ListItem>
      </UnorderedList>

      <FormErrorMessage color="red.500"></FormErrorMessage>
    </FormControl>
  );
};

export default ImageUpload;
