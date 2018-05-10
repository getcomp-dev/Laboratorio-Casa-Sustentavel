<template>
  <div class="TheDashboard" id="labSustentavel">
    <div id="header">
      <img src="../assets/img/logo.png">
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheDashboard'
}
</script>

<style scoped>

#header {
  background-color: rgba(151, 131, 96, 0.49);
  width: 100%;
  margin-top: 35px;
  height: 40px;
}

#header img {
  width: 350px;
  height: 100px;
  position: absolute;
  top: 10px;
  left: 20px;
}

#content {
  margin: 32px auto 0px;
  width: 705px;
}

</style>