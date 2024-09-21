const faker = require('faker');

// Function to generate random user data based on region
const generateUserRecords = (region, errorPerRecord, page = 1) => {
  const records = [];
  const recordsPerPage = 20;
  const batchSize = 20 + (page - 1) * 10;

  for (let i = 0; i < batchSize; i++) {
    let record = generateUserRecord(region);
    record = applyErrors(record, errorPerRecord);
    records.push(record);
  }
  
  return records;
};

// Function to generate a single user record
const generateUserRecord = (region) => {
  let name = faker.name.findName(); // Random name
  let address = faker.address.streetAddress(); // Random address
  let phone = faker.phone.phoneNumber(); // Random phone number
  
  return {
    index: faker.datatype.uuid(), // Unique identifier
    name,
    address,
    phone
  };
};

// Function to apply errors based on user input
const applyErrors = (record, errorPerRecord) => {
  const errorCount = Math.floor(errorPerRecord);
  
  for (let i = 0; i < errorCount; i++) {
    if (Math.random() > 0.5) {
      // Introduce a random error: reverse the name
      record.name = record.name.split('').reverse().join('');
    }
  }

  return record;
};

module.exports = { generateUserRecords, applyErrors };
