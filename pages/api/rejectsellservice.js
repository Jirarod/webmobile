import pool  from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, status,Uid,brand,model } = req.body;
        const [rows] = await pool.query(
            "UPDATE sellservice SET SSstatus = ? WHERE SSid = ? ",
            [status,id]
        );
        const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
        [Uid,"ยกเลิกรายการ",new Date(),"ยี่ห้อ "+brand+" รุ่น "+model+" ได้ทำการยกเลิกการขาย","ยังไม่ได้อ่าน"])
        
            res.status(201).json({ message: "success send"});
    }
}