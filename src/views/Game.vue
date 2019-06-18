<template>
  <div class="game">
    <GameTable />
  </div>
</template>

<script>
import GameTable from '@/components/GameTable.vue'

export default {
  name: 'Game',
  components: {
    GameTable
  }
}
</script>
