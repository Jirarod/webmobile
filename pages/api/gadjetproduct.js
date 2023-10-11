import pool from "./Database";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const [productRows] = await pool.query("SELECT * FROM product WHERE PDstock > 0 AND PDcategory = 'อุปกรณ์เสริม' ");
    

    const combinedData = [];

    for (const productRow of productRows) {
      const productID = productRow.PDid;
   

      const imgQuery = "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? LIMIT 1";
      const [imgRows] = await pool.query(imgQuery, [productID]);
     

      combinedData.push({
        product: productRow,
        IMGurl: imgRows.length > 0 ? imgRows[0] : null
      });
    }

   
    res.status(200).json({ combinedData });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
