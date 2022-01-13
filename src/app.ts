import axios from "axios";

const formElement = document.querySelector("form")! as HTMLFormElement;
const formInput = document.getElementById("address")! as HTMLInputElement;

const API_KEY = "";

type GoogleGeocodingResult = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
};

const formSubmitHandler = (event: Event) => {
    event.preventDefault();
    const input = formInput.value;

    axios
        .get<GoogleGeocodingResult>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                input
            )}&key=${API_KEY}
`
        )
        .then((response) => {
            if (response.data.status !== "OK") {
                throw new Error("Could not fetch results");
            }
            const coordinates = response.data.results[0].geometry.location;

            const map = new google.maps.Map(
                document.getElementById("map") as HTMLElement,
                {
                    center: coordinates,
                    zoom: 16,
                }
            );

            new google.maps.Marker({ position: coordinates, map: map });
        })
        .catch((err) => {
            alert(err.message);
        });
};

formElement.addEventListener("submit", formSubmitHandler);
