import pool from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST")
    {
        const {   PDID, UID ,numberproduct} = req.body;

  
        const sql = "INSERT INTO cart (C_Uid,C_PDid,C_status,C_numberproduct) VALUES (?,?,?,?)";
        const [rows] = await pool.query(sql, [UID,PDID,"รอการชำระเงิน",numberproduct]);

        res.status(200).json({ message: "Product added", rows });
        

    }
    else 
    {
        res.status(405).json({ message: "405 Method Not Allowed" });
       
    }
}