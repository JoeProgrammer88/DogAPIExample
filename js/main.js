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
    let displayDiv = document.getElementById("display");
    let breedName = getDogBreed(dogData.message);
    let card = `<div class="card" style="width: 18rem;">
        <img src="${dogData.message}" class="card-img-top" alt="${breedName}">
        <div class="card-body">
            <h5 class="card-title">${breedName}</h5>
            <p class="card-text">Example picture of a ${breedName}</p>
            <a href="${dogData.message}" target="_blank" class="btn btn-primary">See full image</a>
        </div>
    </div>`;
    let container = document.createElement("div");
    container.classList.add("col");
    container.innerHTML = card;
    displayDiv.insertBefore(container, displayDiv.firstChild);
}
function displayError(error) {
}
function getDogBreed(url) {
    let parts = url.split("/");
    let breedIndex = parts.indexOf("breeds") + 1;
    return parts[breedIndex];
}
