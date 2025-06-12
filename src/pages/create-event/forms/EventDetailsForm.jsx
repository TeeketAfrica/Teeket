import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";
import ImageUpload from "../components/ImageUpload";
import RefreshIcon from "../../../assets/icon/Refresh.svg";
import MapIcon from "../../../assets/icon/Map.svg";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

const EventDetailsForm = () => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const [imageData, setImageData] = useState(values.eventBannerImage || "");
  const completeRef = useRef(null);

  // Update Formik when image changes
  useEffect(() => {
    setFieldValue("eventBannerImage", imageData);
  }, [imageData, setFieldValue]);

  const hostingOptions = [
    { value: "online", label: "Online event" },
    { value: "physical", label: "Physical event" },
  ];

  //(Timmi) address tracking using google api
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_PLACES_API_KEY,
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    let address = completeRef.current.getPlaces();
    const place = address[0];
    const location = place.geometry.location;
    const latitude = location.lat();
    const longitude = location.lng();

    setFieldValue("eventLocation", place.formatted_address);
    setFieldTouched("eventLocation", true);
    //(Timmi) setFieldValue for location details from google's api
    if (place) {
      setFieldValue("eventPhysicalLocationDetails", {
        address: place.formatted_address,
        coordinates: {
          longitude: longitude,
          latitude: latitude,
        },
        google_maps_url: place.url,
        icon_url: place.icon_mask_base_uri,
      });
    } else {
      setFieldValue("eventPhysicalLocationDetails", null);
      setFieldTouched("eventLocation", true);
    }
  };

  return (
    <VStack
      maxW={{ base: "100%", lg: "600px" }}
      alignItems="flex-start"
      gap="8"
    >
      {/* Banner Image */}
      {imageData?.secure_url || imageData ? (
        <Box>
          <Box key={imageData.public_id || id} maxW="600px">
            <Image
              src={imageData.secure_url}
              alt={`event-banner ${imageData.public_id || id}`}
              objectFit="cover"
              h="100%"
              maxH="400px"
              w="100%"
              borderRadius="12px"
              objectPosition="top"
            />
            <Button
              onClick={() => setImageData("")}
              leftIcon={<RefreshIcon />}
              variant="secondary"
              size="sm"
              mt={2}
              zIndex={20}
            >
              Change Image
            </Button>
          </Box>
        </Box>
      ) : (
        <ImageUpload handleSetImage={setImageData} />
      )}

      {/* About Event */}
      <FormField
        name="eventAbout"
        label="About the event"
        type={FormFieldType.TextArea}
        placeholder="Tell us about the event"
        helperText="Give a detailed description of what this event is about"
        rows={7}
      />

      {/* Event Hosting */}
      <Box w="100%">
        <FormField
          name="eventHosting"
          label="How will this event be hosted"
          type={FormFieldType.Radio}
          options={hostingOptions}
          radioMaxWidth="fit-content"
        />

        {/* Event Location - Conditional rendering based on hosting type */}
        {values.eventHosting === "online" && (
          <Box mt="4">
            <FormField
              name="eventLocation"
              label={"Online event link"}
              type={FormFieldType.Text}
              placeholder={"Event url"}
            />
          </Box>
        )}
        {values.eventHosting === "physical" && (
          <Box mt={4}>
            <InputGroup size={"lg"}>
              <InputLeftElement pointerEvents="none">
                <MapIcon />
              </InputLeftElement>
              {isLoaded && (
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                >
                  <StandaloneSearchBox
                    onLoad={(ref) => (completeRef.current = ref)}
                    onPlacesChanged={handleOnPlacesChanged}
                  >
                    <Input
                      id="eventLocation"
                      name="eventLocation"
                      type="text"
                      placeholder="Address"
                      value={values.eventLocation}
                      onChange={(e) =>
                        setFieldValue("eventLocation", e.target.value)
                      }
                      onBlur={() => {
                        // Mark as touched on blur for validation
                        setFieldTouched("eventLocation", true);
                      }}
                      style={{
                        height: "50px",
                        paddingLeft: "3rem",
                      }}
                      required
                    />
                  </StandaloneSearchBox>
                </div>
              )}
            </InputGroup>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default EventDetailsForm;
