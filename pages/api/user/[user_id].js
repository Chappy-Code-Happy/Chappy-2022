/** /pages/api/lecture/[id].js **/
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/User"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(req.query.user_id);

                res.status(200).json({ success: true, user: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const user = await User.findById(req.query.user_id);

                await User.findByIdAndUpdate(req.query.user_id, req.body);

                res.status(200).json({ success: true });
                
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                const user = await User.findById(req.query.user_id);

                await User.findByIdAndDelete(req.query.user_id);
                
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}