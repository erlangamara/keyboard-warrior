<template>
    <div>
        <h1>Masuk</h1>
        <WordCard></WordCard>
        <div class="container mt-5">
            <div class="d-flex justify-content-between">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{playerName}}</h5>
                        <p class="card-text">{{playerHp}}</p>
                    </div>
                </div>

                 <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{enemyName}}</h5>
                        <p class="card-text">
                            {{enemyHp}}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-5">
            <div class="d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5>Type here</h5>
                        <form @click.prevent="submitAnswer">
                            <div class="form-group">
                                <input type="text" v-model="answer" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                             <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import WordCard from '../components/WordCard.vue'
import axios from 'axios'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

export default {
    components: {
        WordCard
    },
    watch : {
        playerHp() {
            this.checkPlayerHp()
        }
    },
    mounted(){
        
    },
    data(){
        return{
            answer: null
        }
    },
    created(){
        this.$store.dispatch('getDataEnemy');
        this.$store.dispatch('getDataPlayer');
        
        socket.on('attacked', (newMessage)=>{
            console.log(newMessage)
            this.$store.dispatch('editHealthPlayer', newMessage)
            this.$store.dispatch('getDataEnemy');
            this.$store.dispatch('getDataPlayer');
        })
    },
    computed: mapState([
        'url',
        'playerId',
        'playerName',
        'playerHp',
        'enemyId',
        'enemyName',
        'enemyHp',
        'word'
    ]),
    methods: {
        checkPlayerHp(){
            if(this.playerHp<=0){
                Swal.fire({
                    title: `Game Over ${this.enemyName} Win`,
                    text: `You have been slained by ${this.enemyName} !`,
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Back To Lobby!'
                    }).
                    then((result) => {
                    if (result.value) {
                    this.$router.push('/lobby')
                    }
                })
            }
        },
        submitAnswer(){
           if(this.word === this.answer){
               axios({
                   method: 'post',
                   url: `${this.url}user/attack/${this.playerId}`,
                   headers: {token: localStorage.getItem('token')},
                   data: {
                       id: this.enemyId,
                       demage: 20
                   }
               })
                .then(res=>{
                    this.answer=''
                    if(res.data.hp <= 0){
                        this.$store.dispatch('getDataEnemy');
                        this.$store.dispatch('getDataPlayer');
                        Swal.fire({
                            title: 'Game Over You Win',
                            text: `You have slained ${this.enemyName} !`,
                            icon: 'info',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Back To Lobby!'
                            }).
                            then((result) => {
                            if (result.value) {
                            this.$router.push('/lobby')
                            }
                            })
                        console.log('game over')
                    }else{
                        this.$store.dispatch('getDataEnemy');
                        this.$store.dispatch('getDataPlayer');
                        this.$store.dispatch('getWord');

                        socket.emit('attack', this.enemyHp - 20)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
           }
        }
    }
}
</script>