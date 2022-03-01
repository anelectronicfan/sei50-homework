<template>
  <div>
    <h2>Flight ____________</h2>
  </div>
</template>

<script>
export default {
  name: 'FlightDetails',
  props: ['id'],
  data() {
    return {

    }
  },
  async mounted() {
    console.log('FlightDetails mounted, ID =', this.id);
  }
}
</script>

<style>

</style>