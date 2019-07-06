<template>
    <v-layout class="finished-players">
        <v-flex xs12 class="text-xs-center">
            <h1 class="display-2" v-if="!players.length">Great Game!</h1>
            <h2 class="display-1">Final Score:</h2>
            <h3 class="title" v-for="(player, i) in sortedFinished" :key="player.id">
                <span v-if="sortedFinished.length > 1 && i === 0">Winner! - </span>{{ player.name }} - {{ player.grandTotal }} points</h3>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState([
            'finishedPlayers',
            'players'
        ]),
        sortedFinished () {
            return this.finishedPlayers.slice().sort((a, b) => (a.grandTotal < b.grandTotal) ? 1 : -1)
        }
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
