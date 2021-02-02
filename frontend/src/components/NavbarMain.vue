<template>
    <nav class="navbar navbar-expand-lg justify-content-between">
        <img id="navbarLogo" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo"/>
        <div id="navbarNav">
            <ul class="navbar-nav ">
                <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link routerBlack" to="/wall"><i class="fas fa-bell fa-lg"></i></router-link>
                </li>
                 <li class="nav-item active" v-if="user.token!==null">
                    <router-link class="nav-link routerBlack" to="/profile"><i class="fas fa-user fa-lg"></i></router-link>
                </li>
                <li class="nav-item" v-if="user.token!==null">
                    <router-link class="nav-link routerRed" to="/" @click.prevent="disconnect"><i class="fas fa-power-off fa-lg"></i></router-link>
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

nav {
    position: fixed;
    z-index: 2;
    min-height: 100px;
    width: 100vw;
    max-width: 100vw;
    margin-top: -8rem;
}

img{
    margin-left: 10%;
}

#navbarNav{
    width: 30%;
}

.navbar-nav{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

#navbarLogo {
    margin-top: auto;
    margin-bottom: auto;
    width: 250px;
}

@media all and (max-width: 767px){
    #navbarLogo {
    width: 150px;
    margin-left: auto;
    margin-right: auto;
    }

    #navbarNav{
    width: 100%;
    }
}
</style>