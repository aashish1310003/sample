import { React, useEffect, useState } from "react";
import axios from "axios";



var currentDate = new Date();
var next5Dates = Array.from({ length: 6 }, (_, index) => {
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + index);
    return nextDate;
  });

// Format and store only the date portion of the array of next 5 dates in a new array
var formattedDates = next5Dates.map(function(date) {
  return date.toLocaleDateString();
});

const FetchData = () => {
  
  const [futureData,setfutureData] = useState(0);
    useEffect(() => {
        var data = JSON.stringify({
          "collection": "prediction",
          "database": "solar",
          "dataSource": "solarCluster0",
          "projection": {
            "_id":1,
            "period_end": 1
          },
          "sort": {
            "period_end": -1
          }
        });

    axios.post('/api/app/data-tkeqt/endpoint/data/v1/action/find', data)
      .then(function (response) {
        const apiDates = response.data.documents.map(doc => ({ id: doc._id, value: new Date(doc.period_end).toLocaleDateString() }));
        //console.log(apiDates)
        const otherList = formattedDates;//['9/3/2023', '8/22/2023', '8/23/2023', '8/24/2023', '8/25/2023'];

        const intersection = apiDates.filter(apiItem => {
          const commonValue = apiItem.value;
          return otherList.includes(commonValue);
        });
        setfutureData(intersection);
        // console.log("**********************************************")
        // console.log(intersection);

      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // Empty dependency array to trigger the request once on component mount
  return <></>
  //return {FutureData:futureData};
  
};


const CurrentDay = () => {
  
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);
  const [todayValue,setTodayValue]=useState(0);
  const [todaySeries, setTodaySeries] = useState(0);

  useEffect(() => {
    var currentDate = new Date().toLocaleDateString();

    var data = JSON.stringify({
      "collection": "prediction",
      "database": "solar",
      "dataSource": "solarCluster0",
      "projection": {
        "_id": 1,
        "period_end": 1,
        "Predicted Solar Power":1
      },
      "sort": {
        "period_end": -1
      }
    });

    axios.post('/api/app/data-tkeqt/endpoint/data/v1/action/find', data)
      .then(function (response) {
        const apiData = response.data.documents.map(doc => ({ id: doc._id,power:doc['Predicted Solar Power'], value: new Date(doc.period_end).toLocaleDateString() }));
        //console.log(apiData)
        //const otherList = formattedDates; //['9/3/2023', '8/22/2023', '8/23/2023', '8/24/2023', '8/25/2023'];

        const currentDate_values = apiData.filter(Item => {
          const commonValue = Item.value;
          return currentDate.includes(commonValue);
        });
        //console.log(currentDate_values)
        const filteredValues = currentDate_values.filter(item => item.power >= 0.5);
        setTodaySeries(filteredValues);
        //console.log(filteredValues)
        const newCount = filteredValues.length;
        const newSum = filteredValues.reduce((accumulator, currentValue) => accumulator + currentValue.power, 0);
        setTodayValue(newSum);
        setCount(newCount);
        setSum(newSum);

        console.log("Count of values greater than 0.1:", newCount);
        console.log("Sum of values greater than 0.1:", newSum);
        console.log("**********************************************")
        console.log(currentDate_values);

      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
console.log("Todays VAlue is :",todayValue)
  return <></>
    // todayValue,
    // count,
    // todaySeries,
  
}

// const todayData =(todayValue)=>{
//   const value=todayValue;
//   return(
//     value
//   )
// }



//export default FetchData;
export {CurrentDay, FetchData};
