import pool from "./Database";

export default async function sellserviceapi(req, res) {
    if (req.method ==="POST")
    {
      
    console.log(req.body);
       const  { Uid,brand,model,problem,price,detail,img1,img2,img3,img4,img5}  = req.body;
         const [rows,field] = await pool.query('INSERT INTO sellservice (SS_Uid,SSbrand,SSmodel,SSproblem,SSprice,SSdetails,SSstatus,SSimg1,SSimg2,SSimg3,SSimg4,SSimg5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [Uid,brand,model,problem,price,detail,
            "รอการตอบรับ",img1,img2,img3,img4,img5])
            res.status(200).json({message: 'sell service success',rows})
    }

}




