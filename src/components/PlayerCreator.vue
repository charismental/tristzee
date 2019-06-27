<template>
    <v-container class="new-player">
        <v-layout>
            <v-flex>
                <v-text-field
                    label="Name"
                    v-model="name"
                    @keyup.enter="createPlayerReset(name)"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-btn 
                    class="create-player-button"
                    color="info"
                    @click="createPlayerReset(name)">Create Player</v-btn>
                <v-btn
                    @click="gameRunningToggle(true)"
                    color="error"
                    v-show="players.length">Start Game</v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="players">
                <ul class="player-list">
                    <li v-for="player in players" :key="player.id">{{ player.name }}</li>
                </ul>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            name: ''
        }
    },
    computed: {
        ...mapState([
            'players'
        ])
    },
    methods : {
        ...mapMutations([
            'gameRunningToggle'
        ]),
        createPlayerReset (name) {
            this.$store.dispatch('createPlayer', name)
            this.name = ''
        }
    }
}
</script>

<style>
.create-player-button {
    margin-right: 15px;
}
.player-list {
    list-style: none;
}
</style>
