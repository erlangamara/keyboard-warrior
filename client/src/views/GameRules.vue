<template>
<div>
    <div class="d-flex justify-content-center align-items-center rulesbox">
        <div class="boxrules">
            <div class="card text-black bg-dark mb-3 " style="max-width: 40rem;">
                <div class="card-header text-center text-white"><h3>How To Play The Game</h3></div>
                <div class="card-body text-left text-white">
                    <ol>
                        <li>Pick a Username</li>
                        <li>Enter a room and fight against an opponent, each game has a maximum of 2 players</li>
                        <li>Every round you will be given a word to type</li>
                        <li>First one to type the word correctly will deal damage to the opponent</li>
                        <li>Last one standing wins the game</li>
                        <li>Earn your glory now!</li>
                    </ol>
                </div>
                <div class="text-center">
                    <router-link to="/lobby"><button type="button" class="btn btn-warning">Back</button></router-link>
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

li {
    margin: 0.7em 0;
}
</style>
