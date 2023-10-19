import pool from "./Database";

export default async function repairserviceapiapi (req, res){
       
    if (req.method ==="POST")
    {
      const status = "รอการตอบรับ"
       const {id,
        barnd,
        model,
        problem} = req.body;
         const [rows,field] = await pool.query('INSERT INTO repairservice (RS_Uid,RSbrand,RSmodel,RSproblem,RSstatus,RStime) VALUES (?,?,?,?,?,?)',
          [id,barnd,model,problem,status,new Date()])


          
          const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
          [id,"รายการซ่อม",new Date(),"ยี่ห้อ "+barnd+" รุ่น "+model+" ปัญหา "+problem+" รอการตอบรับจากคุณอยู่","ยังไม่ได้อ่าน"])
          
  
            res.status(200).json({message: 'Repair service added'})

    }
    else
    {
        res.status(405).json({message: 'We only support POST'});
    }
    

    }

