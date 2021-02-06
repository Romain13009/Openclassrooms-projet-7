<template>
  <div class="commentList">
    <div
      v-for="comment in dataShowComments"
      v-bind:key="comment.id"
      class="allcomments"
    >
      <div class="comment">
        <div class="commentPartRight">
          <div class="avatarCommentCropper">
            <img
              :src="comment.avatar"
              alt="avatar de l'utilisateur"
              class="avatarComment"
              v-if="comment.avatar"
            />
            <img
              src="http://localhost:3000/images/avatar_default.png"
              alt="avatar de l'utilisateur"
              class="avatarComment"
              v-else
            />
          </div>
          <div class="infosComment">
            <p class="usernameComment">
              {{ comment.username }}
            </p>
            <p class="contentComment">{{ comment.content }}</p>
          </div>
        </div>

        <div
          v-if="isAdmin == true || user == comment.userId"
          class="buttonEditComment"
        >
          <button
            type="button"
            @click.prevent="ModifCommentId"
            class="btn buttonEdit btn-sm"
            data-toggle="modal"
            data-target="#ModalComment"
            :id="comment.id"
          >
            <i class="fas fa-edit fa-lg" :id="comment.id"></i>
          </button>
          <div
            class="modal fade"
            id="ModalComment"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modifiez votre commentaire ici.
                  </h5>
                </div>
                <div class="modal-body">
                  <textarea
                    v-model="dataModifComment.content"
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
                    @click.prevent="ModifComment"
                    :id="comment.id"
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
            @click.prevent="deleteComment"
            :id="comment.id"
            class="btn buttonDelete btn-sm"
          >
            <i class="fas fa-trash-alt fa-lg" :id="comment.id"></i>
          </button>
        </div>
      </div>
      <p class="dateComment">
        {{ moment(comment.createdAt).locale("fr").fromNow() }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "AllComment",
  props: ["post", "user", "isAdmin"],
  data() {
    return {
      moment: moment,
      dataShowComments: [],
      dataModifComment: {
        content: null,
        id: null,
      },
    };
  },
  methods: {
    deleteComment(event) {
      if (event.target.id !== null) {
        axios
          .delete("http://localhost:3000/api/wall/posts/deletecomment", {
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
        alert("ERREUR ! Commentaire introuvable.");
      }
    },
    ModifCommentId(event) {
      this.dataModifComment.id = event.target.id;
    },
    ModifComment(event) {
      if (event.target.id !== null) {
        if (this.dataModifComment.content !== null) {
          axios
            .put(
              "http://localhost:3000/api/wall/posts/updatecomment",
              this.dataModifComment,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
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
        alert("ERREUR ! Commentaire introuvable.");
      }
    },
  },
  mounted() {
    if (this.post != undefined) {
    axios
      .get("http://localhost:3000/api/wall/posts/getcomment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          id: this.post,
        },
      })
      .then((response) => {
        if (response !== null) {
          this.dataShowComments = response.data;
        }
      })
      .catch(() => {
        console.log("Cette publication ne contient pas de commentaire");
      });
    } else {console.log('Soyez le premier à créer une publication!')
    }
  },
};
</script>

<style scoped>
.commentList {
  margin-top: 25px;
}

.allComments {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment {
  display: flex;
  flex-direction: row;
  margin-top: -5px;
  justify-content: space-between;
}

.commentPartRight {
  display: flex;
  flex-direction: row;
  width: 75%;
}

.avatarCommentCropper {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-sizing: content-box;
}
.avatarComment {
  width: inherit;
  height: inherit;
  border-radius: inherit;
  object-fit: cover;
  object-position: center;
}

.infosComment {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  background: rgba(0, 0, 0, 0.04);
  padding: 8px;
  max-width: 75%;
  border-radius: 10px;
}

.usernameComment {
  margin: 0;
  padding: 0;
  font-weight: 650;
}

.contentComment {
  margin: 0;
  padding: 0;
}

.dateComment {
  font-size: 0.8rem;
  color: rgb(151, 151, 151);
  display: flex;
  justify-content: flex-end;
}

.buttonEditComment {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 25%;
  justify-content: flex-end;
}

button {
  width: 100%;
}

/*Modal*****************************************************/
.modal {
  /* width: 80vw; */
}
</style>