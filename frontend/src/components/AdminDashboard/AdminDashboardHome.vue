<template>
  <div class="AdminDashboardHome">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
    </div>
    <p>Olá {{getAuthFirstName}}!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminDashboardHome',

  computed: {
    ...mapGetters([
      'getAuthFirstName'
    ])
  }
}
</script>

<style scoped>
</style>
