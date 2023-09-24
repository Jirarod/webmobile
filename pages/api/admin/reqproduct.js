import pool from "../Database";

export default async function reqproduct(req, res) {
    if (req.method === "GET") {
        const [rows] = await pool.query("SELECT DISTINCT users.Uid,users.Uname,users.Uemail,users.Uimage FROM users JOIN payment ON users.Uid = payment.PAY_Uid WHERE payment.PAY_status = 'รอผู้ขายจัดส่ง'");

       

        const combinedData = [];

        for (const userRow of rows) {
          const userID = userRow.Uid;

       
          const insertQuery = "SELECT * FROM payment JOIN product ON product.PDid = payment.PAY_PDid WHERE PAY_Uid = ? AND PAY_status = 'รอผู้ขายจัดส่ง'";
          const [paymentRows] = await pool.query(insertQuery, [userID]);
     
          const insertQuery2 = "SELECT * FROM address WHERE ADDid = ? ";
          const [addressRows] = await pool.query(insertQuery2, [paymentRows[0].PAY_ADDid]);
     
          combinedData.push({
            user: userRow,
            payment: paymentRows,
            address: addressRows
          });

        }
        res.status(200).json({message:"reqPurchase" , combinedData });



        

   
    } else {
        res.status(405).json({ message: "404" });
    }
    }

