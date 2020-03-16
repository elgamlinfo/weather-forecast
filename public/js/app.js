var forecast,
    showLocation;

const weatherForm = document.querySelector("form");
forecast = document.querySelector(".forecast");
showLocation = document.querySelector(".location");

//Get Weather Data
const getData = (loc) => {
    fetch(`http://localhost:3000/weather?search=${loc}`).then((res) => {
        res.json().then(data => {
            if (data.error) {
            console.log(data.error);
            } else {
                forecast.textContent = data.forecast;
                showLocation.textContent = data.location;
            }
        });
    });
}

//event handler
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Location = document.querySelector("input").value;
    forecast.textContent = 'Loading...';
    showLocation.textContent = 'Loading...';
    getData(Location);
})

