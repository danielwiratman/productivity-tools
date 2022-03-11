import { connect } from "../../../utils/database";

export default async (req, res) => {
    const { db } = await connect();
    const data = await db.collection("cardsData").find().toArray()
    res.status(200)
    res.json({data: data})
}