import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST")
    {
        const { url ,productid} = req.body;
        const [rows,field] = await pool.query(
            "INSERT INTO imgproduct (IMGurl, IMG_productid) VALUES (?, ?) ",
            [url, productid]
        );

        res.status(201).json({ message: "success send"});
      

    }
}

        