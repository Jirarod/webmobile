import e from "cors";
import pool  from "./Database";

export default async function confirmorder (req, res){
       
    if (req.method ==="POST")
    {
       const {selectedProducts} = req.body;
      
       for (const product of selectedProducts) {
        const insertQuery =
        "UPDATE cart SET C_status = ? WHERE Cid = ?";
        const [rows] = await pool.query(insertQuery, ["รอการชำระเงิน",product.Cid]);
       }
        res.status(200).json({message: 'order confirm'})


    }
    else
    {
        res.status(405).json({message: 'Method not allowed'})

    }
    
        }