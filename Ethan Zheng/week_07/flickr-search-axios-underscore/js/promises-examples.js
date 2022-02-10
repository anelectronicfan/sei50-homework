console.log('Loaded AJAX Axios')

// WHAT IS A PROMISE?

// A promise is a way of dealing with asynchronous behaviour in JS, i.e. a consistent way of dealing with data that takes a while to become available;
// A promise is a promise ABOUT data arriving sooner or later... or not arriving such as throwing an error


// A promise is either in a state of: 
// PENDING - waiting for the data to arrive
// FULFILLED:
//    - RESOLVED - we have the data
//    - REJECTED - there was an error getting the data


// Promises are '.then'-able
// .get is a promise
axios.get('http://www.numbersapi.com/42?json')
  .then(function(res){
    // We provide a callback function as the argument
    // to .then() which is run if the promise resolves
    // i.e. we have the data, success, all is well
    console.log('We got the data!', res.data.text);
  }) // end of .then()
  .catch( function( err ){
    console.log('UH OH! There was a problem:');
    console.log( err.response.status );
    console.dir(err);
  })
  // .then( function(){
  //   // THIS IS OPTIONAL if you need a cleanup stage
  //   // This final .then will ALWAYS run whether
  //   // the promise resolved or rejected
  //   console.log('We are finished.')
  // }) // no more chaining!

// When dealing with Promises, INSTEAD of
// a then-catch chain to deal with resolved/rejected
// promises, we can use a hot new syntax called:
// async/await

const getApiData = async function (){

  try{
    const res = await axios.get('http://www.numbersapi.com/qswdefrgtr')
    console.log( res.data ); // if we get here, the promise RESOLVED
    // BECAUSE of the 'await' in front of the method which returns a promise,
    // JS acts the same way Ruby HTTParty.get() does - the code will BLOCK
    // or wait UNTIL the response comes in, and it will give you the data
    // as the return value INSTEAD of a promise object -
    // i.e instead of ".then(function(res){" where 'res' is the response object,
    // we now get that directly back from "await axios.get()" and save it into 
    // const variable - so we can GUARANTEE it's there by the time the next line runs:
    // BUT you need to declare the containing function as 'async' - and that means
    // the containing function NOW RETURNS A PROMISE.
  } catch(e) {
    console.log('There was an error!', e);
  } 
  // finally {
  //   console.log('Always runs');
  // }
  console.log ('When does this run?'); // This DOES actually run last!


}; // getApiData()

getApiData();