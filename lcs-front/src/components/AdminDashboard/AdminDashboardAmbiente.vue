<template>
  <div class="AdminDashboardAmbiente" v-if="!isLoading">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{{ambiente.nome}}</h1>
    </div>
    <h3>Configurações Padrão</h3>
    <div class="card-columns">
      <div class="card" v-for="(conf, index) in ambiente.configuracao" :key="index">
        <div class="card-header">
          {{conf.nome}}
        </div>
        <div class="card-body">
          <p class="card-text text-center"><toggle-button v-model="conf.valor"
                                              :labels="{checked: 'Aberto', unchecked: 'Fechado'}"
                                              :width="100" :height="32"
                                              v-on:change="confChange(index)"/></p>
        </div>
      </div>
      <div class="card" :key="98765">
        <div class="card-header">
          Nova configuração
        </div>
        <div class="card-body">
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

    confChange(index) {
      ambienteService.updateConfiguracao(this.ambiente.id, index).then(() => {
      }).catch(() => {
       console.log('Erro ao atualizar configuração')
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
