import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false // Set to true only for local dev with self-signed certs
  },
  port: 1433,
  requestTimeout: 0,
  connectionTimeout: 30000
};

const fetchAll = async () => {
    try {
        await sql.connect(config);
        const query = 'SELECT TOP (100) * FROM energy_data';
        const result = await sql.query(query);
        console.log("Data:", result.recordset);
        await sql.close();
        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error); 
        throw new Error("Failed to fetch data: " + error.message);
    }
}


const fetchCities = async (userInput) => {
  try {
    await sql.connect(config);
    const query = 'SELECT TOP (20) * FROM city_has_id WHERE city LIKE @userInput';
    const request = new sql.Request();
    request.input('userInput', sql.VarChar, `%${userInput}%`);
    console.log("Executing query:", query);
    console.log("With input parameter:", `%${userInput}%`);
    const result = await request.query(query);
    console.log("Query result:", result.recordset);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cities: " + error.message);  
  }
}
//account type 1 = admin  2 = city council 3 = network manager
// const account_id = 2;
const findUsername = async () => {
  if (usernameInput) {
    try {
      await sql.connect(config);
      const query = `
        SELECT account_id FROM account where username = `+usernameInput+`;
      `;

      const result = await sql.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch account data: " + error.message);  
    }
  } else {
    throw new Error("Username not detected");
  }
}

const fetchUserData = async () => {
  if (passwordInput) {
    try {
      await sql.connect(config);
      const query = `
        SELECT * FROM account where account_id = `+account_id+` AND password = `+`;
      `;

      const result = await sql.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch account filter data: " + error.message);  
    }
  } else {
    throw new Error("Password not detected");
  }
}

const fetchAnnualNetworkEnergy = async (userNetwork) => {
  if (account_id) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.year,
          e.electric_or_gas,
          ROUND(SUM(e.annual_consume),3) AS total_annual_consume,
          d.net_manager,
          ROUND(AVG(e.delivery_perc),2) AS total_delivery_perc,
          ROUND(AVG(e.annual_consume_lowtarif_perc),2) AS total_annual_consume_lowtarif_perc
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        WHERE
          (d.net_manager = '`+userNetwork+`')
        GROUP BY 
          e.year, e.electric_or_gas, d.net_manager
        ORDER BY 
          e.year, e.electric_or_gas;
      `;

      const result = await sql.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch usage data: " + error.message);  
    }
  } else {
    throw new Error("Filtering by city is not yet implemented");
  }
}
const fetchAnnualCityEnergy = async (userCity) => {
  if (account_id) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.year,
          e.electric_or_gas,
          ROUND(SUM(e.annual_consume),3) AS total_annual_consume,
          d.city,
          ROUND(AVG(e.delivery_perc),2) AS total_delivery_perc,
          ROUND(AVG(e.annual_consume_lowtarif_perc),2) AS total_annual_consume_lowtarif_perc
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        WHERE
          (d.city = '`+userCity+`')
        GROUP BY 
          e.year, e.electric_or_gas, d.city
        ORDER BY 
          e.year, e.electric_or_gas;
      `;

      const result = await sql.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch usage data: " + error.message);  
    }
  } else {
    throw new Error("Filtering by city is not yet implemented");
  }
}


const fetchUsageSumPerYear = async (account_id) => {
  if (!account_id) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.year,
          e.electric_or_gas,
          ROUND(SUM(e.annual_consume),3) AS total_annual_consume,
          d.city,
          ROUND(AVG(e.delivery_perc),2) AS total_delivery_perc,
          ROUND(AVG(e.annual_consume_lowtarif_perc),2) AS total_annual_consume_lowtarif_perc
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        WHERE
          (d.city = 'ENTER')
        GROUP BY 
          e.year, e.electric_or_gas, d.city
        ORDER BY 
          e.year, e.electric_or_gas;
      `;

      const result = await sql.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch usage data: " + error.message);  
    }
  } else {
    throw new Error("Filtering by city is not yet implemented");
  }
}

const fetchElectricityUsagePerZipcode = async(city) => {
  try {
    await sql.connect(config);
    const query = 
    `SELECT TOP(1000) e.zipcode_from,
      e.annual_consume,
      d.city,
      e.num_connections
      FROM energy_data e
      INNER JOIN data_filter d
      ON e.data_id = d.data_id
      WHERE electric_or_gas = \'Electricity\' 
      AND d.city = @city
      ORDER BY e.annual_consume DESC`;
    const request = new sql.Request();
    request.input('city', sql.VarChar, city);
    console.log("Executing query:", query);
    console.log("With input parameter:", city);
    const result = await request.query(query);
    console.log("Data:", result.recordset);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error); 
    throw new Error("Failed to fetch data: " + error.message);
  }
}

export { fetchAll, fetchCities, findUsername, fetchUserData, fetchAnnualCityEnergy, fetchAnnualNetworkEnergy, fetchUsageSumPerYear, fetchElectricityUsagePerZipcode };
