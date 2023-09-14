import pool from "../Database";
 
export default async function handler(req, res) {
    if (req.method === "POST")
    {

        const { id,status,price,detail,slip} = req.body;
       
        const [rows,field] = await pool.query(
            "UPDATE sellservice SET SSstatus = ?,SS_ad_apprise = ?,SS_ad_detail = ? WHERE SSid = ? ",
            [status,price,detail,id]
        );
         
        
     res.status(201).json({ message: "success send"});

        

    
      

    }
    
}