<template>
    <div class="modal">
        <div class="modal-content">
            <h3 class="title">{{ editMode ? "Edit Event" : "Add Event" }}</h3>
            <form @submit.prevent="editMode ? submitEditForm() : submitAddForm()">
                <input placeholder="Event name..." type="text" id="name" v-model="event.name" required />
                <textarea placeholder="Event description..." id="description" v-model="event.description" required></textarea>
                <input placeholder="Location..." type="text" id="location" v-model="event.location" required />
                <div class="dateTimeRow">
                    <span>{{ formatDate(selectedDate) }} at</span>
                    <input type="hidden" v-model="event.date" />
                    <select v-model="event.time" required>
                        <option
                            v-for="time in timeOptions"
                            :key="time"
                            :value="time"
                            :selected="time === event.time"
                        >{{ time }}</option>
                    </select>
                </div>

                <select id="event_type" v-model="event.type" required>
                    <option value="meeting">Meeting with an Expert</option>
                    <option value="qa">Question Answer</option>
                    <option value="conference">Conference</option>
                    <option value="webinar">Webinar</option>
                </select>

                <div class="btn-group d-flex justify-content-end align-center">
                    <button v-if="editMode" class="addEventBtn" type="button">Delete</button>
                    <button class="cancelBtn" @click.prevent="$emit('close')">Close</button>
                    <button v-if="editMode" class="addEventBtn" type="submit">Save</button>
                    <button v-else class="addEventBtn" type="submit">Add Event</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        selectedDate: {
            type: Date,
            required: true,
        },
        selectedFormattedDate: {
            type: String,
            required: true,
        },
        editMode: {
            type: Boolean,
            default: false,
        },
        event: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            event: this.editMode ? JSON.parse(JSON.stringify(this.event)) : {
                name: "",
                description: "",
                date: "",
                time: "",
                location: "",
                type: "",
            },
            timeOptions: [
                "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
                "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
            ],
        };
    },
    created() {
        this.event.date = this.selectedFormattedDate;
        if (this.editMode) {
            this.event.time = this.formatTimeWithoutMilliseconds(this.event.time);
        }
    },
    methods: {
        async submitForm() {
            try {
                const date = this.event.date;
                const time = this.event.time;

                await axios.post("/api/events", {
                    name: this.event.name,
                    description: this.event.description,
                    date: date,
                    time: time,
                    location: this.event.location,
                    type: this.event.type,
                });
                this.$emit("eventAdded");
                this.$emit("close");
            } catch (error) {
                console.error("Error adding event:", error);
            }
        },
        async submitEditForm() {
            try {
                const date = this.event.date;
                const time = this.event.time;

                await axios.put(`/api/events/${this.event.id}`, {
                    name: this.event.name,
                    description: this.event.description,
                    date: date,
                    time: time,
                    location: this.event.location,
                    type: this.event.type,
                });
                this.$emit("eventEdited");
                this.$emit("close");
            } catch (error) {
                console.error("Error updating event:", error);
            }
        },
        formatDate(date) {
            return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long' }).format(date);
        },
        formatTimeWithoutMilliseconds(time) {
            const timeArray = time.split(':');
            return `${timeArray[0]}:${timeArray[1]}`;
        },

    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #111111;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
}
</style>
