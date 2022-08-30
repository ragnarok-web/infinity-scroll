const imageContainer =document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unspalsh aopi
let count = 5;
const apikey = '7YGaM-mU7KNw8TYDNmWdm88kADhl-QIxHgYJC4biW6c';
let apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check if all iamegs were loaded
function imageLoaded(){
    
    imagesLoaded++;
    if (imagesLoaded=== totalImages){
        ready = true;
        loader.hidden = true;
        count=30;
        apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
    }
}

//  Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
   for (const key in attributes) {
    element.setAttribute(key , attributes[key]);
   }

}



// create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
   
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');  //create a blanck <a> element
        setAttributes (item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
       setAttributes (img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
       });
       // Evenet Listener, check with each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer  element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//  get photos from unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}
// heck to see if scrolling near bottom of page , load more photos
// inner height is the totla height of the window('what u can see'), scrollY is the distance from top of page user has scrolled , body.offsetHeight is the height of everything in the body including what is not within view
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.    offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// on load 
getPhotos();