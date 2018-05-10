<template>
  <div class="AdminDashboardAmbiente" v-if="!isLoading">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{{ambiente.nome}}</h1>
    </div>
    <h3>Configurações</h3>
    <div class="card-columns">
      <div class="card" v-for="conf in ambiente.configuracao">
        <div class="card-body">
          <h5 class="card-title">{{conf.nome}}</h5>
          <p class="card-text">{{conf.valor}}</p>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Nova configuração</h5>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Nome" v-model="form.nome">
            <div class="input-group-append">
              <button class="btn btn-success" type="button" v-on:click="addConf()">Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ambienteService from '../../common/services/ambiente'
import { COMPONENT_LOADING, COMPONENT_LOADED } from '../../vuex/mutation-types'

export default {
  name: 'AdminDashboardAmbiente',

  data () {
    return {
      ambiente: undefined,
      form: {
        nome: undefined
      }
    }
  },

  methods: {
    addConf () {
      ambienteService.addConfiguracao(this.ambiente.id, this.form).then(() => {
        this.loadAmbiente(this.ambiente.id)
      }).catch(() => {}).then(() => {
        this.form.nome = undefined
      })
    },

    loadAmbiente (id) {
      this.$store.commit(COMPONENT_LOADING)
      ambienteService.get(id).then(response => {
        this.ambiente = response.Ambiente
      }).catch(() => {
        this.$router.push({name: 'adminDashboard'})
      }).then(() => {
        this.$store.commit(COMPONENT_LOADED)
      })
    }
  },

  created () {
    this.loadAmbiente(this.$store.state.route.params.id)
  },

  watch: {
    '$store.state.route.params.id' (to, from) {
      this.loadAmbiente(to)
    }
  },

  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
}
</script>

<style scoped>
</style>
