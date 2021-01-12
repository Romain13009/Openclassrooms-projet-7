<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse justify-content-center">
            <a href="#"><img class="w-50" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo"/></a>
        </div>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link text-info" to="/">Wall</router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link text-info" to="/">Mon compte</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-danger" to="/">Deconnexion</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarMain',
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