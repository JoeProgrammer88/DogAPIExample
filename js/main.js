class RandomImageResponse {
}
document.addEventListener("DOMContentLoaded", function () {
    let randomDogButton = document.getElementById("random_image");
    randomDogButton.addEventListener("click", function () {
        getRandomDogImage().then(displayDogImage).catch(displayError);
    });
});
async function getRandomDogImage() {
    let response = await fetch("https://dog.ceo/api/breeds/image/random");
    console.log(response);
    if (!response.ok) {
        alert("Could not get a random image, please try again later.");
        throw new Error("HTTP error! Status: " + response.status);
    }
    let data = await response.json();
    console.log(data);
    return data;
}
function displayDogImage(dogData) {
}
function displayError(error) {
}
