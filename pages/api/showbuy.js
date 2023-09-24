import pool from "./Database" ;

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        const [rows, field] = await pool.query(
        "SELECT * FROM payment INNER JOIN product ON product.PDid = payment.PAY_PDid LEFT JOIN address ON payment.PAY_ADDid = address.ADDid  WHERE PAY_Uid = ? "
        ,[id]
        );
        res.status(200).json({rows});
    }
    else
    {
        res.status(405).json({message:"Method Not Allow"});

    }
    }
