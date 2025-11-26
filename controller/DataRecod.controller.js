const DataRecod = require('../models/DataRecod.model')

const addNewRecod = async (req, res) => {
    try {
        // Step 1: Group all existing records by date and calculate averages for duplicates
        const allRecords = await DataRecod.find();
        const groupedByDate = {};
        
        // Group records by date
        allRecords.forEach(record => {
            const date = record.Date;
            if (!groupedByDate[date]) {
                groupedByDate[date] = [];
            }
            groupedByDate[date].push(record);
        });

        // Process groups with 2 or more records
        const recordsToDelete = [];
        const averagedRecords = [];
        
        for (const [date, records] of Object.entries(groupedByDate)) {
            if (records.length >= 2) {
                // Calculate averages
                const avgRecord = {
                    Date: date,
                    Time: records[records.length - 1].Time, // Use latest time
                    temperature: calculateAverage(records, 'temperature'),
                    humidity: calculateAverage(records, 'humidity'),
                    sunLight: calculateAverage(records, 'sunLight'),
                    soilMoisture: calculateAverage(records, 'soilMoisture')
                };
                
                averagedRecords.push(avgRecord);
                recordsToDelete.push(...records.map(r => r._id));
            }
        }

        // Step 2: Delete old duplicate records and insert averaged ones
        if (recordsToDelete.length > 0) {
            await DataRecod.deleteMany({ _id: { $in: recordsToDelete } });
            
            if (averagedRecords.length > 0) {
                await DataRecod.insertMany(averagedRecords);
            }
        }

        // Step 3: Insert the new record
        const data = req.body;
        const newRecod = new DataRecod(data);
        await newRecod.save();

        res.status(201).json({
            code: 201,
            status: 'success',
            data: { 
                message: 'Data Record added successfully',
                processedGroups: averagedRecords.length,
                deletedRecords: recordsToDelete.length
            }
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to add data record', details: error.message }
        });
    }
};

// Helper function to calculate average
const calculateAverage = (records, field) => {
    const values = records
        .map(record => parseFloat(record[field]))
        .filter(value => !isNaN(value));
    
    if (values.length === 0) return 0;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return parseFloat((sum / values.length).toFixed(2));
};

const getAllRecods = (req, res) => {
    DataRecod.find()
        .then((recods) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { recods }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve data recods', details: error.message }
        }));
};

const getLatestRecod = (req, res) => {
    DataRecod.findOne().sort({ Date: -1, Time: -1 })
        .then((recod) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { recod }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve latest data recod', details: error.message }
        }));
};

module.exports = { addNewRecod, getAllRecods, getLatestRecod }