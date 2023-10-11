import pool from "./Database";

export default async function showproduct(req, res) {
    if (req.method === "POST") {
        // const [productRows] = await pool.query("SELECT * FROM product WHERE PDstock > 0 AND PDcategory = 'อะไหล่มือถือ' ");
        

        // const combinedData = [];

        // for (const productRow of productRows) {
        //     const productID = productRow.PDid;
        

        //     const imgQuery = "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? LIMIT 1";
        //     const [imgRows] = await pool.query(imgQuery, [productID]);
           

        //     combinedData.push({
        //         product: productRow,
        //         IMGurl: imgRows.length > 0 ? imgRows[0] : null
        //     });
        // }

       
        // res.status(200).json({ combinedData });

        const {PDid} = req.body;
        console.log(PDid);
        const [productRows] = await pool.query("SELECT * FROM product WHERE PDid = ? ",[PDid]);


        const imgQuery = "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? ";
        const [imgRows] = await pool.query(imgQuery, [PDid]);
           

   

        res.status(200).json({ productRows,imgRows });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}