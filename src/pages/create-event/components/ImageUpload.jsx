import { AbsoluteCenter, Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, ListItem, Spinner, Text, Image, UnorderedList, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CloudUpload from "../../../assets/icon/CloudUpload.svg";
import Document from "../../../assets/icon/Document.svg";
import FileUploadStatus from "../../../assets/icon/FileUploadStatus.svg";
import Reload from "../../../assets/icon/Reload.svg";
import { mediaApi } from "../../../utils/api";
import { IMAGEDIMENSION, IMAGESIZE } from "../../../utils/constants";
import { getImageDimensions, isValidImage, readAsBinary } from "../../../utils/utils";

const ImageUpload = ({ handleSetImage }) => {
  const { register } = useForm();
  const fileInputRef = useRef(null);
  const [imageData, setImageData] = useState("");

  const [imageUploadState, setImageUploadState] = useState({
    default: true,
    loading: false,
    error: {
      state: false,
      message: "",
    },
  });

  const handleImageChange = async (imageFile) => {
    const selectedImage = imageFile || null;

    if (!isValidImage(selectedImage)) {
      setImageUploadState({
        default: false,
        loading: false,
        error: {
          state: true,
          message: "The file you uploaded is not recognized as a valid image format. Please use formats like JPEG, PNG, or GIF.",
        },
      });
      return;
    }

    if (selectedImage && selectedImage.size > IMAGESIZE.size) {
      setImageUploadState({
        default: false,
        loading: false,
        error: {
          state: true,
          message: `Image exceeds the maximum file size of ${IMAGESIZE.size / 1024}${IMAGESIZE.unit}`,
        },
      });
      return;
    }

    if (selectedImage) {
      try {
        const dimensions = await getImageDimensions(selectedImage);

        setImageData(selectedImage);

        if (dimensions.width <= IMAGEDIMENSION.width && dimensions.height <= IMAGEDIMENSION.height) {
          setImageUploadState({
            default: false,
            loading: true,
            error: { state: false },
          });

          const imageBinary = await readAsBinary(selectedImage);

          const res = await mediaApi.post("/upload/picture", {
            file: imageBinary,
          });

          handleSetImage(res.data);
        } else {
          setImageUploadState({
            default: false,
            loading: false,
            error: {
              state: true,
              message: "Image exceed the recommended size (2160x1080)",
            },
          });
        }
      } catch (error) {
        setImageUploadState({
          default: false,
          loading: false,
          error: {
            state: true,
            message: "Error uploading image, try again",
          },
        });
      } finally {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleImageChange(droppedFile);
    }
  };

  return (
    <FormControl>
      <Text marginBottom="2" color="gray.600">
        Upload a banner image
      </Text>
      <VStack justifyContent="center" h="264px" w="100%" border="1.5px dashed" borderColor="gray.300" borderRadius="12px" overflow="hidden" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {imageUploadState.default && (
          <FormLabel htmlFor="upload" m="0" cursor="pointer">
            <VStack flexDirection="column" justifyContent="center" gap="5" w="100%">
              <VStack justifyContent="center">
                <Box display="inline-flex" alignItems="center" justifyContent="center" w="56px" h="56px" borderRadius="full" bg="gray.200">
                  <Image src={CloudUpload} alt="icon" />
                </Box>
                <Box mt="4">
                  <Text fontWeight="normal">
                    <Text as="span" fontSize="md" fontWeight="semibold" color="green.400" cursor="pointer">
                      Click to upload
                    </Text>{" "}
                    <Text as="span" fontSize="sm" color="gray.600">
                      or drag and drop
                    </Text>
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    SVG, PNG, JPG or GIF (max. {IMAGEDIMENSION.width}x{IMAGEDIMENSION.height})
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
          <VStack justifyContent="center" backgroundColor="gray.200" width="100%" height="100%">
            {imageUploadState.loading && (
              <>
                <Box position="relative" marginBottom="2">
                  <Document />
                  <Box position="absolute" top="35%" display="flex" alignItems="center" justifyContent="center" color="gray.100" width="100%" backgroundColor="#C548F1" fontSize="2">
                    <Text>JPG</Text>
                  </Box>
                </Box>
                <HStack justifyContent="center" width="100%" marginTop="2" marginBottom="4">
                  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="green.500" size="xl" />
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
              <VStack justifyContent="center" marginBottom="2">
                <FileUploadStatus />

                <Box textAlign="center">
                  <Text fontWeight="semibold" fontSize="sm" marginTop="4" marginBottom="2">
                    Failed to upload
                  </Text>
                  <Text fontWeight="normal" fontSize="xs" maxWidth="60ch">
                    {imageUploadState.error.message && imageUploadState.error.message}
                  </Text>
                </Box>

                <Box marginTop="6">
                  <Button
                    leftIcon={<Reload />}
                    type="button"
                    h="0"
                    color="red.400"
                    onClick={() =>
                      setImageUploadState({
                        default: true,
                        loading: false,
                        error: { state: false, message: "" },
                      })
                    }>
                    Try again
                  </Button>
                </Box>
              </VStack>
            )}
          </VStack>
        )}
      </VStack>
      <Input id="upload" type="file" accept="image/*" size="lg" border="none" display="none" onChange={(e) => handleImageChange(e.target.files[0])} ref={fileInputRef} />
      <UnorderedList color="gray.600 " fontSize="xs" marginLeft="18px" marginTop="2">
        <ListItem>
          Recommended image size: {IMAGEDIMENSION.width} x{IMAGEDIMENSION.height}
        </ListItem>
        <ListItem>
          Maximum file size: {IMAGESIZE.size / 1024}
          {IMAGESIZE.unit}
        </ListItem>
        <ListItem>Supported image files: JPEG or PNG</ListItem>
      </UnorderedList>

      <FormErrorMessage color="red.500" />
    </FormControl>
  );
};

export default ImageUpload;
