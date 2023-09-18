import pool from "./Database";

export default async function addincart(req, res) {
    if (req.method === "POST") {
        const { productID, userID } = req.body;
        const insertQuery =
        "INSERT INTO cart (C_PDid,C_Uid,C_status,C_numberproduct) VALUES (?,?,?,?)";
        const [rows] = await pool.query(insertQuery, [productID, userID,"อยู่ในตระกร้า",1]);
        res.status(200).json({message:"Product added", rows });
    } else {
        res.status(405).json({ message: "404" });
    }
    }
