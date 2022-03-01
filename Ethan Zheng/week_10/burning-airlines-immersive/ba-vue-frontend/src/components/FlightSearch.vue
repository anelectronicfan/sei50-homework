<template>
  <div>
    <h2>Search Flights</h2>

    <label>Origin:</label>
    <select v-model="origin">
      <option value="">Please select:</option>
      <option value="SYD">SYD</option>
      <option value="MEL">MEL</option>
      <option value="SIN">SIN</option>
      <option value="SFO">SFO</option>
    </select>

    &nbsp; &nbsp;

    <label>Destination:</label>
    <select v-model="destination">
      <option value="">Please select:</option>
      <option value="SYD">SYD</option>
      <option value="MEL">MEL</option>
      <option value="SIN">SIN</option>
      <option value="SFO">SFO</option>
    </select>

    &nbsp; &nbsp;

    <button @click="submitSearch">Search</button>
  </div>
  
</template>

<script>
export default {
  name: 'FlightSearch',
  data(){
    // This is our state object, as in React... but it's called data
    // However, we never refer to the 'data' key directly; in Vue you
    // access the state keys directly on the 'instance':
    // this.origin, this.destination instead of this.data.origin, etc
    return{
      origin: 'SYD',
      destination: 'MEL'
    };
  },
  methods: {
    submitSearch(){
      console.log('Submitted!', this.origin, this.destination);

      // this.props.history.push(`/search/${this.origin}/${this.destination}`);
      this.$router.push({
        
        name: 'SearchResults',
        params: {
          origin: this.origin,
          destination: this.destination
        }
      });
    }
  }
}
</script>

<style scoped>

</style>