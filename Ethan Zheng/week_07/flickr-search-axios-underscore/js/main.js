const FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';
const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';

// Params:
// method=flickr.photos.search
// api_key  - REQUIRED
// format=json ??? for specifying format
// text - specify the search query
// nojsoncallback=1

// https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&text=ocean+coral&api_key=2f5ac274ecfac5a455f38745704ad084

let searchFormNode, searchInputNode, resultsNode, detailsNode;
const fetchSearchResults = async (queryText) => {

    
    try {
        const res = await axios.get( FLICKR_BASE_URL, {
            params: {
          // axios will combine these key-value pairs into the querystring for us
            method: 'flickr.photos.search',
            api_key: FLICKR_API_KEY,
            format: 'json',
            nojsoncallback: 1,
            //page: 1, or other variable
            text: queryText // should come from user input
            }
        })
    
        // BECAUSE we used await axios.get, we don't need callbacks, and 
        // we can be sure the result will be available by the next line of 
        // code after the.get(), because JS *waits* for the promise to resolve
        console.log('data', res.data.photos.photo);
        renderSearchResults(res.data.photos);
    
            // .then( function( res ){
            //   console.log( res.data.photos.photo );
            // })
            // .catch( function( err ){
            //   console.log('AJAX Search error', err);
            // });
    
    } 
    catch ( err ) {
        console.log('Error:', err)
    
    }

}

const renderSearchResults = (results) => {
    console.log('renderSearchResults()', results);

    const ulNode = document.createElement('ul');

    results.photo.forEach (photo => {
        const imageURL = generateImageURL(photo, 'q');
        // console.log(imageURL);

        const liNode = document.createElement('li');
        liNode.innerHTML = `<img src = "${imageURL}" alt="${photo.title}">`


        liNode.addEventListener('click', ev => {
            // By adding a unique click handler function to each <li>
            // within the loop, the click handler function will STILL
            // have access to the surrounding variables in its scope
            // EVEN THOUGH THE FUNCTION RUNS MUCH LATER, AFTER THE LOOP
            // IS FINISHED AND THE LOOP'S LOCAL VARIABLES ARE GONE
            // This is because of a language feature called "closures":
            // function definitions "close over" the values of the variables
            // that exist in their surrounding scope when they are defined.
            // PROS: we don't need to store an ID in a DOM tag attribute
            // and retrive it later
            // CONS: we are creating a unique click handler function to 
            // attach to each of our 100 resutls, i.e. 100 functions
            fetchImageDetails(photo.id);
        }); // add event listerner
        // single line version here
        // liNode.addEventListener('click', () => fetchImageDetails(photo.id));

        ulNode.appendChild(liNode);

    })
    resultsNode.innerHTML = `<strong>Found ${ results.total } results (in ${results.pages} pages): </strong>`; // clears landing page
    resultsNode.appendChild(ulNode);

    // Previously: AFTER adding to the DOM, we do a new query to retrive
    // all the search result li tags and add a single click handler to them -
    // but in order for the click handler to know the ID of the image that 
    // was clicked

} // renderSearchResults



const generateImageURL = (photo, size = 'q') => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`
}

const fetchImageDetails = async (id) => {
    console.log('id:', id);
    detailsNode.innerHTML = '<em>Loading...</em>'
    detailsNode.style.display = 'block';
    resultsNode.style.display = 'none';
    try {
        const res = await axios.get( FLICKR_BASE_URL, {
            params: {
                method: 'flickr.photos.getInfo',
                api_key: FLICKR_API_KEY,
                photo_id: id,
                format: 'json',
                nojsoncallback: 1
            }
        });
        console.log('Details results:', res.data);
        renderImageDetails(res.data.photo);

    } catch(err) {
        console.log('Details AJAX request error:', error)
    }
} // fetchImageDetails

const renderImageDetails = (photo) => {
    console.log('in renderImageDetails():', photo);



    detailsNode.innerHTML = `
        <a href='#' id="backLink">Back to results</a>
        <h2>${photo.title._content}</h2>
        <img src="${generateImageURL(photo, 'b')}" alt="${photo.title._content}">
        <p>
            ${photo.description._content}
        </p>
    `;

    document.querySelector('#backLink').addEventListener('click', () => {
        console.log('back clicked!')
        detailsNode.style.display = 'none';
        resultsNode.style.display = 'block';
    })


};

document.addEventListener('DOMContentLoaded', async function(){
    
    searchFormNode = document.querySelector('#searchForm');
    searchInputNode = document.querySelector('#searchText');
    resultsNode = document.querySelector('#results');
    detailsNode = document.querySelector('#details');

    searchInputNode.focus();

    searchFormNode.addEventListener('submit', ev => {
        ev.preventDefault();
        // const searchText = searchInputNode.value;
        // console.log('Form submitted!', searchText)
        resultsNode.innerHTML = '<em>Loading results...</em>';


        detailsNode.innerHTML = '<em>Loading...</em>'
        detailsNode.style.display = 'none';
        resultsNode.style.display = 'block';


        fetchSearchResults(searchInputNode.value);
    });
}); // document ready handler

window.addEventListener('scroll', ev => {
    console.log('scrolling!', window.scrollY);

    const bottomOfWindow = window.scrollY + window.innerHeight;
    
    if (bottomOfWindow >= document.body.scrollHeight * 0.9) {
        console.log('We have hit bottom (no jQuery)');
        // start the next-page AJAX request a bit before the bottom...
        // but YOU HAD BETTER THROTTLE THE REQUEST! Otherwise you will
        // flood the API with requests and get our API key blocked!
    }
});