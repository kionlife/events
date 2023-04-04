<template>
    <div id="app">
        <header class="bg-dark text-light header-border">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <a class="navbar-brand fw-bold" href="#">LOGO</a>
                        <div class="collapse navbar-collapse">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Main</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Events</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Calendar</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <main class="container bg-dark text-light">
            <CalendarView />
        </main>

        <footer class="bg-dark text-light">
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <h4 class="text-pink fw-bold">LOGO</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ul class="list-inline">
                            <li class="list-inline-item"><a href="#" class="text-dark">Main</a></li>
                            <li class="list-inline-item"><a href="#" class="text-dark">Events</a></li>
                            <li class="list-inline-item"><a href="#" class="text-dark">Calendar</a></li>
                            <li class="list-inline-item"><a href="#" class="text-dark">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="text-muted">&copy; 2022 All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
import CalendarView from "./components/CalendarView.vue";

export default {
    components: {
        CalendarView,
    },
};
</script>

<style>
.text-pink {
    color: #FF4E6B;
}

.border-pink {
    border-color: #FF4E6B;
}
</style>
