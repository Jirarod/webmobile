import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const [rows, field] = await pool.query(
            `SELECT * FROM sellservice where SSstatus IN ("ตรวจสอบแล้ว","อยู่ระหว่างการส่งขาย","ยกเลิกการรับซื้อ","อยู่ระหว่างการส่งกลับ","ยืนยันการขาย","ปฎิเสธการขาย")
        `
        );
        console.log(rows)
        res.status(200).json(rows);
    }
    }
