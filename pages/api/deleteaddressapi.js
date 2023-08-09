import pool from "./Database";

export default async function deleteaddressapi (req, res){
       
    if (req.method ==="POST")
    {
       const {id,addressid} = req.body;
       const [rows,field] = await pool.query('DELETE FROM address WHERE ADD_Uid = ? AND ADDid = ?', [id,addressid])
         res.status(200).json({message: 'Address delete'})
         

    }

    }