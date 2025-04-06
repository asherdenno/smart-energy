import { NextWeek } from '@mui/icons-material';
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
    const result = await request.query(query);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cities: " + error.message);
  }
}

const fetchNetworks = async () => {
  try {
    // await sql.connect(config);
    // const query = 'SELECT* FROM network_has_id';
    // const request = new sql.Request();
    // console.log("Executing query:", query);
    // const result = await request.query(query);
    // console.log("Query result:", result.recordset);
    // await sql.close();
    // return result.recordset;
    await sql.connect(config);
    const query = 'SELECT TOP (20) * FROM network_has_id';
    const result = await sql.query(query);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch networks: " + error.message);
  }
}

const fetchAllUserFilterIds = async () => {
  try {
    await sql.connect(config);
    const query = `
      SELECT user_filter_id, user_name
      FROM users
     `;
    const request = new sql.Request();
    console.log("Executing query:", query);
    const result = await request.query(query);
    console.log("Query result:", result.recordset);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch networks and city id: " + error.message);
  }
}

const fetchAllUsersInPages = async (page = 1, pageSize = 20) => {
  try {
    skipRows = (page - 1) * pageSize;
    await sql.connect(config);
    const query = `
      SELECT *
      FROM users
      ORDER BY user_id
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY;
    `;
    await sql.connect(config);
    const request = new sql.Request();
    request.input('offset', sql.Int, offset);
    request.input('pageSize', sql.Int, pageSize);
    console.log(`Fetching page ${page} with page size ${pageSize}`);
    const result = await request.query(query);
    console.log("Query result:", result.recordset);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users: " + error.message);
  }
}

const countTotalUsers = async () => {
  try {
    await sql.connect(config);
    const query = `
      SELECT COUNT(*) AS total
      FROM users;
    `;
    const result = await sql.query(query);
    await sql.close();
    return result.recordset[0].total; // Return the total count of users
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to count total users: " + error.message);
  }
};

const findUsers = async (userInput) => {
  try{
    await sql.connect(config);
    const query = `
      SELECT (TOP 20) user_id, user_name
      FROM users
      WHERE user_name LIKE @userInput;
    `;
    const request = new sql.Request();
    request.input('userInput', sql.VarChar, `%${userInput}%`);
    console.log("Executing query:", query);
    const result = await request.query(query);
    console.log("Query result:", result.recordset);
    await sql.close();
    return result.recordset;
  }
  catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users: " + error.message);
  }
}

//account type 0 = admin  1 = city council 2 = network manager
// const account_id = 2;
const findUsername = async () => {
  if (usernameInput) {
    try {
      await sql.connect(config);
      const query = `
        SELECT account_id FROM account where username = `+ usernameInput + `;
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
        SELECT * FROM account where account_id = `+ account_id + ` AND password = ` + `;
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

const fetchAnnualFilteredEnergy = async (filterString) => {
  if (filterString) {
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
          `+filterString+`
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
const fetchFilteredEnergyData = async (filterString) => {
  if (filterString) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.*,
          d.net_manager,
          d.city
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        WHERE
        `+filterString+`
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

// const fetchFilteredEnergyData = async (filterString) => {
//   if (filterString) {
//     try {
//       await sql.connect(config);
//       const query = `
//         SELECT
//           e.*,
//           d.net_manager,
//           d.city
//         FROM
//           dbo.energy_data e
//         INNER JOIN
//           data_filter d
//         ON
//           (e.data_id = d.data_id)
//         WHERE
//           `+filterString+`
//         ORDER BY 
//           e.year, e.electric_or_gas;
//       `;
//       const request = new sql.Request();
//       request.input('filterString', sql.VarChar, `%${filterString}%`);
//       console.log("FilterString:", filterString);
//       console.log("Executing query:", query);
//       const result = await request.query(query);
//       console.log("Query result:", result.recordset);
//       await sql.close();
//       return result.recordset;
//     } catch (error) {
//       console.error("Database Error:", error);
//       throw new Error("Failed to fetch usage data: " + error.message);
//     }
//   } else {
//     throw new Error("Filtering by city is not yet implemented");
//   }
// }

const fetchAnnualNetworkEnergy = async (userNetwork) => {
  if (userNetwork) {
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
          (d.net_manager = '`+ userNetwork + `')
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
  if (userCity) {
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
          (d.city = '`+ userCity + `')
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

const fetchDoubleFilteredData = async (net_manager, city) => {
  if (net_manager, city) {
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
          (d.city = '`+city+`' and d.net_manager = '`+net_manager+`')
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

const fetchElectricityUsagePerZipcode = async (city) => {
  try {
    await sql.connect(config);
    const query =
      `SELECT TOP(5000) e.zipcode_from,
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

export { fetchAll, fetchCities, fetchAnnualFilteredEnergy, fetchFilteredEnergyData, findUsername, fetchUserData, fetchNetworks,
  fetchAnnualCityEnergy, fetchAnnualNetworkEnergy, fetchDoubleFilteredData, fetchUsageSumPerYear, fetchElectricityUsagePerZipcode
};
