import pool from "../Database";

export default async function updatesale(req, res) {
    if (req.method === "POST") {
        const { payment,image ,status } = req.body;

        console.log(payment.PAYid,image,status)

        for (const paymentRow of payment) {
            const PAYid = paymentRow.PAYid;
            console.log(PAYid)
       const insertQuery = "UPDATE payment SET PAY_admin_track = ? , PAY_status = ? ,PAY_admin_times = ? WHERE PAYid = ?";
        const [rows] = await pool.query(insertQuery, [image,status,new Date(),PAYid]);
        }
       res.status(200).json({ message: "update success" });
    

    } else {
        res.status(405).json({ message: "405 Method Not Allowed" });
    }
}