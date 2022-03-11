import { connect } from "../../../utils/database";

export default async (req, res) => {
    const { db } = await connect();
    const {boardIndex, itemIndex} = req.body
    const allitems = await db.collection("cardsData").findOne({boardId: boardIndex})
    const items = allitems.item
    items.splice(itemIndex, 1)

    await db.collection("cardsData").updateOne(
        {boardId:boardIndex}, {
            $set: {
                item: items 
            }
        }
    )


    res.json({})
}