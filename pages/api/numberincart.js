import pool from "./Database";

export default async function numberincart(req, res) {
    if (req.method === "POST") {
        const { userID } = req.body;
        const insertQuery =
        "SELECT COUNT(*) as count FROM cart WHERE C_Uid = ? AND C_status = ?";
        const [rows] = await pool.query(insertQuery, [userID,"อยู่ในตระกร้า"]);
     
        res.status(200).json({message:"numbercart" ,rows  });
    } else {
        res.status(405).json({ message: "404" });
    }
    }
