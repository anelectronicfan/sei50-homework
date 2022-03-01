<template>
  <div>
    <h2>Search Results from {{origin}} to {{destination}}</h2>
    <div v-if='loading'>
      <p>Loading flight results...</p>
    </div>

    <div v-else>

      <div class="results" v-for="flight in flights">
        <div @click="goToFlight(flight.id)">
          <!-- fix the hideous format of these dates!!! npm luxon -->
          {{flight.departure_date}}:   
          {{flight.flight_number}} 
          -
          {{flight.airplane.name}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';

export default {
  name: 'FlightSearchResults',
  props: ['origin', 'destination'],
  data(){
    return {
      flights: [],
      loading: true,
      error: null
    }
  },
  async mounted(){
    console.log ('Component mounted', this.origin, this.destination);
    try {
      const url = `${API_BASE_URL}/flights/search/${this.origin}/${this.destination}`
      const res = await axios.get(url)
      this.flights = res.data;
      this.loading = false;
      console.log('response', res.data)
    } catch (err) {
      console.log('Error loading flight search results', err);
      this.error = err;
    }
  },
  methods: {
    goToFlight(id){
      console.log('goToFlight()', id);
      this.$router.push({
        name: 'FlightDetails',
        params: 'FlightDetails',
        params: {id: id}
      })
    }
  },
}
</script>

<style scoped>
  .results div {
    cursor: pointer;
  }
  .results div:hover {
    
    font-weight: bold;
  }
</style>