import pool from '../Database'

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { PDid, price, stock } = req.body;

        const [rows, field] = await pool.query(
            "UPDATE product SET PDprice = ?, PDstock = ? WHERE PDid = ?",
            [price, stock, PDid]
        );
        res.status(201).json({ message: "Edit success" });
   
    }
}