<template>
    <div class="modal" @click.self="$emit('close')">
        <div class="modal-content">
            <h3>{{ formTitle }}</h3>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="event-name">Name</label>
                    <input type="text" id="event-name" v-model="event.name" required>
                </div>
                <div class="form-group">
                    <label for="event-description">Description</label>
                    <textarea id="event-description" v-model="event.description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="event-date">Date</label>
                    <input type="date" id="event-date" v-model="event.date" required>
                </div>
                <div class="form-group">
                    <label for="event-time">Time</label>
                    <input type="time" id="event-time" v-model="event.time" required>
                </div>
                <div class="form-group">
                    <label for="event-location">Location</label>
                    <input type="text" id="event-location" v-model="event.location" required>
                </div>
                <div class="form-group">
                    <label for="event-type">Type</label>
                    <select id="event-type" v-model="event.type" required>
                        <option value="meeting">Meeting</option>
                        <option value="question-answer">Question & Answer</option>
                        <option value="conference">Conference</option>
                        <option value="webinar">Webinar</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit">{{ formSubmitButton }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            default: () => ({
                name: "",
                description: "",
                date: "",
                time: "",
                location: "",
                type: ""
            })
        },
        formTitle: {
            type: String,
            default: "Add Event"
        },
        formSubmitButton: {
            type: String,
            default: "Save"
        }
    },
    methods: {
        submitForm() {
            this.$emit("submit", this.event);
        }
    }
};
</script>
