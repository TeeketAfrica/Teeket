import { Box, Image } from "@chakra-ui/react";

const Masonry = ({ height, marginBottom = 0, imageName }) => {
  const image = `/src/assets/img/${imageName}.webp`;

  return (
    <Box
      overflow="hidden"
      width={{ base: "74.4px", md: "183px" }}
      height={height}
      borderRadius="32px"
      marginBottom={marginBottom}
    >
      <Image
        src={image}
        alt="image "
        width="100%"
        height="100%"
        display="inline-block"
        objectFit="cover"
      />
    </Box>
  );
};

export default Masonry;
