import { useEffect, useState } from 'react'
import './App.css'
import Chart from 'react-apexcharts'
import axios from 'axios'

function App() {
  const [option, setOption] = useState({
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  })
  const [series, setseries] = useState([
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ])
  const getdata = async () => {
    try {
      const data = await axios({
        method: 'get',
        url: 'https://checkinn.co/api/v1/int/requests',
      })
      const requiedData = data.data.requests.map((d) => {
        return d.hotel.name
      })
      let hotelNames = [...new Set(requiedData)]
      let dataArray = new Array(hotelNames.length).fill(0)
      hotelNames.map((d1, i) => {
        requiedData.map((d2) => {
          if (d1 === d2) {
            dataArray[i]++
          }
        })
      })
      setOption({
        xaxis: {
          categories: hotelNames,
        },
      })
      setseries([
        {
          name: 'series-1',
          data: dataArray,
        },
      ])
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    getdata()
  }, [])

  return (
    <>
      <div className='container'>
        <h3>Harsh choudhary whatsApp:8527970982</h3>
        <Chart options={option} series={series} type='line' width='800' />
      </div>
    </>
  )
}

export default App
