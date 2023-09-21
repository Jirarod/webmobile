// import pool from "./Database";

// export default async function updateprofileapi(req, res) {
//     if(req.method === "GET")
//     {
//        const [rows, field] = await pool.query("SELECT * FROM product");
//         console.log(rows)
//         res.status(200).json({ rows });


//     }
//     else 
//     {
//         res.status(405).json({message: "404"});
//     }
//     }

// import pool from "./Database";

// export default async function updateprofileapi(req, res) {
//   if (req.method === "GET") {
//     const [rows] = await pool.query("SELECT * FROM product");
//     console.log(rows);

//     const IMGurl = [];



//     for (const row of rows) {

//       const productID = row.PDid;
//       console.log(productID);
      

//       const insertQuery = "SELECT IMGurl FROM imgproduct WHERE IMG_productid = ? LIMIT 1";
      
//         const [rows2] = await pool.query(insertQuery, [productID]);
//         console.log(rows2);
//         IMGurl.push(rows2[0]);



      
//     }
//     console.log(IMGurl);
//     res.status(200).json({ rows: [rows,IMGurl] });
//   } else {
//     res.status(405).json({ message: "404" });
//   }
// }


import pool from "./Database";

export default async function updateprofileapi(req, res) {
  if (req.method === "GET") {
    const [productRows] = await pool.query("SELECT * FROM product WHERE PDstock > 0 ");
    

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
