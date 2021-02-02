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

  .buttonEdit{
    background: none;
    color: $colorMain;
    :hover{
      color: $colorSecondaryHover;
    }
  }

  .buttonDelete{
    background: none;
    color: $colorSecondary;
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
      color: white;
    }
  }
    .navbar-toggler:focus{
      outline: none;
  }
  //POST
  .textPost{
    color: $colorMain;
  }

</style>
