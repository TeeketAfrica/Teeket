import { useCallback } from "react";
import { teeketApi } from "../../../utils/api";
import { DEFAULTBANNERIMAGE } from "../../../utils/constants";

const useFormSubmission = ({ id, activeUser, navigate, toast, tickets }) => {
  const submitEvent = useCallback(
    async (values) => {
      try {
        const eventData = {
          title: values.eventTitle,
          organizer: values.eventOrganizer,
          type: values.eventType,
          industry: values.eventIndustry,
          start_date: `${values.eventStartDate}T${values.eventStartTime}`,
          end_date: `${values.eventEndDate}T${values.eventEndTime}`,
          description: values.eventAbout,
          hosting_site: values.eventHosting,
          //(Timmi) include location metadata coming from formik fi
          location_metadata: values.eventPhysicalLocationDetails || null,
          number_of_tickets:
            Number.parseInt(values.eventEstimatedSoldTicket) || 0,

          //(Timmi) map the tags
          tags: values.eventTags.map((tag) => tag.id),
          status: values.publishLive === "eventLive" ? "published" : "draft",
          creator_id: activeUser?.id,
        };

        // Add location based on hosting type
        if (values.eventHosting === "physical") {
          eventData.event_location = values.eventLocation;
        } else if (values.eventHosting === "online") {
          const eventUrl = values.eventLocation;
          eventData.event_link = eventUrl.startsWith('http://') || eventUrl.startsWith('https://')
            ? eventUrl
            : `https://${eventUrl}`;
        }

        // Add banner image if available
        if (values.eventBannerImage) {
          if (
            typeof values.eventBannerImage === "object" &&
            values.eventBannerImage.secure_url
          ) {
            eventData.banner_image = values.eventBannerImage.secure_url;
          } else if (typeof values.eventBannerImage === "string") {
            eventData.banner_image = values.eventBannerImage;
          }
        }
        // (Timmi) if no banner image use default
        else {
          eventData.banner_image = DEFAULTBANNERIMAGE;
        }
        let response;
        if (id) {
          // Update existing event
          response = await teeketApi.patch(`/events/${id}`, eventData);
          toast({
            title: "Event updated successfully!",
            description: "Your event has been updated.",
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          // Create new event
          response = await teeketApi.post("/events", eventData);
          toast({
            title: "Event created successfully!",
            description: "Your event has been created.",
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }

        //(Timmi) handle tickets from tickets stored on the redux store
        const ticketPromises = tickets.map((ticket) => {
          const ticketPayload = {
            name: ticket.ticketName,
            price: ticket.ticketPrice,
            quantity: ticket.ticketQuantity,
            is_paid: ticket.ticketType === "paid",
          };

          if (typeof ticket.id === "string") {
            return teeketApi.patch(
              `/events/${response.data.id}/tickets/${ticket.id}`,
              ticketPayload
            );
          }
          return teeketApi.post(
            `/events/${response.data.id}/tickets`,
            ticketPayload
          );
        });

        await Promise.all(ticketPromises);
        console.log("vp",values.publishLive)
        // Navigate to appropriate page based on publish status [(Timmi) navigate to proper url]
        if (values.publishLive === "eventLive"||"on_going") {
          //(Timmi) patch the publish if publish live was clicked
          await teeketApi.patch(`events/${response.data.id}/publish`);
          navigate("/app/events");
        } else {
          navigate("/app/events");
        }

        return response.data;
      } catch (error) {
        console.error("Event submission error:", error);

        // Extract error message
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to save event";

        toast({
          title: "Failed to save event",
          description: errorMessage,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        throw error;
      }
    },
    [id, activeUser, tickets]
  );

  return {
    submitEvent,
  };
};

export default useFormSubmission;
