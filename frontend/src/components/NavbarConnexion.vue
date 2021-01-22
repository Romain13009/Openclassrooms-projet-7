<template>
    <nav class="row navbar navbar-expand-lg navbar-dark bg-dark">
        <div id="navbarContent">
            <img id="navbarLogo" src="../assets/icon-left-font-monochrome-white.svg" alt="Logo"/>
            <div id="navbarContentRight">
                <ul id="navbarList">
                    <li class="nav-item active">
                        <router-link class="nav-link text-light" to="/">S'identifier</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-info" to="/signup">S'inscrire</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarConnexion',
}
</script>

<style scoped>
.navbar {
    min-height: 80px;
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