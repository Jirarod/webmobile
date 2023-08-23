import pool from "../Database";

export default async function resrepairback (req, res){
    if (req.method === "POST") {
        const {RSid,RSstatus,RS_ad_appraise,RS_ad_detail} = req.body;
        const [rows, field] = await pool.query("UPDATE repairservice SET RSstatus = ?,RS_ad_appraise = ?,RS_ad_details = ? WHERE RSid = ?",[RSstatus,RS_ad_appraise,RS_ad_detail,RSid]);
        console.log(rows)
         res.status(200).json({ message: "success send" ,rows });    
}
}