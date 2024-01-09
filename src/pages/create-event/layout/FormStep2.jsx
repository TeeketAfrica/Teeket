import { useState } from 'react';

import { useFormContext, Controller } from 'react-hook-form';

import {
  Stack,
  Box,
  Button,
  Image,
  Text,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';

import FormLayout from '../components/FormLayout';
import ImageUpload from '../components/ImageUpload';
import Refresh from '../../../assets/icon/Refresh.svg';
import Map from '../../../assets/icon/Map.svg';

const FormStep2 = () => {
  const { control, register } = useFormContext();
  const [image, setImage] = useState(null);

  return (
    <FormLayout
      title="Nigeria Anime Festival"
      description="Provide additional context about what this event is about."
    >
      <Box display="flex" flexDirection="column" gap="8">
        {image ? (
          <Box>
            <Box
              h="264px"
              w="600px"
              borderRadius="12px"
              overflow="hidden"
              mb="2"
            >
              <Image
                src={image}
                alt="event banner"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
            <Button
              onClick={() => setImage(null)}
              leftIcon={<Image src={Refresh} alt="icon" />}
              variant="secondary"
              size="sm"
            >
              Change Image
            </Button>
          </Box>
        ) : (
          <ImageUpload handleSetImage={setImage} />
        )}
        <Box display="flex" flexDirection="column" gap="8">
          <FormControl>
            <FormLabel fontWeight="semibold" color="black" margin="0">
              About the event
            </FormLabel>
            <Text htmlFor="description" fontWeight="normal" color="gray.500">
              Give a detailed description on what this event is about
            </Text>
            <Textarea
              id="description"
              name="description"
              {...register('description', {
                required: 'This is required',
              })}
              placeholder="Tell us about the event"
              size="sm"
              rows="7"
              marginTop="4"
            />
          </FormControl>

          <Box>
            <FormControl>
              <FormLabel fontWeight="semibold" color="black">
                How will this event be hosted
              </FormLabel>
              <Controller
                name="event"
                control={control}
                rules={{ required: 'Please select a gender' }}
                render={({ field }) => (
                  <>
                    <RadioGroup {...field} marginTop="4">
                      <Stack
                        direction="row"
                        color="gray.800"
                        fontWeight="medium"
                        flexWrap="wrap"
                      >
                        <Radio value="online" size="lg" variant="border">
                          Online event
                        </Radio>
                        <Radio value="physical" size="lg" variant="border">
                          Physical event
                        </Radio>
                      </Stack>
                    </RadioGroup>

                    <Box marginTop="4">
                      {field.value === 'online' && (
                        <FormControl>
                          <FormLabel
                            htmlFor="location"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.800"
                          >
                            Online event link
                          </FormLabel>

                          <Input
                            id="location"
                            type="text"
                            {...register('location', {
                              required: 'This is required',
                            })}
                            placeholder="Event url"
                            size="lg"
                          />
                        </FormControl>
                      )}
                      {field.value === 'physical' && (
                        <FormControl>
                          <FormLabel
                            htmlFor="location"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.800"
                          >
                            Event location
                          </FormLabel>

                          <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none">
                              <Image src={Map} alt="icon" />
                            </InputLeftElement>

                            <Input
                              id="location"
                              type="text"
                              {...register('location', {
                                required: 'This is required',
                              })}
                              placeholder="address"
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Box>
                  </>
                )}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </FormLayout>
  );
};

export default FormStep2;
