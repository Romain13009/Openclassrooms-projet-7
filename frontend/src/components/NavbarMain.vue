<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse justify-content-center">
            <a href="#"><img class="w-50" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo"/></a>
        </div>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link text-info" to="/wall">Wall</router-link>
                </li>
                <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link text-info" to="/profile">Mon compte</router-link>
                </li>
                <li class="nav-item" v-if="user.token!==null">
                    <router-link class="nav-link text-danger" to="/" @click.prevent="disconnect">Deconnexion</router-link>
                </li>
                <li class="nav-item" v-if="user.token==null">
                    <router-link class="nav-link text-danger" to="/">Veuillez vous connecter</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'NavbarMain',
    computed: {
    ...mapState(["user"])
    },
    methods: {
        disconnect() {
            localStorage.clear();
            window.location="/"
        }
    }
}
</script>

<style scoped>
.navbar {
    position: fixed;
    z-index: 1;
    min-height: 80px;
    width: 100vw;
    margin-top: -6rem;
}
</style>