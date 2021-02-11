<template>
  <div>
    <NavbarConnexion />
    <main class="main">
      <form class="text-center w-50">
        <p class="h4 mb-4">IDENTIFICATION</p>

        <input
          type="email"
          v-model="dataLogin.email"
          id="defaultLoginFormEmail"
          class="form-control"
          placeholder="E-mail"
          aria-label="Écrire votre Email"
        />
        <p class="information">
          L'adresse mail avec laquelle vous vous êtes inscrit
        </p>

        <input
          type="password"
          v-model="dataLogin.password"
          id="defaultLoginFormPassword"
          class="form-control"
          placeholder="Mot de passe"
          aria-label="Écrire votre mot de passe"
        />
        <p class="information">Mot de passe avec lequel vous vous êtes inscrit</p>

        <button
          id="buttonLogin"
          class="btn btn-block my-1 buttonMain"
          type="submit"
          @click.prevent="loginSend"
          aria-label="Se connecter"
        >
          Connexion
        </button>
        <router-link
          class="nav-link routerBlack"
          to="/signup"
          aria-label=" Page Inscription"
          >Pas encore inscrit ? Cliquez ici !</router-link
        >
      </form>
    </main>
  </div>
</template>

<script>
import NavbarConnexion from "@/components/NavbarConnexion.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Login",
  components: {
    NavbarConnexion,
  },
  data() {
    return {
      dataLogin: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    loginSend() {
      if (this.dataLogin.email !== null && this.dataLogin.password !== null) {
        localStorage.removeItem("token");
        axios
          .post("http://localhost:3000/api/auth/users/login", this.dataLogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            window.location = "/wall";
          })
          .catch(() => {
            alert("ERREUR ! Email ou mot de passe incorrect.");
          });
      } else {
        alert("ERREUR ! Veuillez renseigner les champs Email et Mot de passe.");
      }
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

form {
  max-width: 400px;
}

.nav-link {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.nav-link:focus {
  border-bottom: 1px solid rgb(51, 51, 51);
  outline: none;
}
</style>
