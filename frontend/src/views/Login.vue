<template>
    <NavbarConnexion />
    <main class="main justify-content-center">
        <form class="text-center border border-light p-5 w-25" action="#!">

            <p class="h4 mb-4">IDENTIFICATION</p>

            <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">

            <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Mot de passe">

            <button class="btn btn-info btn-block my-1" type="submit">Connexion</button>
        </form>
    </main>
</template>

<script>
import NavbarConnexion from '@/components/NavbarConnexion.vue'
export default {
    name: 'Login',
    components: {
        NavbarConnexion
  }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
}
</style>