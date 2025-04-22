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

const fetchNetworks = async () => {
  try {
    // console.log("Executing query:", query);
    // console.log("Query result:", result.recordset);
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

const fetchUsersInPages = async (page = 1, pageSize = 20) => {
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


const insertNewUser = async (email, f_name, l_name, password, account_type_id, network_filter_id, city_filter_id) => {
  try {
    await sql.connect(config);
    const query = `

      INSERT INTO dbo.account (email, f_name, l_name, username, password, account_type_id, network_filter_id, city_filter_id)
      VALUES (@Email, @FName, @LName, @Username, @Password, @AccountTypeId, @NetworkFilterId, @CityFilterId);
      SELECT SCOPE_IDENTITY() AS account_id;
    `;
    // SCOPE_IDENTITY() is used to get the last inserted identity value (account_id)
    // this is needed to create the username as account_id is needed
    const request = new sql.Request();

    // Generate a temporary username (will be updated after retrieving account_id)
    const tempUsername = `${f_name}${l_name}TEMP`;

    request.input('Email', sql.NVarChar, email);
    request.input('FName', sql.NVarChar, f_name);
    request.input('LName', sql.NVarChar, l_name);
    request.input('Username', sql.NVarChar, tempUsername);
    request.input('Password', sql.NVarChar, password);
    request.input('AccountTypeId', sql.Int, account_type_id);
    request.input('NetworkFilterId', sql.Int, network_filter_id || null);
    request.input('CityFilterId', sql.Int, city_filter_id || null);

    const result = await request.query(query);
    const newAccountId = result.recordset[0].account_id;

    // Generate the final username using the retrieved account_id
    const finalUsername = `${f_name}${l_name}${newAccountId}`;

    // Update the username in the database
    const updateQuery = `
      UPDATE dbo.account
      SET username = @FinalUsername
      WHERE account_id = @AccountId;
    `;
    const updateRequest = new sql.Request();
    updateRequest.input('FinalUsername', sql.NVarChar, finalUsername);
    updateRequest.input('AccountId', sql.Int, newAccountId);
    await updateRequest.query(updateQuery);

    await sql.close();
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add user: " + error.message);
  }
};

const modifyUser = async (account_id, email, f_name, l_name, password) => {
  try {
    await sql.connect(config);
    const query = `
      UPDATE dbo.account
      SET email = @Email,
          f_name = @FName,
          l_name = @LName,
          password = @Password
      WHERE account_id = @AccountId;
    `;
    const request = new sql.Request();
    request.input('AccountId', sql.Int, account_id);
    request.input('Email', sql.NVarChar, email);
    request.input('FName', sql.NVarChar, f_name);
    request.input('LName', sql.NVarChar, l_name);
    request.input('Password', sql.NVarChar, password);
    await request.query(query);
    await sql.close();
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to modify user: " + error.message);
  }
};


const deleteUser = async (userId) => {
  try {
    await sql.connect(config);
    const query = `
      DELETE FROM dbo.account
      WHERE account_id = @UserId;
    `;
    const request = new sql.Request();
    request.input('UserId', sql.Int, userId);

    await request.query(query);
    await sql.close();
    return { success: true };
  }
  catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete user: " + error.message);
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

const fetchUsageSumPerYear = async (city_filter_id) => {
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
  } else {
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

const fetchAllNotif = async () => {
  try{
    const pool =await sql.connect(config);
    const result = await pool.request().query(
      'select n.notif_id, n.target_account_id, a.f_name, n.type, n.from_account_id, b.f_name, n.detail, n.resource, n.isRead, n.time from notification n inner join account a on a.account_id = n.target_account_id inner join account b on b.account_id = n.from_account_id order by n.time desc;'
    );
    return result.recordset;
  }catch (err) {
    console.error('database query error:', err);
    return[];
  }
}

const markAsRead = async (notif_id) => {
  try{
    const pool =await sql.connect(config);
    const result = await pool
      .request()
      .input('notif_id', sql.Int, notif_id)
      .query(`Update notification set isRead = 1 where notif_id=@notif_id`);

    console.log('Notification marked as read')
    return {success: true};
  }catch (err) {
    console.error('Error marking as read:', err);
    return {success: false};
  }
};

export {
  fetchAll, fetchCities, fetchAnnualFilteredEnergy, fetchFilteredEnergyData, findUsername, fetchUserData, fetchNetworks,
  fetchAnnualCityEnergy, fetchAnnualNetworkEnergy, fetchDoubleFilteredData, fetchUsageSumPerYear, fetchElectricityUsagePerZipcode,
  fetchUsersInPages, fetchAllUserFilterIds, findUsers, insertNewUser, modifyUser, deleteUser
  fetchAllUsersInPages, totalUsersCount, fetchAllUserFilterIds, findUsers, insertNewUser, fetchAllNotif, markAsRead, modifyUser, deleteUser
}