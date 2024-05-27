# Technical documentation

This project is for a technical evaluation.
The purpose is to call a weather API with limited free requests per day.
The constraint are to request the weather depending the navigator location, and to store the informations in the cache to reuse them for a limited time, as long as the navigator location doesn't change.
The app call two components: **Weather**, which handle the logic about the call of the weather data and their storage in the cache, and **WeatherCard**, which will display the data passed by its parent.

## Weather.tsx

The Weather component will store the received data in its **states**, and will handle the two mains function to meet our requirements: **getLocation()** which purpose is to get the navigator current location, and **fetchWeather()**, which purpose is to get the weather informations.

### States

Here are the different states needed for our app to work:
  - **latitude**: store the navigator current latitude
  - **longitude**: store the navigator current longitude
  - **error**: store the error, if there is one, to display in the console.error
  - **weather**: store the weather informations to pass to the component **WeatherCard**

### getLocation()

The purpose of this function is to confirm that the user enabled the geolocation on their navigator.
If so, the latitude and longitude will be stored in the states using the method ```navigator.geolocation.getCurrentPosition((position)=>{...```,then  ```position.coords.latitude``` and ```position.coords.longitude``` to get the coordinates.
If it is not possible to use the geolocation, a switch case will receive the error to display the accurate error message depending the reason forbidding us to use it.

### isCacheExpired()

A simple function receiving the timestamp stored in the cache, and compared to the current timestamp, it tell us if it exceed the lifetime settled previously.

### fetchWeather()

An asynchronous function handling the weather data in differents ways.

It opens on the variable **cachedTimestamp**, **cachedCoords** and **cachedData** which receive the associated data from the cache using ```localStorage.getItem()```.
If those data exists in the cache, and we can get the coordinates from the navigator.geolocation, we compare the stored coordinates and timestamp with the current ones.
If the timestamp is not expired and the location is similar, we stock the cached weather data in the state.

If there is no data in the cache, or the data have expired, then we call the **openweathermap API** with the current coordinates, and store the returned data in the cache with ```localStorage.setItem()```

Then fetchWeather() is called each time the coordinates will change.

## WeatherCard.tsx

WeatherCard is a React component which only purpose is to display the informations passed through it.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
