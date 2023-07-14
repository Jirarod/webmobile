import mysql from 'mysql2/promise';

const pool = mysql.createPool({
connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
});
 if(pool){
        console.log('connected');
 }
 else{
        console.log('not connected');
    }

export default pool;