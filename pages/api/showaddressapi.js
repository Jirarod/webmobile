import pool from "./Database";

export default async function showaddressapi (req, res){
   
    if (req.method ==="POST")
    {
       const {id} = req.body;
       const [rows,field] = await pool.query('SELECT * FROM address WHERE ADD_Uid = ?', [id])
         res.status(200).json({message: 'Address show',rows})
         

    }

    }
