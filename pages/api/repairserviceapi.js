import pool from "./Database";

export default async function repairserviceapiapi (req, res){
       
    if (req.method ==="POST")
    {
       const {id,
        barnd,
        model,
        problem} = req.body;
         const [rows,field] = await pool.query('INSERT INTO repairservice (RS_Uid,RSbrand,RSmodel,RSproblem) VALUES (?,?,?,?)',
          [id,barnd,model,problem])
            res.status(200).json({message: 'Repair service added'})
    }


    }

    
