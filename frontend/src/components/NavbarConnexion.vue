<template>
    <nav class="navbar navbar-expand-lg" style="bgNavbar">
        <div id="navbarContent">
            <img id="navbarLogo" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo Groupomania"/>
            <div id="navbarContentRight">
                <ul id="navbarList">
                    <li class="nav-item active">
                        <router-link class="nav-link routerBlack" to="/" aria-label="Connexion">S'identifier</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link routerRed" to="/signup" aria-label="Inscription">S'inscrire</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'NavbarConnexion'
}
</script>

<style scoped>
.navbar {
    min-height: 80px;
    max-width: 100vw;
}

#navbarContent{
    width: 100%;
    display: flex;
    justify-content:space-around;
}
#navbarContent > img{
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 20px;
   
}

#navbarContentRight{
    margin-top: auto;
    margin-bottom: auto;
}

#navbarList{
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-top: auto;
    margin-bottom: auto;
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