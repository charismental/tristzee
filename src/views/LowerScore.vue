<template>
    <div id="lower-score">
        <Lower :player="player" />
    </div>
</template>

<script>
import Lower from '../components/ScoreCards/Lower'
export default {
    components: {
        Lower
    },
    props: [
        'player'
    ]
}
</script>

<style>

</style>
