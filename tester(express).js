const { Sequelize } = require('../models');

// const LocalStorage = require('node-localstorage').LocalStorage;
// const localStorage = new LocalStorage('./localStorage');

const { getRecordsByDate1, getDate1, 
  getRecordsByDate2, getDate2,
  getRecordsByDate3, getDate3,
  getRecordsByDate4, getDate4,
  getRecordsByDate5, getDate5
} = require('../core/summary.core');

var dateStartValue = null;
var dateEndValue = null;

exports.getSummary = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0; // berisi current page // convert req.query.page to integer // || set default 0
    const limit = parseInt(req.query.limit) ||10; // jika user tidak mengirimkan keyword limitnya, maksimal limit pages 10
    const search = req.query.search_query || ""; //untuk menampung keyword yang diketikan user
    const offset = limit * page;
    const { startDate, endDate } = req.body;
    console.log('startDate_Axios', startDate, 'endDate_Axios', endDate);

    if (startDate && endDate){
      dateStartValue = new Date(startDate).toISOString().split('T')[0];
      dateEndValue = new Date(endDate).toISOString().split('T')[0];
      
      console.log('dateStartValue_final', dateStartValue);
      console.log('dateEndValue_final', dateEndValue);
    } 

    try {
        const result1 = await getDate1(req, res);
        const result2 = await getDate2(req, res);
        const result3 = await getDate3(req, res);
        const result4 = await getDate4(req, res);
        const result5 = await getDate5(req, res);
       
        if ((startDate != result1.firstDateOfYear) && (!dateStartValue) || (startDate != result1.firstDateOfYear) && (dateStartValue) ){
          console.log('Success')
          //
        }

        if (!dateStartValue) {
          // Set dateStartValue to the current date
          dateStartValue = result1.firstDateOfYear;
        }

        if (!dateEndValue) {
          // Set dateStartValue to the current date
          dateEndValue = result1.today;
        }

        const [
            todayRecords1,
            todayRecords2,
            todayRecords3,
            todayRecords4,
            todayRecords5,

            yesterdayRecords1,
            yesterdayRecords2,
            yesterdayRecords3,
            yesterdayRecords4,
            yesterdayRecords5,

            oneWeekRecords1,
            oneWeekRecords2,
            oneWeekRecords3,
            oneWeekRecords4,
            oneWeekRecords5,

            allMonthRecords1,
            allMonthRecords2,
            allMonthRecords3,
            allMonthRecords4,
            allMonthRecords5,

            oneYearRecords1,
            oneYearRecords2,
            oneYearRecords3,
            oneYearRecords4,
            oneYearRecords5,

          ] = await Promise.all([
            //startDate, endDate, name, attribute_extend, attribute_extend_sequelize1, attribute_extend_sequelize2, group, limit, offset

            getRecordsByDate1(result1.today, result1.today, 'car', 'name',[Sequelize.fn('count', Sequelize.col('name')), 'count'],[Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'name', limit, offset), // todayRecords
            getRecordsByDate2(result2.today, result2.today, 'car', 'name',[Sequelize.fn('count', Sequelize.col('name')), 'count'],[Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'name', limit, offset), // todayRecords
            getRecordsByDate3(result3.today, result3.today, 'car', 'name',[Sequelize.fn('count', Sequelize.col('name')), 'count'],[Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'name', limit, offset), // todayRecords
            getRecordsByDate4(result4.today, result4.today, 'car', 'name',[Sequelize.fn('count', Sequelize.col('name')), 'count'],[Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'name', limit, offset), // todayRecords
            getRecordsByDate5(result5.today, result5.today, 'car', 'name',[Sequelize.fn('count', Sequelize.col('name')), 'count'],[Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'name', limit, offset), // todayRecords
            
            getRecordsByDate1(result1.yesterday, result1.yesterday,'car', 'name', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'], 'name', limit, offset), // yesterdayRecords
            getRecordsByDate2(result2.yesterday, result2.yesterday,'car', 'name', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'], 'name', limit, offset), // yesterdayRecords
            getRecordsByDate3(result3.yesterday, result3.yesterday,'car', 'name', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'], 'name', limit, offset), // yesterdayRecords
            getRecordsByDate4(result4.yesterday, result4.yesterday,'car', 'name', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'], 'name', limit, offset), // yesterdayRecords
            getRecordsByDate5(result5.yesterday, result5.yesterday,'car', 'name', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'], 'name', limit, offset), // yesterdayRecords
            
            getRecordsByDate1(result1.lastSundayDate, result1.today,'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'date', limit, offset), // oneWeekRecords
            getRecordsByDate2(result2.lastSundayDate, result2.today,'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'date', limit, offset), // oneWeekRecords
            getRecordsByDate3(result3.lastSundayDate, result3.today,'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'date', limit, offset), // oneWeekRecords
            getRecordsByDate4(result4.lastSundayDate, result4.today,'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'date', limit, offset), // oneWeekRecords
            getRecordsByDate5(result5.lastSundayDate, result5.today,'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%W')"),'day'],'date', limit, offset), // oneWeekRecords
            
            // getRecordsByDate1(result1.firstDateOfYear, result1.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            // getRecordsByDate2(result2.firstDateOfYear, result2.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            // getRecordsByDate3(result3.firstDateOfYear, result3.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            // getRecordsByDate4(result4.firstDateOfYear, result4.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            // getRecordsByDate5(result5.firstDateOfYear, result5.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords

            getRecordsByDate1(dateStartValue, dateEndValue, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            getRecordsByDate2(dateStartValue, dateEndValue, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            getRecordsByDate3(dateStartValue, dateEndValue, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            getRecordsByDate4(dateStartValue, dateEndValue, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords
            getRecordsByDate5(dateStartValue, dateEndValue, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%b')"),'month'],'month', limit, offset), //AllMonthRecords

            getRecordsByDate1(result1.firstDateOfYear, result1.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%Y')"),'year'],'name', limit, offset), //OneYearRecords
            getRecordsByDate2(result2.firstDateOfYear, result2.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%Y')"),'year'],'name', limit, offset), //OneYearRecords
            getRecordsByDate3(result3.firstDateOfYear, result3.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%Y')"),'year'],'name', limit, offset), //OneYearRecords
            getRecordsByDate4(result4.firstDateOfYear, result4.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%Y')"),'year'],'name', limit, offset), //OneYearRecords
            getRecordsByDate5(result5.firstDateOfYear, result5.today, 'car','date', [Sequelize.fn('count', Sequelize.col('name')), 'count'], [Sequelize.literal("DATE_FORMAT(date, '%Y')"),'year'],'name', limit, offset), //OneYearRecords
        ]);

        const dayCount1 =  todayRecords1[0].count || 0;
        const dayCount2 =  todayRecords2[0].count || 0;
        const dayCount3 =  todayRecords3[0].count || 0;
        const dayCount4 =  todayRecords4[0].count || 0;
        const dayCount5 =  todayRecords5[0].count || 0;

        const yesterdayCount1 = yesterdayRecords1[0].count || 0;
        const yesterdayCount2 = yesterdayRecords2[0].count || 0;
        const yesterdayCount3 = yesterdayRecords3[0].count || 0;
        const yesterdayCount4 = yesterdayRecords4[0].count || 0;
        const yesterdayCount5 = yesterdayRecords5[0].count || 0;

        const percentageDay1 = (((dayCount1 - yesterdayCount1) / yesterdayCount1) * 100).toFixed(2);
        const percentageDay2 = (((dayCount2 - yesterdayCount2) / yesterdayCount2) * 100).toFixed(2);
        const percentageDay3 = (((dayCount3 - yesterdayCount3) / yesterdayCount3) * 100).toFixed(2);
        const percentageDay4 = (((dayCount4 - yesterdayCount4) / yesterdayCount4) * 100).toFixed(2);
        const percentageDay5 = (((dayCount5 - yesterdayCount5) / yesterdayCount5) * 100).toFixed(2);

        // const oneWeekRecordsWithDayName = oneWeekRecords.map((record) => ({
        // ...record,
        // dayName: getDayName(record.date)
        // }));
        console.log(allMonthRecords1, allMonthRecords2, allMonthRecords3, allMonthRecords4, allMonthRecords5);

        res.json({
            percentageDay1 : percentageDay1,
            percentageDay2 : percentageDay2,
            percentageDay3 : percentageDay3,
            percentageDay4 : percentageDay4,
            percentageDay5 : percentageDay5,

            todayRecords1 : todayRecords1,
            todayRecords2 : todayRecords2,
            todayRecords3 : todayRecords3,
            todayRecords4 : todayRecords4,
            todayRecords5 : todayRecords5,

            oneWeekRecords1 : oneWeekRecords1,
            oneWeekRecords2 : oneWeekRecords2,
            oneWeekRecords3 : oneWeekRecords3,
            oneWeekRecords4 : oneWeekRecords4,
            oneWeekRecords5 : oneWeekRecords5,

            allMonthRecords1 : allMonthRecords1,
            allMonthRecords2 : allMonthRecords2,
            allMonthRecords3 : allMonthRecords3,
            allMonthRecords4 : allMonthRecords4,
            allMonthRecords5 : allMonthRecords5,

            oneYearRecords1 : oneYearRecords1, 
            oneYearRecords2 : oneYearRecords2, 
            oneYearRecords3 : oneYearRecords3, 
            oneYearRecords4 : oneYearRecords4, 
            oneYearRecords5 : oneYearRecords5, 
        })
    } catch (error) {
            // console.error("Error querying the database:", error);
            // Handle the error or return an error response to the client
            res.status(500).json({ error: "An error occurred while querying the database." });
    }
};


