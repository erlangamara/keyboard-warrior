<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <div class="navbar-brand">Keyboard Warrior</div>
    <!-- <router-link :to="{ name: 'main' }" class="navbar-brand">Keyboard Warrior</router-link> -->

    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="$store.state.token" @click="logout">
          <a class="nav-link" >Logout</a>
        </li>
        <li class="nav-item">
          <router-link to="/rules"><a class="nav-link" >How To Play</a></router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navbar',
  methods: {
      logout() {
          axios({
              url: 'users/logout',
              baseURL: this.$store.state.url,
              method: `post`,
              headers: {
                  token: localStorage.token
              },
              data: {
                  roomId: 0
              }
          })
            .then(() => {
                this.$store.state.token = localStorage.removeItem('token')
                this.$router.push({ name: 'login' })
            })
            .catch(err => {
                console.log(err.response)
            })
      }
  }
};
</script>

<style scoped>
.navbar {
    position: absolute;
    left: 0;
    right: 0;
    box-shadow: 0 0.1em 0.7em 0.15em;
    z-index: 1;
}

.nav-link:hover {
    cursor: pointer;
}
</style>