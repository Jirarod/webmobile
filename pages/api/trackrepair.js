import pool from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { Uid,status,RSid,trackid,slipedimg,brand,
            model } = req.body;
       
         
        if(status ==="อยู่ระหว่างการส่งซ่อม")
        {
            console.log(status,RSid,trackid);
            const [rows,fileds] = await pool.query("UPDATE repairservice SET RSstatus = ? , RStrackid = ? WHERE repairservice.RSid= ? ",
            [status,trackid,RSid]);

            const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
            [Uid,"รายการซ่อม",new Date(),"ยี่ห้อ "+brand+" รุ่น "+model+" ได้ทำการส่งเครื่องซ่อม มีรหัสพัสดุคือ "+trackid,"ยังไม่ได้อ่าน"])

            
         
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

            const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
            [Uid,"รายการซ่อม",new Date(),"ยี่ห้อ "+brand+" รุ่น "+model+" ได้ทำการส่งหลักฐานการโอนเงินแล้ว","ยังไม่ได้อ่าน"])
            


         
            res.status(200).json({ message: "update status" });

        }


    }
}
