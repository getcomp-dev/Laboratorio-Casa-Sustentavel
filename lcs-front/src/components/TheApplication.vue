<template>
  <div class="TheApplication" id="labSustentavel">
    <div id="header">
      <img src="../assets/img/logo.png">
    </div>
    <div id="content">
      <div id="appTop" class="row">
        <div class="col-8" id="roomName">
          {{ambiente.nome}}
        </div>
        <div class="col text-right" id="userCode">
          {{etiqueta}}
        </div>
      </div>

      <div id="message">
        <img src="../assets/img/seta.png"> Digite seu número de usuário
      </div>

      <div class="d-flex flex-wrap justify-content-center" id="codeType">
        <div class="px-4 py-1 m-3" v-for="n in 10" v-on:click="codeClick(n-1)">{{n-1}}</div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  name: 'TheApplication',

  data () {
    return {
      etiqueta: ''
    }
  },

  methods: {
    codeClick (value) {
      if (this.etiqueta.length === 4) {
        this.etiqueta = ''+value
      } else {
        this.etiqueta += value
      }

    }
  },

  computed: {
    ambiente () {
      return this.$store.state.auth.auth
    }
  }
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
  margin: 5px 60px 0px 0px;
  width: 600px;
  float: right;
  z-index: 9000;
}

#appTop {
  color: rgba(13, 84, 94, 1.0);
  border-bottom-width: 2px !important;
  border-bottom-style: solid !important;
  border-color: rgb(14, 86, 96);
  font-family: sanserifing, serif;
  height: 90px;
}

#roomName {
  padding: 0px;
  padding-top: 37px;
  font-size: 3.0rem;
}

#userCode {
  font-family: futurabkbt, serif;
  font-size: 4.8rem;
  padding: 0px;
}

#message {
  font-family: futurabkbt, serif;
  font-size: 1.8rem;
  color: rgba(13, 84, 94, 1.0);
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
  font-family: futurabkbt, serif;
  font-size: 4rem;
  background-color: #FEFEFE;
  color: #4D5035;
  border-radius: 15px;
  box-shadow: 15px 15px 5px rgba(80, 80, 80, 0.69);
}

#codeType div:hover {
  background-color: #4D5035;
  color: #FEFEFE;
}

</style>