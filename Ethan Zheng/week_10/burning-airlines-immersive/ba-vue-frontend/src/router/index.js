import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FlightSearch from '@/components/FlightSearch'
import FlightSearchResults from '@/components/FlightSearchResults'
import FlightDetails from '@/components/FlightDetails'

// if(process.env)
// console.log(process.env)

// DO NOT USE THE REAL ROUTER IF WE ARE IN TESTING MODE!
// because we need to be able to 'mock' or fake the $router for testing; karma sets this environment variable to 'testing'; when using the dev server and the browser it will be 'development'
if (process.env.NODE_ENV !== 'testing') {
  Vue.use(Router)
  
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'Search',
      component: FlightSearch
    },
    {
      path: '/search/:origin/:destination',
      name: 'SearchResults',
      component: FlightSearchResults,
      // give us the value of :origin from the path
      // as just 'this.origin', or in the template,
      // even simpler: 'origin'
      // ...instead of this.$route.params.origin
      props: true
    },
    {
      path: '/flights/:id',
      name: 'FlightDetails',
      component: FlightDetails,
      props: true
    }
  ]
})
