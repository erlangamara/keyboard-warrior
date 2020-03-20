import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `http://localhost:3000/`,
    token: localStorage.token,
    playerId: null,
    playerName: null,
    playerHp: null,
    enemyId: null,
    enemyName: null,
    enemyHp: null,
    totalPlayer: [],
    word: null,
  },
  mutations: {
    dataEnemy(state, data){
      state.enemyId = data[0].id
      state.enemyName = data[0].name
      state.enemyHp = data[0].hp
    },

    dataPlayer(state, data){
      state.playerId = data.id
      state.playerName = data.name
      state.playerHp = data.hp
    },

    totalPlayer(state, data){
      state.totalPlayer.push(data)
    },

    generateWord(state, data){
      state.word = data
    },

    editHealth(state, data){
      console.log(data)
      state.playerHp = data
      console.log(state.playerHp)
    },

    emptyPlayer(state){
      state.totalPlayer=[]
    }


  },
  actions: {
    getDataEnemy(context){
      axios({
          method: 'get',
          url: `http://localhost:3000/userEnemy`,
          headers: {token: localStorage.getItem('token')}
      })
          .then(res=>{
            context.commit('dataEnemy', res.data)
            context.commit('totalPlayer', res.data[0])
          })
          .catch(err=>{
            console.log(err)
          })
  },

    getDataPlayer(context){
        axios({
            method: 'get',
            url: `http://localhost:3000/user`,
            headers: {token: localStorage.getItem('token')}
        })
            .then(res=>{
              context.commit('dataPlayer', res.data)
              context.commit('totalPlayer', res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },

    getWord(context){
      axios({
          method: 'GET',
          url: 'http://localhost:3000/randomwords',     
      })
      .then((res) => {
          let randWord = res.data.words[0];
          context.commit('generateWord', randWord)
      })
      .catch((error) => {
          console.log(error);
      })
    },

    editHealthPlayer(context, data){
      context.commit('editHealth', data);
    },

    logout(context){
      context.commit('emptyPlayer')
    }



  },
  modules: {
  }
})
