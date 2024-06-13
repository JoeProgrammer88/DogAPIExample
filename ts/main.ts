/*
    - Create a class to represent the JSON response for the random dog
    - Call the random dog endpoint of the API (use the proper URL)
    - Create an object (from the class above) to hold the returned data
        (important so we get good intellisense!)
    - Add the data to the HTML page with DOM manipulation
*/

/**
 * Holds the data for the random image from the dog.ceo API
 * Example response: 
 * {
        "message": "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
        "status": "success"
    }
 */
class RandomImageResponse{
    /** The URL that points to the random dog image */
    message: string; // Matching property name with JSON response property name
    status: string;
}

/**
 * Set up event handlers when page is loaded
 */
document.addEventListener("DOMContentLoaded", function(){
    // Wire up the Random Dog image button
    let randomDogButton = document.getElementById("random_image");
    randomDogButton.addEventListener("click", function(){
        getRandomDogImage().then(displayDogImage).catch(displayError);
    });
});

/**
 * Calls the dog.ceo random dog image endpoint
 * and displays the image on the HTML page
 */
async function getRandomDogImage(){
    // Get random dog image and wait for the response
    let response:Response = await fetch("https://dog.ceo/api/breeds/image/random");
    console.log(response);

    // If the service did not respond properly
    if (!response.ok){
        alert("Could not get a random image, please try again later.");
        // Throw exception to handle later on
        throw new Error("HTTP error! Status: " + response.status);
    }

    // If the service did respond properly, get the json response
    let data:RandomImageResponse = await response.json();
    console.log(data);
    return data;
}

function displayDogImage(dogData:RandomImageResponse){
    // Todo: Display image on page
    let displayDiv = document.getElementById("display");

    // Create an image element in memory
    let img = document.createElement("img");
    img.src = dogData.message;

    // Use css to resize the image
    img.style.width = "300px";
    
    // Add image as the first child of the display div but keep the previous images
    displayDiv.insertBefore(img, displayDiv.firstChild); // insert the new image before the current first image
}

function displayError(error:Error){
    // Todo: Display nice error message to user
}

/**
 * This function returns the breed name portion of the url
 * from the random dog image response. Example URL:
 * https://images.dog.ceo/breeds/weimaraner/n02092339_114.jpg
 * @param url The url pointing to a dog image
 * @returns The breed name portion of the url
 */
function getDogBreed(url: string): string {
    let parts = url.split("/");
    let breedIndex = parts.indexOf("breeds") + 1;
    return parts[breedIndex];
}