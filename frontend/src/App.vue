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
  
  
  //NAVIGATION
  .navbar{
    background: $colorMain;
  }

  .routerRed{
   color:$colorSecondary;
  }
  
  a:hover{
    color: $colorSecondaryHover;
  }

  .routerWhite{
   color:$color3;
  }
  
  //BUTTONS
  .buttonMain{
    background:$colorSecondary;
    color: $color3
  }

  .buttonSecondary{
    background:$colorMain;
    color: $color3
  }

  .buttonMain:hover{
    background: $colorSecondaryHover;
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
  .postBorder{
    border:  1px solid $colorMain;
  }

  .textPost{
    color: $colorMain;
  }

  .card-footer{
    border-top:  1px solid $colorMain;
  }
</style>
