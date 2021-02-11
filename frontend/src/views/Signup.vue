<template>
  <div>
    <NavbarConnexion />
    <main class="main">
      <form class="text-center w-50">
        <p class="h4 mb-4">INSCRIPTION</p>
        <input
          type="Name"
          v-model="dataSignup.username"
          id="defaultSignupFormName"
          class="form-control"
          placeholder="Username (12 caractères maximum)"
          required
          aria-label="Écrire votre prénom">
          <p class="information">Votre Prénom</p>
        <input
          type="email"
          v-model="dataSignup.email"
          id="defaultSignupFormEmail"
          class="form-control"
          placeholder="E-mail"
          required
          aria-label="Écrire votre mail">
          <p class="information">Votre adresse email</p>
        <input
          type="password"
          v-model="dataSignup.password"
          id="defaultSignupFormPassword"
          class="form-control"
          placeholder="Mot de passe"
          required
          aria-label="Écrire votre mot de passe">
          <p class="information">Votre mot de passe</p>
        <input
          type="text"
          v-model="dataSignup.description"
          id="defaultSignupFormDescription"
          class="form-control"
          placeholder="Description (optionnel)"
          aria-label="Écrire votre description (optionnel)">
          <p class="information">Votre description (optionnel)</p>
        <div class="custom-file"> AVATAR
          <input
            type="file"
            @change="onFileSelected"
            class="custom-file-input"
            id="formImagePost"
            aria-label="Choisissez une image (optionel)">  
          <label class="custom-file-label" for="formImagePost"
            >Avatar</label
          >
          
        </div>
        <p class="information" id="informationAvatar">Votre avatar (optionnel)</p>
        <button
          class="btn buttonMain btn-block my-1"
          type="submit"
          @click.prevent="signupSend"
          id="inscriptionButton"
          aria-label="S'inscrire">
          Inscription
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import NavbarConnexion from "@/components/NavbarConnexion.vue";

export default {
  name: "Signup",
  components: {
    NavbarConnexion,
  },
  data() {
    return {
      dataSignup: {
        username: null,
        email: null,
        password: null,
        description: null,
        image: null,
      },
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
    onFileSelected(event) {
      this.dataSignup.image = event.target.files[0];
    },
    signupSend() {
      const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

      if (
        this.dataSignup.username !== null &&
        this.dataSignup.email !== null &&
        this.dataSignup.password !== null
      ) {
        if (
          this.dataSignup.username.length <= 20 &&
          this.dataSignup.username.length >= 4
        ) {
          if (
            this.dataSignup.email.match(regexEmail) &&
            this.dataSignup.password.match(regexPassword)
          ) {
            const fd = new FormData();
            fd.append("username", this.dataSignup.username);
            fd.append("email", this.dataSignup.email);
            fd.append("password", this.dataSignup.password);
            fd.append("description", this.dataSignup.description);
            fd.append("image", this.dataSignup.image);
            axios
              .post(
                "http://localhost:3000/api/auth/users/signup",
                fd
              )
              .then(() => {
                console.log(1)
                var dataLogin = {
                  email: null,
                  password: null,
                };
                dataLogin.email = this.dataSignup.email;
                dataLogin.password = this.dataSignup.password;
                localStorage.removeItem("token");
                axios
                  .post("http://localhost:3000/api/auth/users/login", dataLogin)
                  .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    window.location = "/wall";
                  })
                  .catch(() => {
                    alert(
                      "ERREUR ! Inscription impossible, réessayez plus tard."
                    );
                  });
              })
              .catch(() => {
                alert("ERREUR ! Cette adresse mail a déjà été utilisée.");
              });
          } else {
            alert(
              "ERREUR ! Echec d'inscription, assurez vous que votre Email et que votre mot de passe soient valides (au moins une majuscule, une minucule, un nombre et 8 caractères)"
            );
          }
        } else {
          alert(
            "ERREUR ! Echec d'inscription, votre username doit faire entre 4 et 12 caractères"
          );
        }
      } else {
        alert(
          "ERREUR ! Echec d'inscription, veuillez renseigner les champs email, username et password"
        );
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

label{
    display: flex;
    flex-direction: left;
}

#inscriptionButton{
  margin-top: 1.5rem;
}

#informationAvatar{
  margin-top: -12px;
}
</style>