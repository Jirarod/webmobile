import pool from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { status,RSid,trackid,slipedimg } = req.body;
       
         
        if(status ==="อยู่ระหว่างการส่งซ่อม")
        {
            console.log(status,RSid,trackid);
            const [rows,fileds] = await pool.query("UPDATE repairservice SET RSstatus = ? , RStrackid = ? WHERE repairservice.RSid= ? ",
            [status,trackid,RSid]);
         
            res.status(200).json({ message: "update status" });

        }
        else if(status ==="ลบรายการซ่อม")
        {
            const [rows,fileds] = await pool.query("DELETE FROM repairservice WHERE RSid = ? ",
            [RSid]);
            res.status(200).json({ message: "delete status" });

        }
        else if(status ==="รอการตรวจสอบ")
        {
            const [rows,fileds] = await pool.query("UPDATE repairservice SET RSstatus = ? , RSsliped = ? WHERE repairservice.RSid= ? ",
            [status,slipedimg,RSid]);


         
            res.status(200).json({ message: "update status" });

        }


    }
}
