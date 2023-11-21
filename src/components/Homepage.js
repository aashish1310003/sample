import {React,useState} from 'react';
import "../styles/Homepage.css";
import Header from './Header';
import {FetchData,CurrentDay,todayData} from "../services/fechdata";


const {NextFiveDay} = FetchData();
const {currentPower, period_length, FUllDay} = CurrentDay();

const Homepage = () => {
  console.log("recieved from fetch data:",todayData.value);
  return (
    <div>
<Header />
<FetchData />
<CurrentDay/>
<div className='leftBox'>
    <div className='weather'><h3>weather</h3></div>
    <div className='daysforecast'><h3>5days</h3></div>
</div>
<div className='rightBox'>
    <div className='highlights'><h3>Highlights</h3></div>
    <div className='today'><h3>today</h3></div>
</div>

</div>
  );
}

export default Homepage;
