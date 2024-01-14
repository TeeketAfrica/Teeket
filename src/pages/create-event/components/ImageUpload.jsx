import { useForm } from 'react-hook-form';
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
  // Progress,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

import { getImageDimensions, isValidImage } from '../../../utils/utils';

// import Document from '../../../assets/icon/Document.svg';
// import FileUploadStatus from '../../../assets/icon/FileUploadStatus.svg';
// import Reload from '../../../assets/icon/Reload.svg';
import CloudUpload from '../../../assets/icon/CloudUpload.svg';

const ImageUpload = ({ handleSetImage }) => {
  const { register } = useForm();

  const handleImageChange = async (e) => {
    const selectedImage =
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    if (selectedImage) {
      try {
        const dimensions = await getImageDimensions(selectedImage);

        if (
          isValidImage(selectedImage) &&
          dimensions.width <= 800 &&
          dimensions.height <= 400
        ) {
          const imageUrl = await readAndConvertImage(selectedImage);
          handleSetImage(imageUrl);
        } else {
          console.error(
            'Invalid image type or dimensions exceed the maximum size (800x400)'
          );
        }
      } catch (error) {
        console.error('Error reading or converting the selected image:', error);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const droppedImage = e.dataTransfer.files[0];

    if (droppedImage) {
      try {
        const dimensions = await getImageDimensions(droppedImage);

        if (
          isValidImage(droppedImage) &&
          dimensions.width <= 800 &&
          dimensions.height <= 400
        ) {
          const imageUrl = await readAndConvertImage(droppedImage);
          handleSetImage(imageUrl);
        } else {
          console.error(
            'Invalid image type or dimensions exceed the maximum size (800x400)'
          );
        }
      } catch (error) {
        console.error('Error reading or converting the dropped image:', error);
      }
    }
  };

  const readAndConvertImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read the image.'));
      };

      reader.readAsDataURL(file);
    });
  };

  const preventDefault = (e) => {
    e.preventDefault();
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
        onDragOver={preventDefault}
      >
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
                  </Text>{' '}
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
        {/* <VStack
          justifyContent="center"
          backgroundColor="gray.200"
          width="100%"
          height="100%"
        >
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
            <Text fontWeight="semibold" fontSize="md" color="gray.500">
              65%
            </Text>
            <Box maxW="300px" width="100%" marginTop="2" marginBottom="4">
              <Progress
                value={30}
                height="6px"
                colorScheme="red"
                borderRadius="16px"
              />
            </Box>
            <Text fontWeight="semibold" fontSize="sm">
              Uploading Document...
            </Text>
            <Text fontWeight="normal" fontSize="xs">
              Name of document
            </Text>
          </>
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
                  Error message
                </Text>
              </Box>

              <Box marginTop="6">
                <Button
                  leftIcon={<Image src={Reload} alt="icon" />}
                  type="button"
                  h="0"
                  color="red.400"
                >
                  Try again
                </Button>
              </Box>
            </VStack>
          </>
        </VStack> */}
      </VStack>
      <Input
        id="upload"
        type="file"
        accept="image/*"
        {...register('upload', {
          required: 'This is required',
        })}
        size="lg"
        border="none"
        display="none"
        onChange={handleImageChange}
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
