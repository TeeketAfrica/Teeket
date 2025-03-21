import { createSelector, createSlice } from "@reduxjs/toolkit";

// Utility function to calculate total ticket quantity

const sumTicketQuantity = (tickets) => {
    return tickets.reduce(
        (accumulator, { ticketQuantity }) =>
            accumulator +
            (isNaN(parseInt(ticketQuantity, 10))
                ? 0
                : parseInt(ticketQuantity, 10)),
        0
    );
};

const initialState = {
    id: "",
    eventTitle: "",
    eventOrganizer: "",
    eventType: "",
    eventIndustry: "",
    eventTags: null,
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    eventBannerImage: "",
    eventAbout: "",
    eventHosting: "",
    eventLocation: "",
    eventPlan: "",
    publishLive: "",
    tickets: [],
    totalTicketQuantities: 0,
    eventEstimatedSoldTicket: 0,
    eventData: null,
    eventDataTickets: {
        isLoading: false,
        data: null,
        error: null,
    },
    eventTicketBooking: null,
    ticketStep: 1,
    ticketQuantity: 0,
    isBookedTicket: false,
    isSetDetails: false,
    ticketSummaryDetails: null,
    referenceId: null,
    ticketUserDetails: {},
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEventDetails: (state, action) => {
            const eventData = action.payload;
            state.id = eventData.id;
            state.eventTitle = eventData.title || state.eventTitle;
            state.eventOrganizer = eventData.organizer || state.eventOrganizer;
            state.eventType = eventData.type || state.eventType;
            state.eventIndustry = eventData.industry || state.eventIndustry;
            state.eventTags = eventData.tags || state.eventTags;
            state.eventStartDate =
                eventData.start_date.split("T")[0] || state.eventStartDate;
            state.eventStartTime =
                eventData.start_date.split("T")[1].slice(0, 8) ||
                state.eventStartTime;
            state.eventEndDate =
                eventData.end_date.split("T")[0] || state.eventEndDate;
            state.eventEndTime =
                eventData.end_date.split("T")[1].slice(0, 8) ||
                state.eventEndTime;
            state.eventBannerImage =
                eventData.banner_image || state.eventBannerImage;
            state.eventAbout = eventData.description || state.eventAbout;
            state.eventHosting = eventData.hosting_site || state.eventHosting;
            state.eventLocation =
                eventData.event_location ||
                eventData.event_link ||
                state.eventLocation;
            state.publishLive = eventData.status || state.publishLive;
            state.totalTicketQuantities =
                eventData.number_of_tickets || state.totalTicketQuantities;
            state.eventEstimatedSoldTicket = eventData.number_of_tickets;
        },

        setTicket: (state, action) => {
            state.tickets = action.payload;
        },

        setEventDetail: (state, action) => {
            const { fieldName, value } = action.payload;
            state[fieldName] = value;
        },

        setTicketDetails: (state, action) => {
            const newTicket = {
                id: Date.now(),
                ...action.payload,
            };

            state.tickets = [...state.tickets, newTicket];

            state.totalTicketQuantities = sumTicketQuantity(state.tickets);
        },
        setTicketSummaryDetails: (state, action) => {
            state.ticketSummaryDetails = {
                ...state.ticketSummaryDetails,
                ...action.payload,
            };
        },

        updateTicketDetails: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const ticketIndex = state.tickets.findIndex(
                (ticket) => ticket.id === id
            );
            if (ticketIndex >= 0) {
                state.tickets[ticketIndex] = {
                    ...state.tickets[ticketIndex],
                    ...updatedFields,
                };
                state.totalTicketQuantities = sumTicketQuantity(state.tickets);
            }
        },

        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter(
                (ticket) => ticket.id !== action.payload
            );
            state.totalTicketQuantities = sumTicketQuantity(state.tickets);
        },

        resetEventState: (state) => {
            Object.assign(state, initialState);
        },

        setEventData: (state, action) => {
            state.eventData = action.payload;
        },
        setEventDataTicketsData: (state, action) => {
            state.eventDataTickets.data = action.payload;
            state.eventDataTickets.isLoading = false;
            state.eventDataTickets.error = null;
        },
        setEventDataTicketsLoading: (state) => {
            state.eventDataTickets.isLoading = true;
            state.eventDataTickets.data = null;
            state.eventDataTickets.error = null;
        },
        setEventDataTicketsError: (state, action) => {
            state.eventDataTickets.isLoading = false;
            state.eventDataTickets.data = null;
            state.eventDataTickets.error = action.payload;
        },

        changeEventDataTicketsQuantity: (state, action) => {
            const { id, name, quantity, price } = action.payload;
            if (!state.eventTicketBooking) {
                state.eventTicketBooking = [];
            }
            const existingTicket = state.eventTicketBooking.find(
                (ticket) => ticket.id === id
            );

            if (existingTicket) {
                existingTicket.quantity = quantity;
                existingTicket.price = (quantity * parseFloat(price)).toFixed(
                    2
                );
            } else {
                state.eventTicketBooking.push({
                    id,
                    name,
                    quantity,
                    price: (quantity * parseFloat(price)).toFixed(2),
                });
            }
        },
        changeTicketStep: (state, action) => {
            state.ticketStep = action.payload;
        },
        setTicketQuantity: (state, action) => {
            state.ticketQuantity = action.payload;
        },
        setIsBookedTicket: (state, action) => {
            state.isBookedTicket = action.payload;
        },
        setIsSetDetails: (state, action) => {
            state.isSetDetails = action.payload;
        },
        setReferenceId: (state, action) => {
            state.referenceId = action.payload;
        },
        setTicketUserDetails: (state, action) => {
            state.ticketUserDetails = {
                ...state.ticketUserDetails,
                ...action.payload,
            };
        },
        resetEventTicketBooking: (state) => {
            state.eventTicketBooking = [];
            state.referenceId = null;
            state.ticketSummaryDetails = null;
        },
    },
});

export const {
    setEventDetails,
    setEventDetail,
    setTicket,
    setTicketDetails,
    updateTicketDetails,
    deleteTicket,
    resetEventState,
    setEventData,
    setEventDataTicketsData,
    setEventDataTicketsLoading,
    setEventDataTicketsError,
    changeEventDataTicketsQuantity,
    changeTicketStep,
    setTicketQuantity,
    setIsBookedTicket,
    setIsSetDetails,
    resetEventTicketBooking,
    setTicketSummaryDetails,
    setReferenceId,
    setTicketUserDetails,
} = eventSlice.actions;

const TRANSACTION_FEE_RATE = 0.01;

export const selectPriceDetails = createSelector(
    (state) => state.event.eventTicketBooking || [],
    (eventTicketBooking) => {
        const totalPrice = eventTicketBooking.reduce((total, ticket) => {
            return total + parseFloat(ticket.price);
        }, 0);

        const transactionFee = totalPrice * TRANSACTION_FEE_RATE;
        const finalTotal = totalPrice + transactionFee;

        return {
            subTotalPrice: totalPrice.toFixed(2),
            transactionFee: transactionFee.toFixed(2),
            totalPrice: finalTotal.toFixed(2),
        };
    }
);

export const selectEventDetails = (state) => state.event;

export default eventSlice.reducer;
