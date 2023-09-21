import pool from "./Database";

export default async function itemincart(req, res) {
    if (req.method === "POST") {
        const { userID } = req.body;
        const insertQuery = `
  SELECT * FROM cart
  INNER JOIN product ON cart.C_PDid = product.PDid
  WHERE C_Uid = ? AND C_status IN ('อยู่ในตระกร้า', 'รอการชำระเงิน')
`;
        const [rows] = await pool.query(insertQuery, [userID]);

        const combinedData = [];

        for (const productRow of rows) {
          const productID = productRow.PDid;
       
    
          const imgQuery = "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? LIMIT 1";
          const [imgRows] = await pool.query(imgQuery, [productID]);
         
    
          combinedData.push({
            product: productRow,
            IMGurl: imgRows.length > 0 ? imgRows[0] : null
          });
        }
    
       
        res.status(200).json({message:"itemincart" , combinedData });
    } else {
        res.status(405).json({ message: "404" });
    }
    }
