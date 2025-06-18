import { Flex, Tag, Text, useTheme } from "@chakra-ui/react";

const EventBadge = ({ eventBadgeInfo }) => {
  const theme = useTheme();
  const { badgeTitle, state, icon: Icon } = eventBadgeInfo;

  const commonStyles = {
    default: {
      container: {
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        border: "1px solid",
        borderRadius: state !== "defaultIcon" ? "16px" : "8px",
        borderColor: theme.colors.gray[300],
        width: state !== "defaultIcon" ? "fit-content" : "40px",
        height: state !== "defaultIcon" ? "32px" : "40px",
        padding: state !== "defaultIcon" ? "6px 8px" : "10px",
      },
    },
  };

  const specificStyles = {
    trending: {
      content: { color: theme.colors.green[500] },
      container: {
        backgroundColor: theme.colors.green[100],
      },
    },
    past: {
      content: { color: theme.colors.red[500] },
      container: {
        backgroundColor: theme.colors.red[100],
      },
    },
  };

  const style = specificStyles[state] || {};

  return (

    <Flex {...commonStyles.default.container} {...style.container}>
      {state !== "defaultIcon" ? (
        <>
          {state !== 'past' && <Icon />}
          <Text
            fontSize="sm"
            fontWeight="medium"
            lineHeight="5"
            textTransform="capitalize"
            color={style.content?.color}
          >
            {badgeTitle}
          </Text>
        </>
      ) : (
        <Icon />
      )}
    </Flex>
  );
};

export default EventBadge;
