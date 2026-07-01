// ================= WEATHER APP =================
git
async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML =
            "<p class='error'>Please enter a city name</p>";
        return;
    }

    try {

        // Step 1: Convert city name to coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country } =
            geoData.results[0];

        // Step 2: Fetch weather using coordinates
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h3>${name}, ${country}</h3>

                <h2>
                    ${weatherData.current.temperature_2m}
                    ${weatherData.current_units.temperature_2m}
                </h2>

                <p>
                    <strong>Humidity:</strong>
                    ${weatherData.current.relative_humidity_2m}%
                </p>

                <p>
                    <strong>Weather Code:</strong>
                    ${weatherData.current.weather_code}
                </p>
            </div>
        `;

    } catch (error) {

        weatherResult.innerHTML =
            `<p class="error">${error.message}</p>`;

    }
}


// ================= MOVIE APP =================

const movieApiKey = "1c456b82";

async function searchMovie(){

    const movie =
        document.getElementById("movieInput").value;

    const movieResult =
        document.getElementById("movieResult");

    if(movie === ""){
        movieResult.innerHTML =
        "<p class='error'>Please enter a movie title</p>";
        return;
    }

    try{

        const response = await fetch(
        `https://www.omdbapi.com/?apikey=${movieApiKey}&t=${movie}`
        );

        const data = await response.json();

        if(data.Response === "False"){
            throw new Error(data.Error);
        }

        movieResult.innerHTML = `
            <div class="movie-card">

                <img src="${data.Poster}"
                alt="${data.Title}">

                <h3>${data.Title}</h3>

                <p><strong>Year:</strong>
                ${data.Year}</p>

                <p><strong>Genre:</strong>
                ${data.Genre}</p>

                <p><strong>IMDb:</strong>
                ${data.imdbRating}</p>

                <p>${data.Plot}</p>

            </div>
        `;

    }

    catch(error){

        movieResult.innerHTML =
        `<p class="error">${error.message}</p>`;

    }
}