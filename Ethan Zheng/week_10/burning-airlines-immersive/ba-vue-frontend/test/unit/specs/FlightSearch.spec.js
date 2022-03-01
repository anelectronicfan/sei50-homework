import Vue from 'vue';
import {mount} from '@vue/test-utils';
import sinon from 'sinon';

/*

karma - "test runner", sets up test environment, loads onfig,
        loads plugins and assertion library, finds all the .spec.js files and runs the 'describe' and 'it' blocks in the right way for us
        Alternatives:
          - Jasmine (requires seperate assertion library like chai or mocha)
          - Jest (FB, includes assertions)

chai -  "assertion library", it gives test assertion syntax
        like 'expect(a).to.equal(b)'
        Alternatives: mocha

vest-test-utils - adapter for mounting components within a headless test browser environment, and also for querying for elements within the 'wrapped' DOM, i.e. 'wrapper.findAll("li")'
        - it also lets us "interact" with out mounted component by triggering clicks and other user events, and wait for response

sinon - "mock library", i.e. it lets us easily create mocks/stubs so we can provide fake versions of functions like $router.push to our component, and neatly make assertions about whether and how those functions were called - a.k.a "mocking"
*/

import FlightSearch from '@/components/FlightSearch'

const $router = {
  push: sinon.spy() // a spy is a mock that keeps track of whether/how it was called.
}

describe('<FlightSearch>', () => {
  it('should render a search form', async () => {

    // <FlightSearch> is normally managed by the Vue router -
    // it is mounted onto the DOM when a user goes to the '/search' route.
    // But in our test environment, we are just mounting the component directly, in isolation. So features provided by the router, like 'this.$router', and therefore 'this.$router.push()', are not defined! This means that a) the component will throw an error when we try to click on the search button, which triggers that router push.
    // So, since we need to know as the "final output" of this component whether it actually tries to push the correct search results route onto the router... we need to fake the router and in particular, its push() method, so we can test whether the component is actually doing its job!
    const wrapper = mount(
      FlightSearch,
      // options object for mount:
      {
        mocks: {
          // define the faked properties/methods that should exist on the component instance, i.e. "this"
          // $router: {
          //   push: function(args) {
          //     console.log('FAKE $router.push() called', args);
          //     expect(args.name).to.equal('SearchResults')
          //   } // push()
          // } //router

          $router: $router // use the sinon spy defined above
        } //mocks
      } // options 2nd arg to mount()
      );


    // console.log('wrapper', wrapper.html());
    expect(wrapper.text()).to.contain('Search Flight')

    const options = wrapper.findAll('option');
    expect(options.at(1).text()).to.equal('SYD');

    const button = wrapper.find('button');
    expect(button.element.tagName).to.equal('BUTTON');

    // simulate user click on the search button
    await button.trigger('click');

    // The final thing we need to check is that the component did run the this.$router.push() function (which we have now mocked), and that it passed it the correct routing arguments, including the origin and destination params
    //expect($router.push).to.have.been.called;
    expect($router.push).to.have.been.calledWith(sinon.match({
      name: 'SearchResults',
      params: {
        origin: 'SYD',
        destination: 'MEL'
      }
    }))

  })

})
