import dbConnect from "../../../../lib/dbConnect";

import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch(method) {
        case 'POST':
            try{
                const duplicatedUser = await axios({
                    method: 'get',
                    url: '/api/user/profile',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        'user_id': req.body.user_id,
                    }
                });
                // console.log("============", duplicatedUser.data);

                if (duplicatedUser.data.data.length > 0){
                    return res.status(200).json({success: false, error: "duplicated user exists"});                   
                }

                let userBody = {
                    name: req.body.name,
                    user_id: req.body.user_id,
                    password: req.body.password,
                    email: req.body.email,
                    cell_number: req.body.cell_number,
                    department: req.body.department,
                    semester: req.body.semester,
                    type: req.body.type,
                };

                const user = await axios.post('api/user/profile', {
                    data: userBody
                });

                res.status(200).json({success: true, data: user.data.data });

            } catch (error) {
                console.log(error);
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }

}
