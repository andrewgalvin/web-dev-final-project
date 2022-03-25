import { useState, useEffect } from "react";
import "./Weather.css";

export default function Weather(props) {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=ed987e2716aae4a47523c9fb7aeb9abb`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== "400" && result.cod !== "429") {
          if (isMounted) {
            setLoading(false);
            setData(result);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [lat, long]); // eslint-disable-line

  const handleRefresh = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=ed987e2716aae4a47523c9fb7aeb9abb`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== "400" && result.cod !== "429") {
          setLoading(false);
          setData(result);
        }
      });
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;;
  };

  return (
    <>
      {loading === true ? (
        <div>
          <h1>Click here to refresh. (Doesn't work yet)</h1>
        </div>
      ) : (
        <div className="weather">
          {typeof data.main !== "undefined" ? (
            <div>
              <div className="weather-city">
                {data.name}
                <button className="weather-refresh" onClick={handleRefresh}>
                  Refresh
                </button>
              </div>
              <div className="weather-content">
                <p>{new Date(Date.now()).toDateString()}</p>
                <p>
                  {data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1)}
                </p>
              </div>
              <div className="weather-content">
                <p>Temprature: {convertToFahrenheit(data.main.temp).toFixed(2)} &#8457;</p>
                <p>Humidity: {data.main.humidity}%</p>
              </div>
              <div className="weather-content">
                <p>
                  Sunrise:{" "}
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                    "en-US"
                  )}
                </p>
                <p>
                  Sunset:{" "}
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US")}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ padding: "20px 20px" }}>
              <h4>Fetching local weather data...</h4>
            </div>
          )}
        </div>
      )}
    </>
  );
}
