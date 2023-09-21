import pool from "./Database";

export default async function delincart (req, res){
       
    if (req.method ==="POST")
    {
       const {Cid} = req.body;
       const [rows,field] = await pool.query('DELETE FROM cart WHERE Cid = ? ',
        [Cid])
         res.status(200).json({message: 'Product delete'})
         

    }

    }
