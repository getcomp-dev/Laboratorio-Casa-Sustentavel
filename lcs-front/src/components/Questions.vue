<template>
  <div class="container-app">
    <div class="container-quiz" v-for="(element,index) in questions.slice(a,b)" :key="index">
      <div class="header-quiz">
        <h3>{{element.question}}</h3>
      </div>
      <div >
        <div class="box-question" >
          <p> </p>
          <p> </p>
        </div>
        <div class="box-sugestion">
          <ul>
            <li v-for="(item,index) in element.sugestions" :key="index" :class="select ? true : ''" @click="selectResponse" >{{item.sugestion}}</li>
          </ul>
        </div>      
      </div>
      <div class="footer-quiz">
        <div class="box-button">
          <button>ANTERIOR</button>
          <button @click="nextQuestion">PRÓXIMA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Questions',
  data(){
    return{
      questions:[
        {
          question:"Qual a sua sensação com relação à temperatura?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
          ]
        },
        {
          question:"Perunta 2' ?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
            
          ]
          
        },
        {
          question:"pergunta 3?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
            
            
          ]
          
        },
        {
          question:"Pergunta 4?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
            
            
          ]
          
        },
        {
          question:"Pergunta 5?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
            
          ]
          
        },
        {
          question:"Pergunta 6?",
          sugestions:[
            {sugestion:'+3 Muito Quente'},
            {sugestion:'+2 Quente'},
            {sugestion:'+1 Levemente Quente',},
            {sugestion:'-1 Levemente Frio',},
            {sugestion:'-2 Frio',},
            {sugestion:'-3 Muito Frio',}
            
          ]
          
        }
      ],
      a:0,
      b:1,
      select: false,
    }
  },
  methods:{
    selectResponse(){
      this.select = true;
    },
    nextQuestion(){
      this.a++;
      this.b++;
      this.select = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    letter-spacing: 2px;
}

.container-app {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}

.container-quiz {
    display: flex;
    width: 40%;
    height: 85%;
    background-color: white;
    text-align: center;
    flex-flow: column;
    border: 1px solid #e7eae0;
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.header-quiz {
    display: flex;
    width: 100%;
    height: 20%;
    border-bottom: 1px solid #e7eae0;
    justify-content: center;
    align-items: center;
    background-color: #e7eae0;
    border-radius: 10px 10px 0px 0px;
}

.container-quiz .box {
    display: flex;
    width: 100%;
    height: 70%;
    flex-flow: column;
    margin: auto;
}

.box-question {
    margin-top: 20px;
}

.box-question p {
    margin-top: 20px;
}

.box-sugestion {
    margin: auto;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

ul {
    display: flex;
    width: 80%;
    margin: 0;
    padding: 0;
    flex-flow: column;
}

li {
    list-style: none;
    line-height: 2;
    border: 1px solid #cdd2d2;
    margin-bottom: 20px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s;
}

li:hover {
    background-color: #e7eae0;
}

li>div {
    float: right;
    margin-top: 7px;
    margin-right: 7px;
    color: white;
}

.footer-quiz {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: center;
    border-top: 1px solid #e7eae0;
    background-color: #e7eae0;
    border-radius: 0px 0px 10px 10px;
}

.box-button {
    display: flex;
    width: 100%;
}

.footer-quiz .box-button button {
    width: 150px;
    height: 35px;
    outline: none;
    border: 0;
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 15px;
    margin: auto;
    margin-bottom: 10px;
    letter-spacing: 2px;
    background-color: #a09f9ff5;
}

li.select {
    border: 1px solid rgb(74, 219, 74);
    background-color: rgb(74, 219, 74);
    color: white;
    font-weight: 600;
}

i {
    display: none;
    color: white;
}

.step-progress {
    display: flex;
    width: 100%;
    height: 5px;
    background-color: rgb(106, 128, 202);
    transition: 0.5s;
}

.next {
    background-color: rgb(106, 128, 202);
}


</style>
