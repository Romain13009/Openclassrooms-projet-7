<template>
  <div>
    <NavbarMain />
    <div id="wallPost">
      <div class="col-6-lg" id="divButtonPost" v-if="user.token !== null">
        <p id="pbuttonNewPost">
          <button
            class="btn buttonCreatePost"
            id="buttonNewPost"
            type="button"
            data-toggle="collapse"
            data-target="#formCreatePost"
            aria-expanded="false"
            aria-controls="formCreatePost"
          >
            Que voulez-vous dire, {{ user.username }} ?
          </button>
        </p>
        <div class="collapse" id="formCreatePost">
          <div class="card card-body">
            <form>
              <div class="form-group">
                <label for="formContentPost">Écrivez votre texte ici !</label>
                <textarea
                  v-model="dataCreatePost.content"
                  class="form-control"
                  id="formContentPost"
                  minlength="1"
                  maxlength="150"
                  rows="3"
                  placeholder="150 caractères maximum"
                ></textarea>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  @change="onFileSelected"
                  class="custom-file-input"
                  id="formImagePost"
                />
                <label class="custom-file-label" for="formImagePost"
                  >Choisissez une image</label
                >
              </div>
              <button
                type="submit"
                @click.prevent="createPost"
                class="btn buttonMain"
                id="buttonFormCreatePost"
              >
                Publier
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-6-lg" id="posts">
        <div v-for="post in allPosts" :key="post.id">
          <div id="containerPosts">
            <div class="card postBorder">
              <div class="card-header textPost">
                <div id="headerPost">
                  <div id="headerPostUser">
                    <div class="avatarPostCropper">
                      <img
                        :src="post.avatar"
                        alt="avatar de l'utilisateur"
                        class="avatarPost"
                        v-if="post.avatar"
                      />
                      <img
                        src="http://localhost:3000/images/avatar_default.png"
                        alt="avatar de l'utilisateur"
                        class="avatarPost"
                        v-else
                      />
                    </div>
                    <div class="infoPost">
                      <p class="UsernamePost">{{ post.username }}</p>
                      <p class="datePost">
                        {{ 
                          moment(post.createdAt)
                          .locale("fr")
                          .format('LL à HH:mm')
                        }}
                        <!-- {{moment(String(post.createdAt)).format('MM/DD/YYYY hh:mm')}} -->
                        <!-- le {{ post.createdAt.split("T")[0] }} à
                        {{ post.createdAt.split("T").pop().split(".000Z")[0] }} -->
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text" v-if="post.content !== 'null'">
                  {{ post.content }}
                </p>
                <img
                  :src="post.image"
                  alt="image publication"
                  class="imagePost"
                  v-if="post.image"
                />
              </div>
              <div class="card-footer">
                <div id="footerBorderLine"></div>
                <div id="footerPost">
                  <div class="divLike">
                    <button
                      class="btn btn-outline-light buttonLike"
                      @click.prevent="addLike"
                      type="button"
                      :id="post.id"
                    >
                      <i class="fas fa-thumbs-up" :id="post.id"></i>
                    </button>
                    <p>{{ post.likes }}</p>
                  </div>
                  <div id="footerPostButton">
                    <div
                      id="footerPostButtonRight"
                      v-if="
                        user.isAdmin == true || user.username == post.username
                      "
                    >
                      <button
                        type="button"
                        @click.prevent="ModifPostId"
                        class="btn buttonEdit btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        :id="post.id"
                      >
                        <i class="fas fa-edit fa-lg" :id="post.id"></i>
                      </button>
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Modifiez votre message ici
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <label for="formContentModif"
                                >Écrivez votre texte ici !</label
                              >
                              <textarea
                                v-model="dataModifPost.content"
                                class="form-control"
                                id="formContentModif"
                                maxlength="150"
                                rows="3"
                                placeholder="150 caractères maximum"
                              ></textarea>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Annuler
                              </button>
                              <button
                                type="button"
                                @click.prevent="ModifPost"
                                :id="post.id"
                                class="btn buttonMain"
                              >
                                Modifier
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click.prevent="deletePost"
                        :id="post.id"
                        class="btn buttonDelete btn-sm"
                      >
                        <i class="fas fa-trash-alt fa-lg" :id="post.id"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <textarea
                  class="form-control formContentComment"
                  :id="post.id"
                  v-model="dataCreateComment.content[post.id]"
                  maxlength="150"
                  rows="2"
                  placeholder="Donnez votre avis ici..."
                  @keyup.enter.exact="commentPost"
                  @keydown.enter.exact.prevent
                ></textarea>
                <!-- <CreateComment/> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import NavbarMain from "@/components/NavbarMain.vue";
// import CreateComment from "@/components/CreateComment.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Wall",
  components: {
    NavbarMain,
    // CreateComment
  },
  data() {
    return {
      moment: moment,
      allPosts: [],
      dataCreatePost: {
        content: null,
        image: null,
      },
      dataModifPost: {
        content: null,
        id: null,
      },
      like: {
        id: null,
      },
      dataCreateComment: {
        content: [],
        id: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onFileSelected(event) {
      this.dataCreatePost.image = event.target.files[0];
    },
    createPost() {
      const fd = new FormData();
      fd.append("image", this.dataCreatePost.image);
      fd.append("content", this.dataCreatePost.content);
      if (fd.get("image") !== "null" || fd.get("content") !== "null") {
        if (fd.get("content").length <= 255) {
          axios
            .post("http://localhost:3000/api/wall/new", fd, {
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
              alert("ERREUR ! Echec de la publication.");
            });
        }
      } else {
        alert(
          "ERREUR ! Echec de la publication, assurez vous que votre message contienne du texte et/ou une image."
        );
      }
    },
    deletePost(event) {
      if (event.target.id !== null) {
        axios
          .delete("http://localhost:3000/api/wall/delete", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
              id: event.target.id,
            },
          })
          .then((response) => {
            if (response) {
              window.location.reload();
            }
          })
          .catch(() => {
            alert("ERREUR ! Une erreur est survenue.");
          });
      } else {
        alert("ERREUR ! Publication introuvable.");
      }
    },
    ModifPostId(event) {
      this.dataModifPost.id = event.target.id;
    },
    ModifPost() {
      if (event.target.id !== null) {
        if (this.dataModifPost.content !== null) {
          axios
            .put("http://localhost:3000/api/wall/update", this.dataModifPost, {
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
              alert("ERREUR ! Une erreur est survenue.");
            });
        } else {
          alert("ERREUR ! Veuillez remplir le champ.");
        }
      } else {
        alert("ERREUR ! Publication introuvable.");
      }
    },
    addLike(event) {
      if (event.target.id !== null) {
        this.like.id = event.target.id;
        axios
          .post("http://localhost:3000/api/wall/posts/like", this.like, {
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
            alert("ERREUR ! Vous avez déjà liké cette publication.");
          });
      } else {
        alert("ERREUR ! Publication introuvable.");
      }
    },
    commentPost() {
      console.log(event.target.id); //id Post
      this.dataCreateComment.id = event.target.id;
      console.log(this.dataCreateComment.content[event.target.id]); //contenu du commentaire

      const fd = new FormData();
      fd.append("id", event.target.id);
      fd.append("content", this.dataCreateComment.content[event.target.id]);

      if (this.dataCreateComment.content[event.target.id] != undefined) {
        axios
          .post("http://localhost:3000/api/wall/posts/comment", fd, {
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
            alert("ERREUR ! Une erreur est survenue.");
          });
      } else {
        alert(
          "ERREUR ! Echec, assurez vous que votre commentaire ne soit pas vide."
        );
      }
    },
  },
  mounted() {
    this.$store.dispatch("getDataUser");
    axios
      .get("http://localhost:3000/api/wall", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.allPosts = response.data;
      })
      .catch(() => {
        alert("ERREUR ! Une erreur est survenue.");
      });
  },
};
</script>

<style scoped>
#wallPost {
  margin-top: 8rem;
  width: 100vw;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-header {
  border-bottom: none;
}

#headerPost {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

#headerPostUser {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  min-width: 100%;
}

.infoPost {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 2%;
}

.UsernamePost {
  font-weight: 650;
  margin: 0;
  padding: 0;
}

.datePost {
  margin: 0;
  padding: 0;
}

.avatarPostCropper {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 1px solid black; */
  box-sizing: content-box;
}
.avatarPost {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  object-fit: cover;
  object-position: center;
}

.imagePost {
  margin-top: 1rem;
  max-width: 100%;
}

.card-footer {
  border: none;
}

#footerBorderLine {
  border-top: 1px solid rgba(0, 0, 0, 0.459);
  margin-bottom: 1rem;
}

#footerPost {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 1.5rem;
}

#footerPostButton {
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#footerPostButtonRight {
  display: flex;
  flex-direction: row;
}

#divButtonPost {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-bottom: -2rem;
}

.formContentComment {
  background: rgba(0, 0, 0, 0.04);
  border: none;
  margin-top: 1rem;
}

#formCreatePost {
  width: 25rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.171);
}

#buttonNewPost {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.171);
}
#buttonFormCreatePost {
  margin-top: 1rem;
}

.divLike {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}

.divLike > p {
  margin-top: auto;
  margin-bottom: auto;
}

.buttonLike {
  color: rgb(0, 206, 69);
  border: none;
}

#containerPosts {
  margin-top: 2rem;
  width: 35vw;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.171);
}

#posts {
  margin-top: 1rem;
}

@media all and (max-width: 600px) {
  #formCreatePost {
    width: 90vw;
  }
  #containerPosts {
    min-width: 90vw;
  }
  #footerPostButton {
    min-width: 30%;
  }
}
@media all and (max-width: 992px) {
  #posts {
    margin-top: 1rem;
  }
  .infoPost {
    margin-left: 5%;
  }
  #footerPostButton {
    width: 20%;
  }
}

@media all and (max-width: 1025px) {
  #containerPosts {
    width: 60vw;
  }
}
</style>
