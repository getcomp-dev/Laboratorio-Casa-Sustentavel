<template>
  <div class="TheApplication" id="labSustentavel">
    <div id="header">
      <img src="../assets/logo.png" />
    </div>
    <div id="content">
      <div id="appTop" class="row">
        <div class="col-8" id="roomName">
          {{ ambiente.nome }}
        </div>
        <div class="col text-right" id="userCode">
          {{ etiqueta }}
        </div>
      </div>

      <div id="message">
        <img src="../assets/img/seta.png" /> Digite seu número de usuário
      </div>

      <div class="d-flex flex-wrap justify-content-center" id="codeType">
        <div
          class="px-4 py-1 m-3"
          v-for="n in 10"
          v-on:click="codeClick(n - 1)"
        >
          {{ n - 1 }}
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  name: "TheApplication",

  data() {
    return {
      etiqueta: "",
    };
  },

  methods: {
    codeClick(value) {
      if (this.etiqueta.length === 4) {
        this.etiqueta = "" + value;
      } else {
        this.etiqueta += value;
      }
    },
  },

  computed: {
    ambiente() {
      return this.$store.state.auth.auth;
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  margin-top: 0px;
  height: 0px;
}

#header img {
  /*width: 350px;*/
  /*height: 100px;*/
  position: absolute;
  top: 10px;
  left: 20px;
}

#content {
  margin: 5px 60px 0px 0px;
  width: 600px;
  float: right;
  z-index: 9000;
}

#appTop {
  color: rgba(13, 84, 94, 1);
  border-bottom-width: 2px !important;
  border-bottom-style: solid !important;
  border-color: rgb(14, 86, 96);
  font-family: sanserifing, serif;
  height: 90px;
}

#roomName {
  padding: 0px;
  padding-top: 37px;
  font-size: 3rem;
}

#userCode {
  font-family: futurabkbt, serif;
  font-size: 4.8rem;
  padding: 0px;
}

#message {
  font-family: futurabkbt, serif;
  font-size: 1.8rem;
  color: rgba(13, 84, 94, 1);
  font-weight: 200;
  margin-right: -15px;
  margin-left: -15px;
  margin-top: 10px;
}

#message img {
  width: 20px;
  height: 30px;
  margin-top: -8px;
}

#codeType div {
  font-size: 4rem;
  border-radius: 15px;
  color: white;
  background-color: var(--LCSGreen);
  border-color: var(--LCSGreen);
  border-radius: 10px;
}

#codeType div:hover {
  background-color: var(--LCSGreenDarker);
  color: #fefefe;
}
</style>
