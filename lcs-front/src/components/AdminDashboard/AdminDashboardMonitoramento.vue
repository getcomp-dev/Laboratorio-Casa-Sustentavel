<template>
  <div class="AdminDashboardMonitoramento" v-if="!isLoading">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Monitoramento</h1>
    </div>
    <div class="container-fluid mt-3 mb-5">
      <div class="row">
        <div class="col-sm">
          <h3>Listagem</h3>
        </div>
        <div class="col-sm">
          <select class="custom-select" style="width: 100%;" v-model="ambiente" v-if="ambientes">
            <option :value="null">Todos Ambientes</option>
            <option v-for="amb in ambientes" :value="amb.id" :key="amb.id">
              {{ amb.nome }}
            </option>
          </select>
        </div>
        <div class="col-sm" style="text-align: right">
          <toggle-button v-model="auto"
                         :labels="{checked: 'Autlizando', unchecked: 'Desativado'}"
                         :width="100" :height="32"/>
        </div>
      </div>
    </div>

    <table class="table table-striped table-hover" v-if="loading === 0">
      <thead>
      <tr>
        <th>Data</th>
        <th>Ambiente</th>
        <th>Temperatura</th>
        <th>Umidade</th>
        <th>Luminosidade</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="logs && logs.length > 0">
        <tr v-for="log in logs" :key="log.id">
          <td>{{log.createdAt | dateReformat}}</td>
          <td>{{log.Ambiente.nome}}</td>
          <td>{{log.temperatura}} ‎°C</td>
          <td>{{log.umidade}}</td>
          <td>{{log.luminosidade}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="5" class="text-center">Nenhum log encontrado</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import logClimaticoService from '../../common/services/log-climatico'
import ambienteService from '../../common/services/ambiente'

export default {
  name: 'AdminDashboardMonitoramento',

  data () {
    return {
      logs: null,
      ambientes: null,
      loading: 0,

      ambiente: null,
      auto: false,
      autoInterval: null,
    }
  },

  methods: {
    loadLogClimatico () {
      this.loading++
      logClimaticoService.fetchAll({
        params: {
          filterAmbiente: this.ambiente
        }
      }).then(response => {
        this.logs = response.LogsClimaticos
      }).catch(() => {
        console.log('Error')
      }).then(() => {
        this.loading--
      })
    },

    loadAmbientes () {
      ambienteService.fetchAll().then((response) => {
        this.ambientes = response.Ambientes
      }).catch(() => {
        console.log('Erro')
      })
    }
  },

  watch: {
    'ambiente': function () {
      this.loadLogClimatico()
    },

    'auto': function (to) {
      if (to && !this.autoInterval) {
        this.autoInterval = setInterval(() => {
          this.loadLogClimatico()
        }, 10000)
      } else {
        if (this.autoInterval) {
          clearInterval(this.autoInterval);
        }
        this.autoInterval = null;
      }
    }
  },

  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },

  created () {
    this.loadAmbientes()
    this.loadLogClimatico()
    this.auto = true;
  },
}
</script>

<style scoped>
</style>
