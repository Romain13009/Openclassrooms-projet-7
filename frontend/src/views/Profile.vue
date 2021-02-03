<template>
  <div>
    <NavbarMain />
    <div class="row" id="mainProfile">
      <div class="page-content page-container" id="page-content">
        <div class="card cardMain">
          <div class="card-body text-center">
            <div>
              <div class="avatarProfileCropper">
                <img
                  :src="user.avatar"
                  alt="avatar de l'utilisateur"
                  class="avatarProfile"
                  v-if="user.avatar"
                />
                <img
                  src="http://localhost:3000/images/avatar_default.png"
                  alt="avatar de l'utilisateur"
                  class="avatarProfile"
                  v-else
                />
              </div>
              <h4>{{ user.username }}</h4>
            </div>
            <p class="mt-2 card-text">{{ user.description }}</p>
            <div class="border-top pt-3">
              <div class="row">
                <div class="col-lg-6">
                  <h6>E-mail:</h6>
                  <p>{{ user.email }}</p>
                </div>
                <div class="col-lg-6">
                  <h6>Modifiez votre description:</h6>
                  <!-- Button trigger modal -->
                  <p>
                    <button
                      class="btn buttonEditProfil buttonModif"
                      type="button"
                      data-toggle="collapse"
                      data-target="#formCreatePost"
                      aria-expanded="false"
                      aria-controls="formCreatePost"
                    >
                      Cliquez ici !
                    </button>
                  </p>
                  <div class="collapse" id="formCreatePost">
                    <div class="card card-body cardModifDescription">
                      <form>
                        <div class="form-group">
                          <label for="formContentPost"
                            >Modifiez votre description ici !</label
                          >
                          <textarea
                            v-model="dataModif.description"
                            class="form-control"
                            id="formContentPost"
                            maxlength="150"
                            rows="3"
                            placeholder="150 caractères maximum"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          class="btn buttonMain"
                          id="buttonFormCreatePost"
                          @click.prevent="modifDescription"
                        >
                          Sauvegardez vos modification
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-top pt-3" id="blockModif2">
              <div class="row">
                <div class="col-12">
                  <h6>Supprimez votre compte:</h6>
                  <h6>
                    (Attention, cette action est irréversible et entraînera une
                    suppression des publications !)
                  </h6>
                  <button
                    type="button"
                    class="btn buttonDelete buttonModif"
                    @click.prevent="deleteUser"
                  >
                    <i class="fas fa-skull-crossbones fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMain from "@/components/NavbarMain.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Wall",
  components: {
    NavbarMain,
  },
  data() {
    return {
      dataModif: {
        description: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    deleteUser() {
      axios
        .delete("http://localhost:3000/api/auth/users/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          localStorage.clear();
          window.location = "/signup";
        })
        .catch(() => {
          alert(
            "ERREUR ! Suppression du compte impossible, contactez un administrateur."
          );
        });
    },
    modifDescription() {
      if (this.dataModif.description == null) {
        this.dataModif.description = " ";
      }
      axios
        .put("http://localhost:3000/api/auth/users/profile", this.dataModif, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response) {
            window.location.reload();
          }
        })
        .catch(() => {
          alert("ERREUR ! Modification impossible.");
        });
    },
  },
  mounted() {
    this.$store.dispatch("getDataUser");
  },
};
</script>

<style scoped>
#mainProfile {
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.cardMain {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #d2d2dc;
  border-radius: 0;
  width: 80vw;
}

h6 {
  font-size: 1rem;
}

.buttonModif {
  width: 120px;
}

#blockModif2 {
  margin-top: 1rem;
}

.avatarProfileCropper {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-sizing: content-box;
  margin-bottom: 20px;
}
.avatarProfile {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  object-fit: cover;
  object-position: center;
}
</style>
