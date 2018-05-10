<template>
  <div class="DashboardHome">
    <div id="pageTitle">
      <p class="text-center">Cadastro de usuário</p>
    </div>
    <div id="pageContent">
      <p class="text-center">BBB</p>
      CCCE
    </div>
    <div id="pageBottom">
      <p class="text-center">CCCCC</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHome'
}
</script>

<style scoped>

#pageTitle {
  margin-left: 5px;
  background-image: url("../../assets/img/content_top.png");
  background-size: 100%;
  height: 210px;
  padding-top: 50px;
  color: #2B300D;
  font-family: sanserifing, serif;
  font-size: 50px;
}

#pageContent {
  margin-left: 19px;
  background-image: url("../../assets/img/content_mid.png");
  background-size: 100%;
  width: 642px;
}

#pageBottom {
  background-image: url("../../assets/img/content_bot.png");
  background-size: 100%;
  width: 680px;
  height: 177px;
}

</style>