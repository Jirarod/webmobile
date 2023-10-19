import pool from "./Database";

export default async function checkoutpayment(req, res) {
    if (req.method === "POST") {
       const {userID,
        addressID,
        img,
        total ,
        data } = req.body;
        for (const product of data) {

            console.log("product",product.product.C_PDid)
            //แสดงจำนวนรอบที่วนfor และแสดงข้อมูลในแต่ละรอบ
          
            //ลบจำนวนสินค้าในตาราง product
            const insertQuery ="SELECT PDstock FROM product WHERE PDid = ?";
            const [PDstock] = await pool.query(insertQuery, [product.product.C_PDid]);
            PDstock[0].PDstock = PDstock[0].PDstock - product.product.C_numberproduct;
            const updateQuery ="UPDATE product SET PDstock = ? WHERE PDid = ?";
            const [rows] = await pool.query(updateQuery, [PDstock[0].PDstock,product.product.C_PDid]);

            //ลบสินค้าในตาราง cart
            const deleteQuery ="DELETE FROM cart WHERE Cid = ?";
            const [rows2] = await pool.query(deleteQuery, [product.product.Cid]);

            //เพิ่มสินค้าในตาราง payment
            const insertQuery2 =
            "INSERT INTO payment (PAY_Uid, PAY_ADDid, PAY_PDid, PAY_numberproduct, PAY_total, PAY_Sliped, PAY_status,PAYtime) VALUES (?, ?, ?, ?, ? + 50, ?, ?,?)";
            const [rows3] = await pool.query(insertQuery2, [userID,addressID,product.product.C_PDid,product.product.C_numberproduct,product.product.PDprice,img,"รอผู้ขายจัดส่ง",new Date()]);
            

            const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
            [userID,"รายการสั่งซื้อ",new Date(),"ได้ทำการสั่งซื้อสินค้า "+product.product.PDname+" จำนวน "+product.product.C_numberproduct+" ชิ้น ราคา "+product.product.PDprice+" บาท รอการตรวจสอบชำระเงินและส่ง","ยังไม่ได้อ่าน"])
           }
        res.status(200).json({message:"checkoutpayment" });
   

    }
    }
