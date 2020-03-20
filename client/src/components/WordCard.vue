<template>
<div>
    <div class="card text-center">
        <div class="card-header">
            Lets Start The Game!
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ word }}</h5>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'WordCard',
    data() {
        return{
            words : null,
        }
    },
    created(){
        this.$store.dispatch('getWord');
    },
    computed: mapState([
        'word'
    ]),
    methods: {
    },
}
</script>