<template>
    <nav class="navbar navbar-expand-lg justify-content-between">
        <img id="navbarLogo" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo"/>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav ">
                <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link routerWhite" to="/wall">Wall</router-link>
                </li>
                 <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link routerWhite" to="/profile">Mon compte</router-link>
                </li>
                <li class="nav-item" v-if="user.token!==null">
                    <router-link class="nav-link routerRed" to="/" @click.prevent="disconnect">Deconnexion</router-link>
                </li>
                <li class="nav-item" v-if="user.token==null">
                    <router-link class="nav-link routerRed" to="/">Veuillez vous connecter</router-link>
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

#navbarLogo {
    margin-top: auto;
    margin-bottom: auto;
    width: 250px;
}

@media all and (max-width: 767px){
    #navbarLogo {
    width: 130px;
    }
}
</style>