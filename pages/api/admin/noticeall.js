import pool from "../Database";

export default async function handler(req, res) {
    if(req.method === "GET")
    {
        const [rows,fileds] = await pool.query("SELECT * FROM notice WHERE Nstatus = 'ยังไม่ได้อ่าน' AND Ntype <> 'ยกเลิกรายการ' ORDER BY Nid DESC");

        const combinedData = [];

        for (const row of rows) {
            const Uid = row.Nuid;
            const [userRows] = await pool.query("SELECT * FROM users WHERE Uid = ? ", [Uid]);

            combinedData.push({ rows:row, user:userRows[0] });
        }

        res.status(200).json({ combinedData });
    }
    else if(req.method === "POST")
    {
        const { Nid } = req.body;
        const [rows,fileds] = await pool.query("UPDATE notice SET Nstatus = 'อ่านแล้ว' WHERE Nid = ? ",[Nid]);
        res.status(200).json({ message: "update status" });
    }
    else
    {
        res.status(405).json({message: "405"});
    }
}
