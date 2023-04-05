<template>
    <div class="mt-4">
        <div class="col-12 mt-2 mb-2">
            <h4>Calendar</h4>
            <button
                v-for="type in eventTypes"
                :key="type.value"
                @click="toggleFilter(type.value)"
                :class="['filter-btn', { 'selected': isTypeSelected(type.value) }, type.value]">
                {{ type.text }}
            </button>
        </div>
        <v-calendar
            class="col-12"
            transparent="true"
            borderless="true"
            is-dark="isDark"
            locale="en-US"
            title-position="left"
            dayPopover="MMM"
            :masks="{title: 'MMMM'}"
            :expanded="true"
            :attributes="calendarAttributes"
            :rows="2"
            :columns="3"
            @dayclick="onDayClick">
            <template #day-popover="{ date, dayTitle }">
                <div class="popoverEvent">
                    <h3 class="title">Events</h3>
                    <div class="eventsCards">
                        <div v-for="event in hoverEvents" class="eventCard">
                            <div class="eventCardBody">
                                <h5 class="eventTitle">
                                    {{ event.customData.event.name }}
                                    <button class="edit-btn" @click.stop="openEditEventModal(event.customData.event)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </button>
                                </h5>
                                <p class="eventCardText">{{ event.customData.event.description }}</p>
                                <p class="location">{{ event.customData.event.location }}</p>
                            </div>
                            <div class="eventCardFooter" :class="event.customData.color">
                                <div class="date">
                                    {{ formatDate(event.customData.event.date) }}, {{ event.customData.event.time }}
                                </div>
                                <div :class="'type ' + event.customData.event.type">
                                    {{ event.customData.type }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="addEventBtn" @click.stop="openAddEventModal(selectedDate)">Add Event</button>
                </div>
            </template>
        </v-calendar>
        <AddEventModal
            v-if="showAddEventModal"
            :selectedDate="selectedDate"
            :selectedFormattedDate="selectedFormattedDate"
            :editMode="selectedEvent.id !== undefined"
            :event="selectedEvent"
            @close="closeAddEventModal"
            @eventAdded="async () => { eventsArray = await fetchEvents(); }"
            @eventEdited="async () => { eventsArray = await fetchEvents(); }"
            @eventDeleted="async () => { eventsArray = await fetchEvents(); }"
        />
    </div>
</template>

<script>
import axios from "axios";
import AddEventModal from "./AddEventModal.vue";

export default {
    components: {
        AddEventModal,
    },
    data() {
        return {
            eventsArray: [],
            showPopover: false,
            showAddEventModal: false,
            hoverDate: null,
            selectedDate: null,
            selectedEvent: [],
            selectedFormattedDate: null,
            hoverEvents: [],
            selectedEventTypes: [],
            eventTypes: [
                { value: "meeting", text: "Meeting with an Expert", color: "pink-event" },
                { value: "qa", text: "Question Answer", color: 'green-event' },
                { value: "conference", text: "Conference", color: 'yellow-event' },
                { value: "webinar", text: "Webinar", color: 'blue-event' },
            ],
        };
    },
    async created() {
        this.eventsArray = await this.fetchEvents();
    },

    computed: {
        calendarAttributes() {
            return this.eventsArray
                .filter(event => {
                    return (
                        this.selectedEventTypes.length === 0 ||
                        this.selectedEventTypes.includes(event.event.type)
                    );
                })
                .map(event => ({
                    dates: event.dates,
                    dot: {
                        color: event.color,
                        class: event.isComplete ? 'opacity-75' : '',
                    },
                    popover: true,
                    customData: event,
                }));
        },
    },

    methods: {
        async fetchEvents() {
            try {
                const response = await axios.get("/api/events");
                return response.data.map((event) => {
                    const eventType = this.eventTypes.find(type => type.value === event.type);
                    const color = eventType ? eventType.color : 'red';
                    const type = eventType ? eventType.text : 'undefined';

                    return {
                        isComplete: false,
                        dates: new Date(event.date),
                        color: color,
                        type: type,
                        event,
                    };
                });
            } catch (error) {
                console.error(error);
            }
        },
        onDayClick(day) {
            this.hoverEvents = day.attributes;
            this.selectedDate = day.date;
            this.selectedFormattedDate = this.formatSelectedDate(day.date);
            if (!day.attributes.length > 0) {
                this.showAddEventModal = true;
            }
        },
        formatSelectedDate(date) {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        openAddEventModal(date) {
            this.selectedDate = date;
            this.selectedEvent = {}; // Clear the selectedEvent before opening the modal
            this.showAddEventModal = true;
        },
        openEditEventModal(event) {
            this.selectedEvent = event;
            this.selectedDate = new Date(event.date);
            this.selectedFormattedDate = this.formatSelectedDate(this.selectedDate);
            this.showAddEventModal = true;
        },
        closeAddEventModal() {
            this.showAddEventModal = false;
            this.selectedEvent = {}; // Clear the selectedEvent when the modal is closed
        },
        toggleFilter(type) {
            if (this.selectedEventTypes.includes(type)) {
                this.selectedEventTypes = this.selectedEventTypes.filter(
                    eventType => eventType !== type
                );
            } else {
                this.selectedEventTypes.push(type);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long' });

            return `${day} ${month}`;
        },
        isTypeSelected(type) {
            return this.selectedEventTypes.includes(type);
        },
    },
};
</script>



<style scoped>
.vc-popover {
    background-color: #343a40;
    color: #f1f1f1;
    border: 1px solid #4e4e4e;
}

.vc-popover .vc-popover-arrow::before {
    border-color: #343a40 transparent;
}

.filter-btn {
    border: none;
    padding: 5px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 20px;
}
</style>
