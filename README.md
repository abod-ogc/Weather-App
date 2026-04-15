# Weather App

A simple, clean, and responsive web application that provides current weather conditions and a 7-day forecast for any city in the world. This project is built with vanilla HTML, CSS, and JavaScript, and it utilizes the free Open-Meteo public APIs for weather and geocoding data.

## Features

-   **City Search**: Find weather information for any city by name.
-   **Current Weather**: Displays up-to-date weather details including:
    -   Temperature (°C)
    -   Humidity (%)
    -   Wind Speed (km/h)
    -   Latitude and Longitude
    -   Local Time
-   **7-Day Forecast**: Provides a weekly forecast table with:
    -   Minimum and Maximum daily temperatures
    -   Total daily precipitation (mm)
-   **Default Location**: A quick-access button to load the weather for a default city (Sanaa).
-   **Responsive Design**: The layout adapts to different screen sizes, from mobile devices to desktops.
-   **Loading State**: A spinner indicates when data is being fetched from the API.

## APIs Used

This application relies on the following free and open-source APIs from [Open-Meteo](https://open-meteo.com/):

-   **Geocoding API**: To convert city names into geographical coordinates (latitude and longitude).
-   **Weather Forecast API**: To fetch current and daily forecast data based on coordinates.

## Getting Started

To run this project locally, follow these simple steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abod-ogc/Weather-App.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Weather-App
    ```
3.  **Open the application:**
    Simply open the `index.html` file in your favorite web browser.

## How to Use

1.  Enter a city name into the search bar (e.g., "London", "Tokyo", "New York").
2.  Click the **Search** button or press the `Enter` key.
3.  The current weather and 7-day forecast for the specified city will be displayed.
4.  Alternatively, click the **Use Sanaa** button to quickly view the weather for the default location.
