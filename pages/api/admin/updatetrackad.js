import pool from "../Database";

export default async function handle (req, res){
    if(req.method === "POST")
    {
        const {RSid,RS_ad_trackid} = req.body;
       
        const [rows, field] = await pool.query("UPDATE repairservice SET RS_ad_trackid = ? WHERE RSid = ?",[RS_ad_trackid,RSid]);
        console.log(rows)
         res.status(200).json({ message: "success send" ,rows });

    }

}