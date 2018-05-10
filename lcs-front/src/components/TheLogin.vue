<template>
  <div id="loginForm" class="text-center">
    <form class="form-signin" v-on:submit.prevent="doLogin">
      <!--<img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <b-alert :show="Boolean(error)" variant="danger" dismissible>
        {{error}}
      </b-alert>
      <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: !isAmbienteLogin }" id="usuario-tab" href="#" v-on:click.prevent="ambienteLogin(false)">Usuário</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: isAmbienteLogin }" id="ambiente-tab" href="#" v-on:click.prevent="ambienteLogin(true)">Ambiente</a>
        </li>
      </ul>
      <label for="login" class="sr-only">Usuário</label>
      <input type="text" id="login" class="form-control" placeholder="Usuário" v-model.trim="form.login">
      <label for="senha" class="sr-only">Senha</label>
      <input type="password" id="senha" class="form-control" placeholder="Senha" v-model.trim="form.senha">
      <select class="form-control" v-model="form.ambiente" v-show="isAmbienteLogin">
        <option v-bind:value="0">Selecione o ambiente</option>
        <option v-for="ambiente in ambientes" :key="ambiente.id" :value="ambiente.id">
          {{ ambiente.ordem }} - {{ ambiente.nome }}
        </option>
      </select>
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import ambienteService from '../common/services/ambiente'
import {COMPONENT_LOADING, COMPONENT_LOADED} from '../vuex/mutation-types'

export default {
  name: 'TheLogin',

  data () {
    return {
      ambientes: [],
      isAmbienteLogin: false,
      form: {
        login: undefined,
        senha: undefined,
        ambiente: 0
      }
    }
  },

  methods: {
    ambienteLogin (state) {
      this.isAmbienteLogin = state
      if(!state) {
        this.form.ambiente = 0
      }
    },
    doLogin () {
      this.$store.dispatch('authenticate', this.form).then(response => {
        if (response.Auth.isAmbiente) {
          this.$router.replace({name: 'application'})
        } else if (response.Auth.administrador) {
          this.$router.replace({name: 'adminDashboard'})
        } else {
          this.$router.replace({name: 'dashboard'})
        }
      }).catch(() => {
        // do something?
      })
    }
  },

  computed: {
    error () {
      return this.$store.state.auth.error
    }
  },

  created () {
    this.$store.commit(COMPONENT_LOADING)
    ambienteService.fetchAll().then((response) => {
      this.ambientes = response.Ambientes
    }).catch(() => {
      console.log('Erro')
    }).then(() => {
      this.$store.commit(COMPONENT_LOADED)
    })
  }
}
</script>

<style scoped>
#loginForm {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
