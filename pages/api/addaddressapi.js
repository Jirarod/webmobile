import pool from "./Database";

export default async function AddAddressapi (req, res){
    if (req.method === "POST") {
        const {id,
            phone,
            name,
            address,
            province,
            district,
            zipcode
      
        } = req.body;
        const [rows, field] = await pool.query(
        "INSERT INTO address (ADD_Uid,ADDname,ADDphone,ADDprovince,ADDdistrict,ADDzipcode,ADDaddress) VALUES (?,?,?,?,?,?,?)",
        [id,name,phone,province,district,zipcode,address]
        );
    
        res.status(201).json({ message: "Address added" });
        console.log("Address added");
    }
    }