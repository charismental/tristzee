<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Create Player</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form @submit.prevent="createPlayerReset(name)">
                <v-text-field
                    prepend-icon="person"
                    name="name"
                    label="Name"
                    v-model="name"
                    type="text"></v-text-field>
            </v-form>
            <v-list>
                <v-list-tile
                    v-for="player in players"
                    :key="player.id">
                    <v-list-tile-content>
                        <v-list-tile-title class="title" v-text="`Player ${player.id} - ${player.name}`"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-avatar>
                        <!-- <img :src="player.avatar"> -->
                    </v-list-tile-avatar>
                </v-list-tile>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="warning darken-3"
                @click="createPlayerReset(name)">Create</v-btn>
            <v-btn
                @click="gameRunningToggle(true)"
                color="blue-grey"
                dark
                v-show="players.length">Start Game</v-btn>
        </v-card-actions>
    </v-card>
<!-- <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content> -->
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
</style>
