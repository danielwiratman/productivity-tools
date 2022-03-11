import { connect } from "../../../utils/database";

export default async (req, res) => {
    const { db } = await connect();
    const { data, srcBoardIndex, srcItemIndex, destBoardIndex, destItemIndex } =
        req.body;

    const allitems = await db
        .collection("cardsData")
        .findOne({ boardId: srcBoardIndex.toString() });
    const items = allitems.item;
    items.splice(srcItemIndex, 1);

    await db.collection("cardsData").updateOne(
        { boardId: srcBoardIndex.toString() },
        {
            $set: {
                item: items,
            },
        }
    );

    const { id, title, description } = data;

    const result = await db.collection("cardsData").updateOne(
        { boardId: destBoardIndex.toString() },
        {
            $push: {
                item: { id: id, title: title, description: description },
            },
        }
    );

    res.json({});
};
