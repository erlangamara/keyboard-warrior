<template>
<div>
    <div class="row d-flex justify-content-center align-items-justify rulesbox">
        <div class="box">
            <div class="card text-black bg-dark mb-3 " style="max-width: 40rem;">
                <div class="card-header text-center text-white"><h3>How To Play The Game</h3></div>
                <div class="card-body text-left text-white">
                    <ol>
                        <li>On the login page, pickup the username </li>
                        <li>Pick the room game. this game has 2 maximum player</li>
                        <li>On the battle page, you will see a card with a word in it.</li>
                        <li>Type the word as fast as you can! don't let the enemy defeats you!</li>
                        <li>The winner is decided by who has the biggest HP in the end of the game!</li>
                        <li>Have fun and enjoy the game!</li>
                    </ol>
                </div>
                <div class="text-center">
                    <router-link to="/"><button type="button" class="btn btn-warning">Play Now!</button></router-link>
                    <br><br>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'GameRules',
}
</script>
<style scoped>
.rulesbox {
  padding-top: 3em;
  height: 100vh;
}
.box {
  padding: 1em;
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
