import pool from "./Database";

export default async function updateaddressapi (req, res){
    if (req.method === "POST") {
        const {id,
            phone,
            name,
            address,
            province,
            district,
            zipcode,
            addressid
      
        } = req.body;
        if(phone)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDphone = ? WHERE ADDid = ? and ADD_Uid = ?",
                [phone,addressid,id]
            );
        }
        if(name)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDname = ? WHERE ADDid = ? and ADD_Uid = ?",
                [name,addressid,id]
            );
        }
        if(address)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDaddress = ? WHERE ADDid = ? and ADD_Uid = ?",
                [address,addressid,id]
            );
        }
        if(province)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDprovince = ? WHERE ADDid = ? and ADD_Uid = ?",
                [province,addressid,id]
            );
        }
        if(district)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDdistrict = ? WHERE ADDid = ? and ADD_Uid = ?",
                [district,addressid,id]
            );
        }
        if(zipcode)
        {
            const [rows, field] = await pool.query(
                "UPDATE address SET ADDzipcode = ? WHERE ADDid = ? and ADD_Uid = ?",
                [zipcode,addressid,id]
            );
        }

        
    
        res.status(201).json({ message: "Address update" });
        console.log("Address update");
    }
    }