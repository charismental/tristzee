<template>
    <div class="new-player">
        <input type="text" v-model="name" @keyup.enter="createPlayerReset(name)" />
        <button class="create-player-button" @click="createPlayerReset(name)">Create Player</button>
        <button @click="startGame" v-show="players.length">Start Game</button>
        <div class="players">
            <ul class="player-list">
                <li v-for="player in players" :key="player.id">{{ player.name }}</li>
            </ul>
        </div>
    </div>
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
            'startGame'
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
