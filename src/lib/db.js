import sql from 'mssql';
import { config } from '@/lib/db_config';

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


const fetchCities = async (searchString) => {
  try {
    await sql.connect(config);
    const query = `
      SELECT TOP (100) *
      FROM city_has_id
      WHERE city LIKE @searchString
    `;
    const request = new sql.Request();
    request.input('searchString', sql.VarChar, `%${searchString}%`);
    const result = await request.query(query);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cities: " + error.message);
  }
}

const fetchCity = async (cityFilterId) => {
  if (!cityFilterId) {
    throw new Error("City filter ID is required");
  }
  try {
    await sql.connect(config);
    const query = `
      SELECT city, city_filter_id
      FROM city_has_id
      WHERE city_filter_id = @cityFilterId`;
    const request = new sql.Request();
    request.input('cityFilterId', sql.Int, cityFilterId);
    console.log("Fetching city with ID:", cityFilterId);
    const result = await request.query(query);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch city: " + error.message);
  }
}

const fetchNetworks = async () => {
  try {
    // console.log("Executing query:", query);
    // console.log("Query result:", result.recordset);
    await sql.connect(config);
    const query = 'SELECT TOP (1000) * FROM network_has_id';
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
    const skipRows = (page - 1) * pageSize;
    await sql.connect(config);
    const query = `
      SELECT *
      FROM dbo.account
      ORDER BY account_id
      OFFSET @offset ROWS 
      FETCH NEXT @pageSize ROWS ONLY;
    `;
    // Offset is used to skip the first n accounts/rows
    // -- Alowing pagination
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM dbo.account;
    `;
    const request = new sql.Request();
    request.input('offset', sql.Int, skipRows);
    request.input('pageSize', sql.Int, pageSize);

    const [usersResult, countResult] = await Promise.all([
      request.query(query),
      sql.query(countQuery),
    ]);

    const totalUsers = countResult.recordset[0].total;
    const totalPages = Math.ceil(totalUsers / pageSize);

    await sql.close();
    return { users: usersResult.recordset, totalPages };

  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users: " + error.message);
  }
};

const findUsers = async (userInput) => {
  try {
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


const insertNewUser = async (email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id) => {
  try {
    await sql.connect(config);
    const query = `
      INSERT INTO dbo.account (email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id)
      VALUES (@Email, @FName, @LName, @Username, @Password, @AccountTypeId, @NetworkFilterId, @CityFilterId);
    `;
    const request = new sql.Request();
    request.input('Email', sql.NVarChar, email);
    request.input('FName', sql.NVarChar, f_name);
    request.input('LName', sql.NVarChar, l_name);
    request.input('Username', sql.NVarChar, username);
    request.input('Password', sql.NVarChar, password);
    request.input('AccountTypeId', sql.Int, account_type_id);
    request.input('NetworkFilterId', sql.Int, network_filter_id || null);
    request.input('CityFilterId', sql.Int, city_filter_id || null);

    await request.query(query);
    await sql.close();
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: 'Failed to add user', details: error.message });
  }
};

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
};


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
          `+ filterString + `
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
        `+ filterString + `
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
          (d.city = '`+ city + `' and d.net_manager = '` + net_manager + `')
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

const fetchUsageSumPerYear = async (city_filter_id, network_filter_id) => {
  if (city_filter_id) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.year,
          e.electric_or_gas,
          ROUND(SUM(e.annual_consume),3) AS total_annual_consume,
          d.city,
          ROUND(AVG(e.delivery_perc),2) AS total_delivery_perc,
          ROUND(AVG(e.annual_consume_lowtarif_perc),2) AS total_annual_consume_lowtarif_perc,
          c.city_filter_id
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        INNER JOIN
          city_has_id c
        ON
          (d.city = c.city)
        WHERE
          (c.city_filter_id = @city_filter_id)
        GROUP BY 
          e.year, e.electric_or_gas, d.city, c.city_filter_id
        ORDER BY 
          e.year, e.electric_or_gas;
      `;
      const request = new sql.Request();
      request.input('city_filter_id', sql.Int, city_filter_id);
      const result = await request.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch usage data: " + error.message);
    }
  } else if (network_filter_id) {
    try {
      await sql.connect(config);
      const query = `
        SELECT
          e.year,
          e.electric_or_gas,
          ROUND(SUM(e.annual_consume),3) AS total_annual_consume,
          d.city,
          ROUND(AVG(e.delivery_perc),2) AS total_delivery_perc,
          ROUND(AVG(e.annual_consume_lowtarif_perc),2) AS total_annual_consume_lowtarif_perc,
          c.network_filter_id
        FROM
          dbo.energy_data e
        INNER JOIN
          data_filter d
        ON
          (e.data_id = d.data_id)
        INNER JOIN
          network_has_id c
        ON
          (d.net_manager = c.net_manager)
        WHERE
          (c.network_filter_id = @network_filter_id)
        GROUP BY 
          e.year, e.electric_or_gas, d.city, c.network_filter_id
        ORDER BY 
          e.year, e.electric_or_gas;
      `;
      const request = new sql.Request();
      request.input('network_filter_id', sql.Int, network_filter_id);
      const result = await request.query(query);
      await sql.close();
      return result.recordset;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch usage data: " + error.message);
    }
  }
  
  else {
    throw new Error("City filter ID not detected. Please provide a valid ID.");
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

export {
  fetchAll, fetchCities, fetchCity, fetchAnnualFilteredEnergy, fetchFilteredEnergyData, findUsername, fetchUserData, fetchNetworks,
  fetchAnnualCityEnergy, fetchAnnualNetworkEnergy, fetchDoubleFilteredData, fetchUsageSumPerYear, fetchElectricityUsagePerZipcode,
  fetchAllUsersInPages, fetchAllUserFilterIds, findUsers, insertNewUser
}