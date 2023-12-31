import pool from "./Database";

export default async function checkoutshow(req, res) {
    if (req.method === "POST") {
        const { userID } = req.body;
        const insertQuery =
        "SELECT * FROM cart INNER JOIN product ON cart.C_PDid = product.PDid WHERE C_Uid = ? AND C_status = ?";
        const [rows] = await pool.query(insertQuery, [userID, "รอการชำระเงิน"]);
    
        const combinedData = [];
    
        for (const productRow of rows) {
        const productID = productRow.PDid;
    
        const imgQuery =
            "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? LIMIT 1";
        const [imgRows] = await pool.query(imgQuery, [productID]);
    
        combinedData.push({
            product: productRow,
            IMGurl: imgRows.length > 0 ? imgRows[0] : null,
        });
        }
    
        res.status(200).json({ message: "itemcheckout", combinedData });
    } else {
        res.status(405).json({ message: "404" });
    }
    }