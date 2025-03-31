import { config } from "./db_config"
import sql from 'mssql';

const fetchUser = async (userName, password) => {

    console.log("The creds are: " + `${userName}` + " " + `${password}`)

    try{
        await sql.connect(config);
        const query = 'SELECT * FROM account WHERE username = @userName AND password = @password';
        const request = new sql.Request();
        request.input('userName', sql.VarChar, `${userName}`);
        request.input('password', sql.VarChar, `${password}`);
        console.log("Executing query:", query);
        console.log("With input parameter:", `${userName}`);
        const result = await request.query(query);
        console.log("Query result:", result.recordset);
        await sql.close();
        return result.recordset;
    }
    catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user: " + error.message);  
    }
}

export { fetchUser };
