import pool from "./Database";

export default async function numberincart(req, res) {
    if (req.method === "POST") {
        const { userID } = req.body;
        const insertQuery =`
        SELECT 
          COUNT(*) AS count 
        FROM 
          cart 
        WHERE 
          C_Uid = ? 
          AND (C_status = 'อยู่ในตระกร้า' OR C_status = 'รอการชำระเงิน')
      `;
        const [rows] = await pool.query(insertQuery, [userID]);
     
        res.status(200).json({message:"numbercart" ,rows  });
    } else {
        res.status(405).json({ message: "404" });
    }
    }

