<template>
  <div class="d-flex justify-content-center align-items-center forms">
    <div class="box">
      <h2 class="text-white">Login</h2>
      <hr class="breaker">
      <b-form @submit="onSubmit">
        <b-form-group label="Username" class="text-white">
          <b-form-input v-model="name" type="text" required placeholder="Enter your name"></b-form-input>
        </b-form-group>

        <b-button type="submit" class="submit">Login</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        axios({
            url: 'users/login',
            baseURL: this.$store.state.url,
            method: 'post',
            data: {
                name: this.name
            }
        })
        .then(({ data }) => {
            this.$store.state.token = localStorage.token = data.token
            // this.$router.push({ name: 'room' })
            // this is for testing while there is no "next" page
            this.$router.push('main')
        })
        .catch(err => {
            console.log(err.response)
        })
      }
    }
}
</script>

<style scoped>
.forms {
    padding-top: 3em;
    height: 100vh;
}

.box {
    padding: 1em;
    width: 25%;
    box-shadow: 0 0 0.3em 0.45em rgb(86, 79, 177);
    border-radius: 0.7em;
    background-color: rgb(86, 79, 177);
}

.submit {
  border: none;
  background-color: rgb(107, 99, 219);
  box-shadow: 0 0 0 0;
}
  .submit:focus, .submit:focus {
    background-color: rgba(107, 99, 219, 0.575) !important;
    box-shadow: 0 0 0.3em 0.1em rgba(115, 106, 233, 0.993) !important;
  }

.submit:hover {
  background-color: rgba(107, 99, 219, 0.575) !important;
}


.breaker {
  border-top-color: hsla(40, 100%, 97%, 0.35);
}
</style>