var inputBox = document.querySelector("#input-box");
var listContainer = document.querySelector("#list-container");
var img = document.getElementById("img");

const apiKey = "9b5dd85b";

var watchlist = [];

async function fetchMovieData(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updatePreview(movieData) {
  const infoT = document.querySelector(".infoT");
  const infoD = document.querySelector(".infoD");
  const infoA = document.querySelector(".infoA");
  const infoR = document.querySelector(".infoR");

  img.src = movieData.Poster || "";
  infoT.innerText = `TITLE : ${movieData.Title || ""}`;
  infoD.innerText = `DATE RELEASE : ${movieData.Released || ""}`;
  infoA.innerText = `ACTORS : ${movieData.Actors || ""}`;
  infoR.innerText = `RATING : ${movieData.imdbRating || ""}`;
}

async function addMovieToList() {
  const title = inputBox.value.trim();
  if (!title) {
    alert("You must write something!");
    return;
  }

  if (watchlist.includes(title)) {
    alert("This movie is already in your watchlist!");
    inputBox.value = "";
    return;
  }

  try {
    const movieData = await fetchMovieData(title);
    if (movieData) {
      watchlist.push(title);

      const li = document.createElement("li");
      li.textContent = title.toUpperCase();
      listContainer.appendChild(li);

      const button = document.createElement("button");
      button.innerText = "\u00d7";
      li.appendChild(button);

      button.addEventListener("click", function () {
        watchlist.splice(watchlist.indexOf(title), 1);
        li.remove();
      });

      li.addEventListener("click", async function () {
        const movieData = await fetchMovieData(title);
        if (movieData) {
          updatePreview(movieData);
        } else {
          alert("Movie not found");
        }
      });

      updatePreview(movieData);
    } else {
      alert("Movie not found");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching movie data");
  }

  inputBox.value = "";
}
