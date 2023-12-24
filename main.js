const img = document.getElementById("giphy-image");
const refreshButton = document.getElementById("refresh-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Initial fetch when the page loads
fetchGiphyImage();

// Function to fetch and set a new Giphy image
async function fetchGiphyImage() {
  try {
    const searchTerm = searchInput.value || "cats";
    const response = await fetchGiphyData(searchTerm);
    const responseData = await response.json();

    if (
      responseData.data &&
      responseData.data.images &&
      responseData.data.images.original
    ) {
      img.src = responseData.data.images.original.url;
    } else {
      img.src = "default-image.jpg"; // Provide the path to a default image
    }
  } catch (error) {
    console.error("Error fetching Giphy image:", error);
    img.src = "error-image.jpg"; // Provide the path to an error image
  }
}

// Function to fetch Giphy data
function fetchGiphyData(searchTerm) {
  return fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=g97TWREKrgVP2huYIiTLBEOfwDqhEQ3F&s=${searchTerm}`,
    { mode: "cors" }
  );
}

// Event listener for the search input
searchButton.addEventListener("click", fetchGiphyImage);

// Event listener for the refresh button
refreshButton.addEventListener("click", fetchGiphyImage);
