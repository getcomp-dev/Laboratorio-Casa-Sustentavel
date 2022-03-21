<template>
  <div class="printer_bar" v-on:click="printerClicked">
    <button class="btn" :class="actualState.type" type="submit">
      <span class="badge" v-if="commandsProcessing > 0">{{commandsProcessing}}</span>
      <span class="fa fa-print"></span>
      {{showingState ? actualState.nome : ''}}
    </button>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Printer',

  data() {
    return {
      commandsProcessing: 0,
      showingState: true,
      printerState: 0,
      printStates: {
        0: {nome: 'Desconectada', type:'btn-danger'},
        1: {nome: 'Conectando...', type:'btn-info'},
        2: {nome: 'Reconectando...', type:'btn-info'},
        3: {nome: 'Conectada', type:'btn-success'},
        4: {nome: 'Erro', type:'btn-warning'},
      }
    };
  },

  computed: {
    actualState() {
      return this.printStates[this.printerState]
    }
  },

  methods: {
    printerClicked () {
      if(this.printerState !== 3) {
        this.$socket.open()  // Tenta reconectar ao clicar
      }

      this.showState()
    },

    showState () {
      this.showingState = true
      this.hideState()
    },

    hideState: _.debounce(function () {
      this.showingState = false
    }, 3000),

    printerPrint (cb) {
      if(this.printerState !== 3) {
        window.console.log('Erro! A impressora está desconectada!');
        return;
      }

      cb((data) => {
        this.commandsProcessing += 1;
        this.$socket.emit('doPrint', data);
      });
    },

    doCodePrint (code) {
      this.printerPrint((send) => {
        send({'template': 'code', 'data': code});
      });
    },

    doResumePrint (data) {
      this.printerPrint((send) => {
        send({'template': 'resume', data});
      });
    },
  },

  watch: {
    'printerState' () {
      this.showState();
    }
  },

  sockets:{
    // Printer events
    printStatus: function (data) {
      this.commandsProcessing -= 1;
      if (data.success) {
        window.console.log(`Sucesso! ${data.msg}`);
      } else {
        window.console.log(`Erro! ${data.msg}`);
      }
    },

    // Conection State
    disconnect: function(){
      this.printerState = 0;
    },
    connecting: function(){
      this.printerState = 1;
    },
    reconnecting: function(){
      this.printerState = 2;
    },
    connect: function(){
      this.printerState = 3;
    },
    reconnect: function(){
      this.printerState = 3;
    },
    error: function(){
      this.printerState = 4;
    },
    connect_error: function(){
      this.printerState = 4;
    },
    reconnect_error: function(){
      this.printerState = 4;
    }
  },

  created () {
    this.$socket.open()
  },

  beforeDestroy () {
    this.$socket.close()
  }
}
</script>

<style scoped>
.printer_bar {
  position: fixed;
  top: 0;
  right: 0;
  width: auto;
  z-index: 998;
}

.printer_bar > button {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
}

.badge {
  position: absolute;
  top: -6px;
  left: -10px;
  font-size: 13px;
  background: #b4240e;
  color: white;
  width: 20px;
  height: 18px;
  text-align: center;
  line-height: 13px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
</style>