<template>
  <div class="DashboardHome">
    <div id="pageTitle">
      <p class="text-center">Cadastro de Usuário</p>
    </div>
    <div id="pageContent">
      <div class="row">
        <div class="col">
          <div id="Sexo" class="mb-3">
            <div id="TopSexo">Sexo</div>
            <div id="BottomSexo">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="sexo"
                  class="custom-control-input"
                  value="F"
                  v-model="visitante.sexo"
                />
                <label class="custom-control-label" for="customRadioInline1"
                  >Feminino</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="sexo"
                  class="custom-control-input"
                  value="M"
                  v-model="visitante.sexo"
                />
                <label class="custom-control-label" for="customRadioInline2"
                  >Masculino</label
                >
              </div>
            </div>
          </div>
          <div class="row" id="Dados">
            <div class="col" id="LeftDados">
              Peso <input placeholder="Peso" /> <br />
              Altura <input placeholder="Altura" /> <br />
              Ano Nasc. <input placeholder="Ano de Nascimento" /> <br />
            </div>
          </div>
          <div id="CorDeRoupa">
            <div id="TopCorDeRoupa">Cor da Roupa</div>
            superior
            <div id="CorDeRoupaSuperiorRadios">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corSuperior1"
                  name="corSuperior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corSuperior1"
                  >claro</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corSuperior2"
                  name="corSuperior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corSuperior2"
                  >médio</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corSuperior3"
                  name="corSuperior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corSuperior3"
                  >escuro</label
                >
              </div>
            </div>
            inferior
            <div id="CorDeRoupaInferiorRadios">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corInferior1"
                  name="corInferior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corInferior1"
                  >claro</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corInferior2"
                  name="corInferior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corInferior2"
                  >médio</label
                >
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="corInferior3"
                  name="corInferior"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="corInferior3"
                  >escuro</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div id="tipoDeRoupa">
            <div id="tipoDeRoupaTitle">Escolha o Tipo de Roupa</div>
            <div id="tipoDeRoupaRadios">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="tipoRoupa1"
                  name="tipoRoupa"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="tipoRoupa1"></label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="tipoRoupa2"
                  name="tipoRoupa"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="tipoRoupa2"></label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="tipoRoupa3"
                  name="tipoRoupa"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="tipoRoupa3"></label>
              </div>
            </div>
            <template
              v-if="visitante.sexo === undefined || visitante.sexo === 'F'"
            >
              <label for="tipoRoupa1">
                <img
                  src="../../assets/img/clothes/pessoa01.png"
                  width="90"
                  :key="1"
                />
              </label>
              <label for="tipoRoupa2">
                <img
                  src="../../assets/img/clothes/pessoa02.png"
                  width="90"
                  :key="2"
                />
              </label>
              <label for="tipoRoupa3">
                <img
                  src="../../assets/img/clothes/pessoa03.png"
                  width="90"
                  :key="3"
                />
              </label>
            </template>
            <template v-else>
              <label for="tipoRoupa1">
                <img
                  src="../../assets/img/clothes/pessoa04.png"
                  width="90"
                  :key="1"
                />
              </label>
              <label for="tipoRoupa2">
                <img
                  src="../../assets/img/clothes/pessoa05.png"
                  width="90"
                  :key="2"
                />
              </label>
              <label for="tipoRoupa3">
                <img
                  src="../../assets/img/clothes/pessoa06.png"
                  width="90"
                  :key="3"
                />
              </label>
            </template>
          </div>

          <button v-on:click="testPrint" v-if="false">Imprimir</button>
        </div>
      </div>
    </div>

    <Printer ref="printer"></Printer>
  </div>
</template>

<script>
import { VESTIMENTA } from "../../common/consts";
import visitanteService from "../../common/services/visitante";
import _ from "lodash";
import Printer from "../Common/Printer";

const visitanteEmpty = {
  sexo: undefined,
  peso: undefined,
  altura: undefined,
  idade: undefined,
  vestimenta: undefined,
  corSuperior: undefined,
  corInferior: undefined,
};

export default {
  name: "DashboardHome",

  components: {
    Printer,
  },

  data() {
    return {
      VESTIMENTA: VESTIMENTA,
      visitante: _.clone(visitanteEmpty),
      success: undefined,
      error: undefined,
      printerRef: undefined,
    };
  },

  methods: {
    cleanAlerts() {
      this.error = undefined;
      this.success = undefined;
    },

    testPrint() {
      this.$refs.printer.doCodePrint(98785);
    },

    registerVisitor() {
      this.cleanAlerts();
      visitanteService
        .create(this.visitante)
        .then((response) => {
          this.success = response.visitante.etiqueta;
          this.visitante = _.clone(visitanteEmpty);
        })
        .catch((error) => {
          this.error = true;
          window.console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#pageTitle {
  margin-left: 5px;
  background-size: 100%;
  height: 210px;
  padding-top: 50px;
  color: #2b300d;
  font-family: sanserifing, serif;
  font-size: 50px;
}

#pageContent {
  margin-left: 19px;
  background-size: 100%;
  width: 642px;
  color: #2f2f09;
  font-family: sanserifing, serif;
  font-size: 25px;
}

.custom-control-label::before {
  background-color: #c97d51;
  top: 0.5rem;
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c97d51;
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
  /*TODO change button*/
  background-color: red;
}

.custom-control-label::after {
  top: 0.5rem;
}

#pageContent .row {
  margin-left: 20px;
  margin-right: 20px;
}

#Sexo > div {
  padding-left: 10px;
  width: 100%;
  font-weight: 100;
  margin-bottom: 3px;
}

#TopSexo {
  font-size: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 30px;
}

#BottomSexo {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 30px;
}

#Dados {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

#LeftDados {
  padding-left: 2px !important;
  padding-right: 2px !important;
}

#CorDeRoupa > div {
  width: 100%;
  font-weight: 100;
  margin-bottom: 3px;
}

#TopCorDeRoupa {
  font-size: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 30px;
}

#tipoDeRoupa {
  border-top-left-radius: 15px;
  border-top-right-radius: 30px;
  height: 200px;
}

#tipoDeRoupaTitle {
  padding-left: 15px;
  padding-right: 10px;
  font-size: 30px;
}

#tipoDeRoupaRadios > div {
  margin-left: 50px;
}
</style>
