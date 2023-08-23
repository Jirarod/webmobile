import pool from "../Database";

export default async function updatestatus (req, res){
    if(req.method === "POST"){
        const {RSid,RSstatus,RS_ad_appraise,RS_ad_finishtime,RS_ad_payment} = req.body;
        
        if(RSstatus === "ดำเนินการการซ่อม"){
        const [rows, field] = await pool.query("UPDATE repairservice SET RSstatus = ? ,RS_ad_appraise = ?,RS_ad_finishtime=? WHERE RSid = ?",[RSstatus,RS_ad_appraise,RS_ad_finishtime,RSid]);
        console.log(rows)
         res.status(200).json({ message: "success send" ,rows });
        }

        if(RSstatus === "ซ่อมสำเร็จ"){
            const [rows, field] = await pool.query("UPDATE repairservice SET RSstatus = ? ,RS_ad_appraise = ?,RS_ad_payment=? WHERE RSid = ?",["รอการชำระเงิน",RS_ad_appraise,RS_ad_payment,RSid]);
            console.log(rows)
             res.status(200).json({ message: "success send" ,rows });
            }

        }
        }

    

