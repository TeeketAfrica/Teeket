import { Box, Image } from "@chakra-ui/react";

const Masonry = ({ width, height, marginBottom = 0, image }) => {

  return (
    <Box
      overflow="hidden"
      width={width ? width : { base: "74.4px", md: "183px" }}
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
