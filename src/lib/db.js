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

const fetchNetworks = async () => {
  try {
    await sql.connect(config);
    const query = 'SELECT* FROM network_has_id';
    const request = new sql.Request();
    console.log("Executing query:", query);
    const result = await request.query(query);
    console.log("Query result:", result.recordset);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch networks: " + error.message);
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

const fetchElectricityUsagePerZipcode = async (city) => {
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

export {
  fetchAll, fetchCities, fetchNetworks,
  fetchUsageSumPerYear, fetchElectricityUsagePerZipcode
};
