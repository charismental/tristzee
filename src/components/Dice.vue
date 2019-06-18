<template>
    <div class="dice">
        <div v-for="die in dice" :key="die.id">
            <Die :value="die.value" />
        </div>
    </div>
</template>

<script>
import Die from './Die'
import { mapState } from 'vuex'

export default {
components: {
    Die
},
computed: {
    ...mapState([
        'dice'
    ])
}
}
</script>

<style scoped>
.dice {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
