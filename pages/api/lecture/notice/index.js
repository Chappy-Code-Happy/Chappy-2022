import dbConnect from "../../../../lib/dbConnect"
import Notice from "../../../../models/lecture/Notice"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                const notices = await Notice.find(query);
                res.status(200).json({ success: true, data: notices });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try{
                const newNotice = new Notice(req.body);
                newNotice.save()
                .then(()=> {
                    res.status(200).json({ succes: true })
                })
                .catch((err)=>{
                    res.status(400).json({ success: false, error: err });
                });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
