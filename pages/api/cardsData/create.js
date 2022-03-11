import { connect } from "../../../utils/database";

export default async (req, res) => {
    const { db } = await connect();
    const { id, title, description } = req.body.entry;
    const boardId = req.body.boardId;

    const boardExist = await db
        .collection("cardsData")
        .findOne({ boardId: boardId }, { _id: 1 });

    if (!boardExist) {
        console.log("Board doesn't exist yet, let me create it first.");
        const result = await db.collection("cardsData").insertOne({
            boardId: boardId,
            item: [
                {
                    id: id,
                    title: title,
                    description: description,
                },
            ],
        });
    } else {
        const result = await db.collection("cardsData").updateOne(
            { boardId: boardId },
            {
                $push: {
                    item: { id: id, title: title, description: description },
                },
            }
        );
    }
    console.log("SUCCESS ADD TO DB");
    res.json({});
};
