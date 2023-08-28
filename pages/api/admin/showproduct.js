import pool from "../Database";

export default async function handle (req, res){
    if(req.method === "POST")
    {
       const [rows, field] = await pool.query("SELECT * FROM product");
        console.log(rows)
        res.status(200).json({ rows });


    }

}