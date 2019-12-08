<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: sanserifing;
  src: url("./assets/font/Sanserifing.ttf");
}

@font-face {
  font-family: futurabkbt;
  src: url("./assets/font/FuturaBkBt.ttf");
}

html {
  height: 100%;
}

body {
  /*background-image: url("./assets/img/bg.png");*/
  background-size: 100%;
  height: 100%;
  /*background-color: #e5cea3 !important;*/
}

#app {
  height: 100%;
}

#labSustentavel {
  background-image: url("./assets/img/footer.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  margin: 0;
  padding: 0;
  min-height: 600px;
}

</style>
