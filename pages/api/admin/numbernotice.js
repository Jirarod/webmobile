import pool from "../Database";

export default async function numbernotice(req, res) {
    if(req.method === "GET")
    {
       //นับจำนวน notice ทั้งหมด ที่ยังไม่ได้อ่าน
         const [rows, field] = await pool.query("SELECT COUNT(*) AS count FROM notice WHERE Nstatus = 'ยังไม่ได้อ่าน'");

        res.status(200).json({ rows });
    }
    else
    {
        res.status(405).json({message: "405"});
    }
}