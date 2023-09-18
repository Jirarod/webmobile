import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST")
    {
        const { name, price, detail, category,stock } = req.body;
        //INSERT INTO product (name, price, detail, category) VALUES (?, ?, ?, ?);
       // SELECT * FROM product WHERE id = LAST_INSERT_ID();
         
        const newProduct = await pool.query(
            "INSERT INTO product (PDname, PDprice, PDdetails, PDcategory,PDdate,PDstock) VALUES (?, ?,?, ?, ?,?) ",
            [name, price, detail, category,new Date()]
        );
        const [rows, field]= await pool.query(
            "SELECT * FROM product WHERE PDid = LAST_INSERT_ID()"
          );

       
        res.status(201).json({ message: "success send", rows });

    
    }
}