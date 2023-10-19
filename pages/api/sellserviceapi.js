import pool from "./Database";

export default async function sellserviceapi(req, res) {
    if (req.method ==="POST")
    {
      
    console.log(req.body);
       const  { Uid,brand,model,problem,price,detail,img1,img2,img3,img4,img5}  = req.body;
         const [rows,field] = await pool.query('INSERT INTO sellservice (SS_Uid,SSbrand,SSmodel,SSproblem,SSprice,SSdetails,SSstatus,SStime,SSimg1,SSimg2,SSimg3,SSimg4,SSimg5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [Uid,brand,model,problem,price,detail,
            "รอการตอบรับ",new Date(),img1,img2,img3,img4,img5])

            const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
            [Uid,"รายการรับซื้อ",new Date(),"ยี่ห้อ "+brand+" รุ่น "+model+" รายละเอียด "+detail+" ปัญหาที่เครื่อง "+problem+" ราคาที่ต้องการ "+price+" รอการตอบรับจากคุณอยู่","ยังไม่ได้อ่าน"])
            res.status(200).json({message: 'sell service success',rows})


           
            
    }
    else
    {
        res.status(405).json({message: 'We only support POST'});
    }

}




