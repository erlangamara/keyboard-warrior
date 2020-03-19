<template>
<div>
    <div class="card text-center">
        <div class="card-header">
            Lets Start The Game!
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ data.words }}</h5>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'WordCard',
    data() {
        return{
            words = null,
        }
    },
    methods: {
        getWords(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/randomwords',     
            })
            .then((data) => {
                this.words = data;
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}
</script>