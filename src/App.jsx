import { useState } from "react";
import { useRef } from "react";

const Api_key = "a2dcc025862212da24356c08d2b9a943";

function App() {
  const inputRef = useRef();
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setApiData(null);
      if (data.cod == 404 || data.cod == 400) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      }
      setShowWeather(
        WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
      );
      setApiData(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            ref={inputRef}
            type="text"
            className="text-xl outline-none border-b flex-1 p-1 border-gray-200 uppercase font-semibold"
            placeholder="Enter your City Name"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="..."
              className="w-8"
            />
          </button>
        </div>
        <div className={` duration-300 delay-75 overflow-hidden ${ showWeather ? "h-[28rem]" : "h-[0]"}`}>
          {
            loading ? 
              <div className="grid place-items-center h-full">
                <img src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                     alt=""
                     className="w-14 mx-auto mb-2 animate-spin"
                     />
              </div> 
            : 
            (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {
                    apiData && 
                  <p className="text-xl font-semibold ">{apiData?.name + ',' + apiData?.sys.country}</p>
                  }
                  <img
                    src={showWeather[0]?.img}
                    alt="..."
                    className="w-52 mx-auto"
                  />
                  <h3 className="text-2x1 font-bold text-zinc-800">
                    {showWeather[0]?.type}
                  </h3>
                  {
                    apiData &&
                      <>
                        <div className="flex justify-center">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                            alt=""
                            className="h-9 mt-1"
                          />
                          <h3 className="text-4x1 font-extrabold">{apiData?.main?.temp}&#176;C</h3>
                        </div>
                      </>
                  }
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
