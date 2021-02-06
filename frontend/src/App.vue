<template>
  <router-view/>
</template>

<script>
</script>

<style lang="scss">
  $colorMain: #061f42;
  $colorSecondary: #d35059;
  $colorSecondaryHover: #a84249;
  $color3: white;
  $color4: black;
  $colorInformation:rgb(107, 107, 107);
  
  //GENERAL

textarea:focus,
input[type="text"]:focus,
input[type="name"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
input[type="file"]:focus,
button:focus,
.uneditable-input:focus,
#buttonLogin:focus,
#inscriptionButton:focus,
.custom-file-label:focus,
#formImagePost:focus,
.custom-file:focus,
#formContentPost:focus,
label:focus,
#buttonFormCreatePost:focus,
.btn:focus:focus,
.form-control:focus,
.buttonShowHide:focus  {   
  border-color: $colorSecondary;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px $colorSecondary;
  outline: 0 none;
}

.nav-link:focus{   
  border-color: $colorSecondary;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px $colorSecondary;
  outline: 0 none;
  border-radius: 3px;
}

.custom-file-label:hover,
#formImagePost:hover,
.custom-file:hover  {
  cursor: pointer;
}
  //NAVIGATION
  .navbar{
    background: $color3;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.171);
  }

  .routerRed{
   color:$colorSecondary;
  }
  
  a:hover{
    color: $colorSecondaryHover;
  }

  .routerBlack{
   color:$color4;
  }
  
  //LOGIN SIGNUP
  .information{
    color: $colorInformation;
    font-size: 12px;
  }

  //BUTTONS
  .buttonMain{
    background:none;
    color: $colorSecondary
  }

  .buttonMain:hover{
      background: $colorSecondary;
      color: $color3;
    }

  .buttonSecondary{
    background:none;
    color: $colorMain
  }

  .buttonSecondary:hover{
    background: $colorMain;
    color: $color3
  }

  .buttonCreatePost{
    background: $colorSecondary;
    color: $color3;
  }

  .buttonCreatePost:hover{
    background: $colorSecondaryHover;
  }

  .buttonEdit, .buttonDelete{
    background: none;
    color: $colorMain;
    :hover{
      color: $colorSecondaryHover;
    }
  }


  .buttonEditProfil{
    background: $colorMain;
    color: $color3
  }

  .navbar-toggler{
    i{
      color: $color3;
    }
  }
    .navbar-toggler:focus{
      outline: none;
  }

  .custom-file-input{
    height: 0;
  }
  //POST
  .textPost{
    color: $colorMain;
  }

  .card-header, .card-footer{
    background: $color3;
  }

</style>
