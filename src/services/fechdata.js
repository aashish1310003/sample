import React, { useEffect, useState} from "react";
import axios from "axios";
import "../styles/Homepage.css";
import weatherImage from "../assets/images/weather_icons/02d.png";
const SolarCard = () => {
  const [todayValue, setTodayValue] = useState(0);
  const [count, setCount] = useState(0);
  const [todaySeries, setTodaySeries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toLocaleDateString();

        const data = {
          collection: "prediction",
          database: "solar",
          dataSource: "solarCluster0",
          projection: {
            _id: 1,
            period_end: 1,
            "Predicted Solar Power": 1,
          },
          sort: {
            period_end: -1,
          },
        };

        const response = await axios.post(
          "/api/app/data-tkeqt/endpoint/data/v1/action/find",
          JSON.stringify(data)
        );
        const apiData = response.data.documents.map((doc) => ({
          id: doc._id,
          power: doc["Predicted Solar Power"],
          value: new Date(doc.period_end).toLocaleDateString(),
          time: doc.period_end.slice(11, 16),
        }));
        const currentDateValues = apiData.filter((item) =>
          currentDate.includes(item.value)
        );
        currentDateValues.sort((a, b) => {
          const timeA = a.time;
          const timeB = b.time;
          return timeA.localeCompare(timeB);
        });
        console.log(currentDateValues);

        const filteredValues = currentDateValues;

        const newCount = filteredValues.length;
        const newSum = filteredValues.reduce(
          (accumulator, currentValue) => accumulator + currentValue.power,
          0
        );
        
        setTodaySeries(filteredValues);
        setTodayValue(newSum);
        setCount(newCount);

        console.log("Count of values greater than 0.1:", newCount);
        console.log("Sum of values greater than 0.1:", newSum);
        console.log("**********************************************");
        console.log(currentDateValues);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main" style={{backgroundColor:"black",marginTop:-20, paddingTop: 20}}>
  <div style={{}}> 
  <div className="solar-card">
    <img
      src={weatherImage}
      alt="Solar"
      style={{ width: "50px", height: "50px", marginBottom: "10px", marginRight: "10px" }}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p style={{ color: "white", margin: 0, fontSize: "1.2em" }}>TODAY's</p>
      <p style={{ color: "white", margin: 0, fontSize: "1.2em" }}>Power -</p>
      <p style={{ color: "white", margin: 0, fontSize: "1.2em" }}>Output</p>
    </div>
    <p style={{ color: "white", marginLeft:20,marginTop:15, fontSize: "1.8em" }}>{todayValue.toFixed(2)}</p>
  </div>
  </div>
  <div className="scrollable-container">
        <div className="horizontal-cards">
          {todaySeries.map((item) => (
            <div key={item.id} className="horizontal-card">
              <p style={{ color: "white" }}>Power: {item.power.toFixed(2)}</p>
              <p style={{ color: "white" }}>{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SolarCard;
