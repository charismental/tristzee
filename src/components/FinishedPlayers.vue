<template>
    <div class="finished-players">
        <h1 v-if="!players.length">Great Game!!</h1>
        <h2>Final Score:</h2>
        <h3 v-for="player in finishedPlayers" :key="player.id">{{ player.name }} - {{ player.grandTotal }} points</h3>
        <button class="btn" @click="newGame">New Game</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState([
            'finishedPlayers',
            'players'
        ])
    },
    methods: {
        ...mapActions([
            'newGame'
        ])
    }
}
</script>

<style>

</style>
