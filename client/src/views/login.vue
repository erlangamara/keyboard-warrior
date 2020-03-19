<template>
  <div class="d-flex justify-content-center align-items-center forms">
    <div class="box">
      <h2>Login</h2>
      <b-form @submit="onSubmit">
        <b-form-group label="Username">
          <b-form-input v-model="name" type="text" required placeholder="Enter your name"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
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
                name
            }
        })
        .then(({ data }) => {
            localStorage.token = data.token
            // this.$router.push({ name: 'room' })
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
    height: 100vh;
}

.box {
    padding: 1em;
    width: 25%;
    box-shadow: 0 0 0.3em 0.2em rgb(165, 165, 165);
    border-radius: 0.7em;
}
</style>