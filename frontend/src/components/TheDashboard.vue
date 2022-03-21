<template>
  <div class="TheDashboard" id="labSustentavel">
    <div id="header">
      <img src="../assets/img/logo.png" />
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheDashboard",
};
</script>

<style scoped>
#header {
  background-color: #dfdfdf;
  width: 100vw;
  height: 100px;
}

#header img {
  height: 100px;
  width: auto;
  position: absolute;
  margin-left: 20px;
}

#content {
  margin: 32px auto 0px;
  width: 705px;
}
</style>
