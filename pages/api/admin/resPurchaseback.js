import pool from "../Database";
 
export default async function handler(req, res) {
    if (req.method === "POST")
    {

        const { id,status,price,detail} = req.body;
        if(price != null && detail != null || price != "" && detail != "" ){
        const [rows,field] = await pool.query(
            "UPDATE sellservice SET SSstatus = ?,SS_ad_apprise = ?,SS_ad_detail = ? WHERE SSid = ? ",
            [status,price,detail,id]
        );

        }
        
        
        const [rows2,field2] = await pool.query( "UPDATE sellservice SET SSstatus = ? WHERE SSid = ?",[status,id]);
        

        res.status(201).json({ message: "success send"});
      

    }
}