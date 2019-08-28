<template>
  <div class="DashboardHome">
    <div id="pageTitle">
      <p class="text-center">Cadastro de usuário</p>
    </div>
    <div id="pageContent">
      <div class="row">
        <div class="col">
          <div id="Sexo" class="mb-3">
            <div id="TopSexo">Sexo</div>
            <div id="BottomSexo">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="sexo" class="custom-control-input" value="F" v-model="visitante.sexo">
                <label class="custom-control-label" for="customRadioInline1">Feminino</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="sexo" class="custom-control-input" value="M" v-model="visitante.sexo">
                <label class="custom-control-label" for="customRadioInline2">Masculino</label>
              </div>
            </div>
          </div>
          <div id="CorDeRoupa">
            <div id="TopCorDeRoupa">Cor da Roupa</div>
            <div id="CorDeRoupaSuperior">
              superior
              <div id="CorDeRoupaSuperiorRadios">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corSuperior1" name="corSuperior" class="custom-control-input">
                  <label class="custom-control-label" for="corSuperior1">claro</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corSuperior2" name="corSuperior" class="custom-control-input">
                  <label class="custom-control-label" for="corSuperior2">médio</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corSuperior3" name="corSuperior" class="custom-control-input">
                  <label class="custom-control-label" for="corSuperior3">escuro</label>
                </div>
              </div>
            </div>
            <div id="CorDeRoupaInferior">
              inferior
              <div id="CorDeRoupaInferiorRadios">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corInferior1" name="corInferior" class="custom-control-input">
                  <label class="custom-control-label" for="corInferior1">claro</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corInferior2" name="corInferior" class="custom-control-input">
                  <label class="custom-control-label" for="corInferior2">médio</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="corInferior3" name="corInferior" class="custom-control-input">
                  <label class="custom-control-label" for="corInferior3">escuro</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div id="tipoDeRoupa">
            <div id="tipoDeRoupaTitle">Escolha o Tipo de Roupa</div>
            <div id="tipoDeRoupaRadios">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="tipoRoupa1" name="tipoRoupa" class="custom-control-input">
                <label class="custom-control-label" for="tipoRoupa1"></label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="tipoRoupa2" name="tipoRoupa" class="custom-control-input">
                <label class="custom-control-label" for="tipoRoupa2"></label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="tipoRoupa3" name="tipoRoupa" class="custom-control-input">
                <label class="custom-control-label" for="tipoRoupa3"></label>
              </div>
            </div>
            <template v-if="visitante.sexo === undefined || visitante.sexo === 'F'">
              <label for="tipoRoupa1">
                <img src="../../assets/img/clothes/pessoa01.png" width="90" :key="1"/>
              </label>
              <label for="tipoRoupa2">
                <img src="../../assets/img/clothes/pessoa02.png" width="90" :key="2"/>
              </label>
              <label for="tipoRoupa3">
                <img src="../../assets/img/clothes/pessoa03.png" width="90" :key="3"/>
              </label>
            </template>
            <template v-else>
              <label for="tipoRoupa1">
                <img src="../../assets/img/clothes/pessoa04.png" width="90" :key="1"/>
              </label>
              <label for="tipoRoupa2">
                <img src="../../assets/img/clothes/pessoa05.png" width="90" :key="2"/>
              </label>
              <label for="tipoRoupa3">
                <img src="../../assets/img/clothes/pessoa06.png" width="90" :key="3"/>
              </label>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VESTIMENTA} from '../../common/consts'
import _ from 'lodash'

const visitanteEmpty = {
  sexo: undefined,
  peso: undefined,
  altura: undefined,
  idade: undefined,
  vestimenta: undefined,
  corSuperior: undefined,
  corInferior: undefined
}

export default {
  name: 'DashboardHome',

  data () {
    return {
      VESTIMENTA: VESTIMENTA,
      visitante: _.clone(visitanteEmpty),
      success: undefined,
      error: undefined
    }
  }
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
  color: #2F2F09;
  font-family: sanserifing, serif;
  font-size: 25px;
}


.custom-control-label::before {
  background-color: #C97D51;
  top: 0.5rem;
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #C97D51;
}

.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
  /*TODO change button*/
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
  background-color: #D1C3A7;
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

#CorDeRoupa > div {
  padding-left: 10px;
  background-color: #b5a681;
  width: 100%;
  font-weight: 100;
  margin-bottom: 3px;
}

#TopCorDeRoupa {
  font-size: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 30px
}

#CorDeRoupaSuperior {
  width: 100%;
  font-size: 25px;
}

#CorDeRoupaInferior {
  width: 100%;
  font-size: 25px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 15px;
}

#tipoDeRoupa {
  background-color: #DFD5BB;
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