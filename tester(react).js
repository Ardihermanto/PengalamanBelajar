import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import Chart from 'react-apexcharts'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear'; // Import the ClearIcon from Material-UI
import "./MainDashboard.scss"
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';
import { Bars } from 'react-loader-spinner';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { addDays } from 'date-fns';
// import format from 'date-fns/format'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  // padding: theme.spacing(1),
  // padding: `${theme.spacing(12)}px ${theme.spacing(8)}px ${theme.spacing(8)}px`,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const src = "https://www.youtube.com/embed/AEp08vVYreg";

// const src = "http://103.102.114.106:61803";  // Cibuburcd


const MainDashboard = () => {


  const [todayRecords1, setTodayRecords1] = useState([]);
  const [todayRecords2, setTodayRecords2] = useState([]);
  const [todayRecords3, setTodayRecords3] = useState([]);
  const [todayRecords4, setTodayRecords4] = useState([]);
  const [todayRecords5, setTodayRecords5] = useState([]);

  const [percentageDayRecords1, setPercentageDayRecords1] = useState([]);
  const [percentageDayRecords2, setPercentageDayRecords2] = useState([]);
  const [percentageDayRecords3, setPercentageDayRecords3] = useState([]);
  const [percentageDayRecords4, setPercentageDayRecords4] = useState([]);
  const [percentageDayRecords5, setPercentageDayRecords5] = useState([]);

  const [oneWeekRecords1, setOneWeekRecords1] = useState([]);
  const [oneWeekRecords2, setOneWeekRecords2] = useState([]);
  const [oneWeekRecords3, setOneWeekRecords3] = useState([]);
  const [oneWeekRecords4, setOneWeekRecords4] = useState([]);
  const [oneWeekRecords5, setOneWeekRecords5] = useState([]);

  const [allMonthRecords1, setAllMonthRecords1] = useState([]);
  const [allMonthRecords2, setAllMonthRecords2] = useState([]);
  const [allMonthRecords3, setAllMonthRecords3] = useState([]);
  const [allMonthRecords4, setAllMonthRecords4] = useState([]);
  const [allMonthRecords5, setAllMonthRecords5] = useState([]);
  
  const [oneYearRecords1, setOneYearRecords1] = useState([]);
  const [oneYearRecords2, setOneYearRecords2] = useState([]);
  const [oneYearRecords3, setOneYearRecords3] = useState([]);
  const [oneYearRecords4, setOneYearRecords4] = useState([]);
  const [oneYearRecords5, setOneYearRecords5] = useState([]);

  //-----
  // const [name, setName] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  // const [setUsers] = useState([]);
  const navigate = useNavigate();

  // const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState('');
  // const [receivedMessages, setReceivedMessages] = useState([]);
  // const [setReceivedMessages] = useState([]);



  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(addDays(new Date(), 7)); // Default to a week from now
  // const [filteredData1, setFilteredData1] = useState(allMonthRecords1);
  // const [filteredData2, setFilteredData2] = useState(allMonthRecords2);
  // const [filteredData3, setFilteredData3] = useState(allMonthRecords3);
  // const [filteredData4, setFilteredData4] = useState(allMonthRecords4);
  // const [filteredData5, setFilteredData5] = useState(allMonthRecords5);

  // const [xaxisCategories1, setXaxisCategories1] = useState([]); // Add a state for xaxis categories
  // const [xaxisCategories2, setXaxisCategories2] = useState([]); // Add a state for xaxis categories
  // const [xaxisCategories3, setXaxisCategories3] = useState([]); // Add a state for xaxis categories
  // const [xaxisCategories4, setXaxisCategories4] = useState([]); // Add a state for xaxis categories
  // const [xaxisCategories5, setXaxisCategories5] = useState([]); // Add a state for xaxis categories

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const pickerRef = useRef(null);

  const handleDateRangeChange = (ranges) => {
    setDateRange(ranges.selection);
    // Only update dateRange if data loading is not in progress
    if (!isLoadingData) {
      setDateRange(ranges.selection);
    }
  };


  const formatDate = (date) => {
    // return date.toISOString();
    const utcTimestamp = date.getTime() - date.getTimezoneOffset() * 60000;
    return new Date(utcTimestamp).toISOString();
  };

  const handlePostData = () => {
    
    const postData = {
      startDate: formatDate(dateRange.startDate),
      endDate: formatDate(dateRange.endDate)
    };

    // Close the date picker when "Search" button is clicked
    setPickerVisibility(false);

    // console.log('Posting data:', postData);

    // axios.post('http://localhost:4000/summary/updateDateRange', postData)
    axios.post(process.env.REACT_APP_DATA_RANGE, postData)
      .then(response => {
        console.log('Data posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      })
      .finally(() => {
        setPickerVisibility(false); // Close the date picker after posting data
      });
    };

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerVisibility(false);
      }
    }
  
    function handleOutsideClick(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerVisibility(false);
      }
    }
  
    const handleSelectedDateRange = () => {
      console.log('Selected date range:', dateRange);
    };
  
    if (isPickerVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      // getSummary();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      // getSummary();
    }

    // // Add an event listener for beforeunload
    // window.addEventListener('beforeunload', () => {
    //   // Clear the localStorage
    //   localStorage.clear();
    // });


  

    // // Update filtered data and x-axis categories here
    // setFilteredData(allMonthRecords1.filter(record => {
    //   const recordDate = new Date(record.date);
    //   return recordDate >= dateRange.startDate && recordDate <= dateRange.endDate;
    // }));

    // const allMonth = [allMonthRecords_1,allMonthRecords_2, allMonthRecords_3, allMonthRecords_4, allMonthRecords_5]

    // // // Update x-axis categories based on the filtered data
    // const categories = allMonthRecords_1.map(record => record.month);
    // setXaxisCategories1(categories);
    
    // const allMonth = [allMonthRecords_1, allMonthRecords_2, allMonthRecords_3, allMonthRecords_4, allMonthRecords_5];

    setIsLoadingData(true); // Set isLoadingData to true when data loading starts
    
    handleSelectedDateRange();
    refreshToken();
    getUsers();
    getSummary()
    // initializeWebSocket();
    
      .then(() => {
        setIsLoadingData(false); // Set isLoadingData to false when data loading is complete
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoadingData(false); // Set isLoadingData to false in case of an error
      });
  
  
    document.addEventListener('mousedown', handleOutsideClick);
   
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleOutsideClick);
      // window.removeEventListener('beforeunload', () => {
      //   localStorage.clear();
      // });
      // getSummary();
    };
  }, [isPickerVisible]);

  // useEffect(() => {
  //   getSummary();
  // }, []);

  // const sendMessage = () => {
  //   if (socket && message) {
  //     socket.send(JSON.stringify({ message }));
  //     setMessage('');
  //   }
  // };
  
  // const sleep = (s) =>
  // new Promise((p) => setTimeout(p, (s * 1000) | 0))
  
  const refreshToken = async() => {
    //  await sleep(1);
      try {
          // const response = await axios.get('http://localhost:4000/user/token');
          const response = await axios.get(process.env.REACT_APP_TOKEN);
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          // console.log(decoded);
          setName(decoded.name);
          setExpire(decoded.exp);
          
      } catch (error) {
          if(error.response){
              navigate("/");
              // navigate("/auth/login");
              
          }
      }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
      // await sleep(1);
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          // const response = await axios.get('http://localhost:4000/user/token');
          const response = await axios.get(process.env.REACT_APP_TOKEN);
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

  const getUsers = async() => {
      // await sleep(1);
      // const response = await axiosJWT.get('http://localhost:4000/user/dataUsers',{
      const response = await axiosJWT.get(process.env.REACT_APP_DATA_USERS,{
          headers:{
              Authorization: `Bearer ${token}`
          }
      });
      // console.log(response.data);
      setUsers(response.data);
  }

  
  axiosJWT.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const getSummary = async () => {
    // await sleep(1);
    // axiosJWT.get('http://localhost:4000/summary')
    
    axiosJWT.get(process.env.REACT_APP_SUMMARY)
      .then((response) => {
        
        setTodayRecords1(response.data.todayRecords1);
        setTodayRecords2(response.data.todayRecords2);
        setTodayRecords3(response.data.todayRecords3);
        setTodayRecords4(response.data.todayRecords4);
        setTodayRecords5(response.data.todayRecords5);

        setPercentageDayRecords1(response.data.percentageDay1);
        setPercentageDayRecords2(response.data.percentageDay2);
        setPercentageDayRecords3(response.data.percentageDay3);
        setPercentageDayRecords4(response.data.percentageDay4);
        setPercentageDayRecords5(response.data.percentageDay5);

        setOneWeekRecords1(response.data.oneWeekRecords1);
        setOneWeekRecords2(response.data.oneWeekRecords2);
        setOneWeekRecords3(response.data.oneWeekRecords3);
        setOneWeekRecords4(response.data.oneWeekRecords4);
        setOneWeekRecords5(response.data.oneWeekRecords5);

        setAllMonthRecords1(response.data.allMonthRecords1);
        setAllMonthRecords2(response.data.allMonthRecords2);
        setAllMonthRecords3(response.data.allMonthRecords3);
        setAllMonthRecords4(response.data.allMonthRecords4);
        setAllMonthRecords5(response.data.allMonthRecords5);

        setOneYearRecords1(response.data.oneYearRecords1);
        setOneYearRecords2(response.data.oneYearRecords2);
        setOneYearRecords3(response.data.oneYearRecords3);
        setOneYearRecords4(response.data.oneYearRecords4);
        setOneYearRecords5(response.data.oneYearRecords5);

        setIsLoading(false);

      })
     .catch((error) => {
        console.error('Error fetching today\'s records:', error);
        setIsLoading(false);
      });

    
  }
    
  const todayRecords_1 = todayRecords1
  const todayRecords_2 = todayRecords2
  const todayRecords_3 = todayRecords3
  const todayRecords_4 = todayRecords4
  const todayRecords_5 = todayRecords5

  const percentageDayRecords_1 = percentageDayRecords1
  const percentageDayRecords_2 = percentageDayRecords2
  const percentageDayRecords_3 = percentageDayRecords3
  const percentageDayRecords_4 = percentageDayRecords4
  const percentageDayRecords_5 = percentageDayRecords5

  const oneWeekRecords_1 = oneWeekRecords1
  const oneWeekRecords_2 = oneWeekRecords2
  const oneWeekRecords_3 = oneWeekRecords3
  const oneWeekRecords_4 = oneWeekRecords4
  const oneWeekRecords_5 = oneWeekRecords5

  const allMonthRecords_1 = allMonthRecords1
  const allMonthRecords_2 = allMonthRecords2
  const allMonthRecords_3 = allMonthRecords3
  const allMonthRecords_4 = allMonthRecords4
  const allMonthRecords_5 = allMonthRecords5

  const oneYearRecords_1 = oneYearRecords1
  const oneYearRecords_2 = oneYearRecords2
  const oneYearRecords_3 = oneYearRecords3
  const oneYearRecords_4 = oneYearRecords4
  const oneYearRecords_5 = oneYearRecords5

  
  const allDay = [oneWeekRecords_1,oneWeekRecords_2, oneWeekRecords_3, oneWeekRecords_4, oneWeekRecords_5]
  const series1 = allDay.map((source, index) => ({
    name: `Site ${index + 1}`,
    data: source.map(record => record.count),
  }));
 
  const options1 = { //data on the x-axis
    // colors : ['#e3f6f5', '#bbe4e9','#79c2d0','#53a8b6','#5585b5'],
    colors : ['#f4efed', '#86e8e5','#20dad8','#20b5d8','#208ed8'],
    chart: { 
      id: 'bar-chart',
      // fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontFamily: 'Nunito, sans-serif',
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
        },
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString()
          }
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: undefined,
        }
      },
    },
    xaxis: {
      categories: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    },
    title: {
      text: 'Day',
      align: 'Left',
      style: {
        fontSize: '16px', // Set the font size for the title
        // color: '#FF5733' // Set the color for the title
        
        color: '#333366'
      }
    },  
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '14px',
        // fontFamily: 'Helvetica, Arial, sans-serif',
        // fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        // fontWeight: 'bold',
        colors: undefined,
      },
    },
    markers: {
      size: 1
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    stroke: { width: 1, curve: 'smooth' },
    
    responsive: [
      {
        breakpoint: undefined,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  
  
  const allMonth = [allMonthRecords_1, allMonthRecords_2, allMonthRecords_3, allMonthRecords_4, allMonthRecords_5];
  const series2 = allMonth.map((source, index) => ({
    name: `Site ${index + 1}`,
    data: source.map(record => record.count),
  }));



  // const series2 = filteredData.map((record, index) => ({
  //   name: `Site ${index + 1}`,
  //   data: [record.count], // Use record.count for the data
  // }));

  // const series2 = filteredData.map((records, index) => ({
  //   name: `Site ${index + 1}`,
  //   data: records.map((record) => record.count),
  // }));

  // const series2 = [{
  //   name: 'Site 1',
  //   data:  filteredData.map(record => record.count),
  // }];

  // const allDay1 = [oneWeekRecords_1,oneWeekRecords_2, oneWeekRecords_3, oneWeekRecords_4, oneWeekRecords_5]
  // const series2 = allDay1.map((source, index) => ({
  //   name: `Site ${index + 1}`,
  //   data: source.map(record => record.count),
  // }));

  //  const allMonth = [allMonthRecords_1, allMonthRecords_2, allMonthRecords_3, allMonthRecords_4, allMonthRecords_5];
  //  const series2 = allMonth.map((source, index) => ({
  //   name: `Site ${index + 1}`,
  //   data: source.map(record => record.count),
  // }));
  // const series2 = [
  //   {
  //     name: 'Site 1',
  //     data: allMonthRecords_1.map(record => record.count),
  //   },
  //   {
  //     name: 'Site 2',
  //     data: allMonthRecords_2.map(record => record.count),
  //   },
  //   {
  //     name: 'Site 3',
  //     data: allMonthRecords_3.map(record => record.count),
  //   },
  //   {
  //     name: 'Site 4',
  //     data: allMonthRecords_4.map(record => record.count),
  //   },
  //   {
  //     name: 'Site 5',
  //     data: allMonthRecords_5.map(record => record.count),
  //   }
  // ];
  
  // console.log(series2);

  const options2 = { //data on the x-axis
    colors : ['#f4efed', '#86e8e5','#20dad8','#20b5d8','#208ed8'],
    chart: { 
      id: 'bar-chart',
      // fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontFamily: 'Nunito, sans-serif',
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
        },
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString()
          }
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: undefined,
        }
      },
    },
    xaxis: {
      // categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      // type: 'datetime'
      // categories : month_1,
      // categories: xaxisCategories1,
      categories: allMonthRecords_2.map(record => record.month),
    },
    title: {
      text: 'Month',
      align: 'Left',
      style: {
        fontSize: '16px', // Set the font size for the title
        // color: '#FF5733' // Set the color for the title
        color: '#333366'
      }
    },  
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '14px',
        // fontFamily: 'Helvetica, Arial, sans-serif',
        // fontWeight: 'bold',
        colors: undefined,
      },
    },
    markers: {
      size: 5
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
      floating: true,
      offsetY: -25,
      offsetX: 6
    },
    stroke: { width: 3, curve: 'smooth' },
    
    responsive: [
      {
        breakpoint: undefined,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };


  const allYear = [oneYearRecords_1,oneYearRecords_2, oneYearRecords_3, oneYearRecords_4, oneYearRecords_5]
  const series3 = allYear.map((source, index) => ({
    name: `Site ${index + 1}`,
    data: source.map(record => record.count),
  }));
  const options3 = { //data on the x-axis
    colors : ['#f4efed', '#86e8e5','#20dad8','#20b5d8','#208ed8'],
    chart: { 
      id: 'bar-chart',
      // fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontFamily: 'Nunito, sans-serif',
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
        },
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString()
          }
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: undefined,
        }
      },
    },
    xaxis: {
      // categories: ["2021","2022","2023","2024"]
      categories : oneYearRecords1.map(record => record.year)
    },
    title: {
      text: 'Year',
      align: 'Left',
      style: {
        fontSize: '16px', // Set the font size for the title
        // color: '#FF5733' // Set the color for the title
        color: '#333366'
      }
    },  
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5
    },
    legend: {
      show: false,

      // fontSize: '12px',
      position: 'top',
      horizontalAlign: 'left',
      floating: true,
      offsetY: -25,
      offsetX: 6
    },
    stroke: { width: 3, curve: 'smooth' },
    
    responsive: [
      {
        breakpoint: undefined,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  

  return (
    <div>
      <div className='dashboard-box'>
      {(isLoading) ? (
          <div
            className="dashboard-box_spinner-container"
          >
            <Bars
              height={60}
              width={100}
              color="#333366"
              ariaLabel="bars-loading"
            />
            
          </div>
          
        ) : (
        <Box  sx={{ flexGrow: 1 }}>
          <Grid  container rowSpacing={2} columnSpacing={2}  >
              <Grid xs={12} sm={12} md={6} xl={12}>
                  <div ref={pickerRef}>
                      {isPickerVisible ? (
                        <div className="date-range-picker">
                          <DateRange
                            editableDateInputs={true}
                            onChange={handleDateRangeChange}
                            onCalendarOpen={() => setPickerVisibility(true)} // Update the picker visibility state
                            onCalendarClose={() => setPickerVisibility(false)} // Update the picker visibility state
                            moveRangeOnFirstSelection={false}
                            ranges={[dateRange]}
                          />
                        </div>
                      ) : (
                        <Button className="date-range-button" variant="contained" onClick={() => setPickerVisibility(!isPickerVisible)} startIcon={<DateRangeIcon />}>
                          Open Date Picker
                        </Button>
                      )}
                      {isPickerVisible && (
                        <Button className="date-range-button" variant="contained" onClick={handlePostData} startIcon={<SearchIcon />}>
                          Search
                        </Button>
                      )}
                  </div>
              </Grid>
              <Grid xs={12} sm={12} md={6} xl={12}>

              </Grid>
              {/* <div style={{ backgroundColor: 'your_color_here', padding: '10px' }}>
                
              </div> */}
              <Grid xs={6} sm={2.4}  md={2.4} xl={2.4}>
                <Item1 className='dashboard_all'>
                  <Box height={191}  style={{ borderBottom: '8px solid #9aebe9'}}>
                    <div className='dashboard_all_title'>Site 1</div>
                    
                    <div className="dashboard-box_info_title">
                      {!(Math.sign(percentageDayRecords_1) < 0 )? (
                        <div>
                          <span>From last day </span><p className='bx bx-chevrons-up' style={{ color: 'green' }}></p><span>{percentageDayRecords_1}%</span>
                        </div>
                      ) : (
                        <div>
                          <span>From last day </span><p className='bx bx-chevrons-down'style={{ color: 'red' }}></p><span>{percentageDayRecords_1}%</span>
                        </div>
                      )}
                    </div>
                    <div className="dashboard-box_info_value">
                      {todayRecords_1.map(record => record.count)} 
                    </div>
                  </Box>
                </Item1>
              </Grid>
            <Grid xs={6} sm={2.4}  md={2.4} xl={2.4}>
              <Item1 className='dashboard_all'>
                <Box height={191}  style={{ borderBottom: '8px solid #9aebe9'}}>
                  <div className='dashboard_all_title'>Site 2</div>
                  <div className="dashboard-box_info_title">
                    {!(Math.sign(percentageDayRecords_2) < 0 )? (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-up' style={{ color: 'green' }}></p><span>{percentageDayRecords_2}%</span>
                      </div>
                    ) : (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-down' style={{ color: 'red' }}></p><span>{percentageDayRecords_2}%</span>
                      </div>
                    )}
                  </div>
                  <div className="dashboard-box_info_value">
                    {todayRecords_2.map(record => record.count)} 
                  </div>
                </Box>
              </Item1>
            </Grid>
            <Grid xs={6} sm={2.4}  md={2.4} xl={2.4}>
              <Item1 className='dashboard_all'>
                <Box height={191}  style={{ borderBottom: '8px solid #9aebe9'}}>
                  <div className='dashboard_all_title'>Site 3</div>
                  <div className="dashboard-box_info_title">
                    {!(Math.sign(percentageDayRecords_3) < 0 )? (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-up' style={{ color: 'green' }}></p><span>{percentageDayRecords_3}%</span>
                      </div>
                    ) : (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-down' style={{ color: 'red' }}></p><span>{percentageDayRecords_3}%</span>
                      </div>
                    )}
                  </div>
                  <div className="dashboard-box_info_value">
                    {todayRecords_3.map(record => record.count)} 
                  </div>
                </Box>
              </Item1>
            </Grid>
            <Grid xs={6} sm={2.4}  md={2.4} xl={2.4}>
              <Item1 className='dashboard_all'>
                <Box height={191}  style={{ borderBottom: '8px solid #9aebe9'}}>
                  <div className='dashboard_all_title'>Site 4</div>
                  <div className="dashboard-box_info_title">
                    {!(Math.sign(percentageDayRecords_4) < 0 )? (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-up' style={{ color: 'green' }}></p><span>{percentageDayRecords_4}%</span>
                      </div>
                    ) : (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-down' style={{ color: 'red' }}></p><span>{percentageDayRecords_4}%</span>
                      </div>
                    )}
                  </div>
                  <div className="dashboard-box_info_value">
                    {todayRecords_4.map(record => record.count)} 
                  </div>
                </Box>
              </Item1>
            </Grid>
            <Grid xs={6} sm={2.4}  md={2.4} xl={2.4}>
              <Item1 className='dashboard_all'>
                <Box height={191}  style={{ borderBottom: '8px solid #9aebe9'}}>
                  <div className='dashboard_all_title'>Site 5</div>
                  <div className="dashboard-box_info_title">
                    {!(Math.sign(percentageDayRecords_5) < 0 )? (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-up' style={{ color: 'green' }}></p><span>{percentageDayRecords_5}%</span>
                      </div>
                    ) : (
                      <div>
                        <span>From last day </span><p className='bx bx-chevrons-down' style={{ color: 'red' }}></p><span>{percentageDayRecords_5}%</span>
                      </div>
                    )}
                  </div>
                  <div className="dashboard-box_info_value">
                    {todayRecords_5.map(record => record.count)} 
                  </div>
                </Box>
              </Item1>
            </Grid>
            <Grid xs={12} sm={12} md={12} xl={12}>
              <Item>
                <Box height={378}>
                  <Chart
                    options={options1}
                    series={series1}
                    type="bar"
                    // width="450"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Item>
            </Grid>
            <Grid xs={12} sm={12} md={12} xl={12}>
              <Item>
                <Box height={378}>
                  <Chart
                    options={options2}
                    series={series2}
                    // title={options.title}
                    type="line"
                    // width="450"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Item>
            </Grid>
            <Grid xs={12} sm={12} md={12} xl={12}>
              <Item>
                <Box height={378}>
                  <Chart
                    options={options3}
                    series={series3}
                    // title={options.title}
                    type="line"
                    // width="450"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
      </div>
    </div>
  )
}

export default MainDashboard
