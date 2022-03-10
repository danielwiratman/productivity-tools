import cardsData from "../data/cardsDataV2.json";
import Card from "./MainContentV2/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

export default function MainContent() {
    const [winReady, setWinReady] = useState(false);
    const [data, setData] = useState(cardsData);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);

    function handleOnDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;
        const copiedData = [...data];
        const [removed] = copiedData[source.droppableId].items.splice(
            source.index,
            1
        );
        copiedData[destination.droppableId].items.splice(
            destination.index,
            0,
            removed
        );
        setData(copiedData);
    }

    function handleNewEntry(e) {
        if (e.keyCode === 13) {
            const val = e.target.value;
            if (val.length === 0) {
                setShowForm(false);
            } else {
                const boardId = e.target.attributes["data-id"].value;

                const today = new Date();
                const date =
                    today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getDate() +
                    "   " +
                    (today.getHours() <= 9
                        ? "0" + today.getHours()
                        : today.getHours()) +
                    ":" +
                    (today.getMinutes() <= 9
                        ? "0" + today.getMinutes()
                        : today.getMinutes());

                const item = {
                    id: uuidv4(),
                    title: val,
                    description: e.target.nextElementSibling.value,
                };
                const newData = [...data];
                newData[boardId].items.push(item);
                setData(newData);
                setShowForm(false);
                e.target.value = "";
            }
        }
    }

    useEffect(() => {
        setWinReady(true);
    }, []);

    return winReady ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div
                className="bg-red-200 h-full w-full flex justify-around flex-wrap"
                id="hello"
            >
                {data.map((board, boardIndex) => (
                    <div key={board.name}>
                        <Droppable droppableId={boardIndex.toString()}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className=" px-5 w-[350px] my-3 min-h-[50px]">
                                        {board.items.map((item, itemIndex) => (
                                            <Draggable
                                                key={item.id.toString()}
                                                draggableId={item.id.toString()}
                                                index={itemIndex}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="border-y-transparent border-y-[10px]"
                                                    >
                                                        <div className="select-none p-5 shadow-lg bg-white border-t-4 border-t-slate-800 rounded-md">
                                                            <h1 className="font-bold text-2xl">
                                                                {item.title}
                                                            </h1>
                                                            <hr className="mt-2 mb-1" />
                                                            <p className="">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <div>
                                            {showForm &&
                                            selectedBoard === boardIndex ? (
                                                <div>
                                                    <textarea
                                                        data-id={boardIndex}
                                                        placeholder="New Task"
                                                        rows={1}
                                                        onKeyDown={(e) =>
                                                            handleNewEntry(e)
                                                        }
                                                        className="bg-white block mx-auto w-4/5 mb-3 mt-5 p-3 resize-none"
                                                    />
                                                    <textarea
                                                        rows={4}
                                                        className="bg-white block mx-auto w-4/5 mb-3 mt-[-12px] border-t-2 border-gray-200 p-3 resize-none"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            const ele =
                                                                e.target
                                                                    .previousElementSibling
                                                                    .previousElementSibling;
                                                            const val =
                                                                ele.value;
                                                            if (
                                                                val.length === 0
                                                            ) {
                                                                setShowForm(
                                                                    false
                                                                );
                                                            } else {
                                                                const boardId =
                                                                    ele
                                                                        .attributes[
                                                                        "data-id"
                                                                    ].value;

                                                                const today =
                                                                    new Date();
                                                                const date =
                                                                    today.getFullYear() +
                                                                    "-" +
                                                                    (today.getMonth() +
                                                                        1) +
                                                                    "-" +
                                                                    today.getDate() +
                                                                    "   " +
                                                                    (today.getHours() <=
                                                                    9
                                                                        ? "0" +
                                                                          today.getHours()
                                                                        : today.getHours()) +
                                                                    ":" +
                                                                    (today.getMinutes() <=
                                                                    9
                                                                        ? "0" +
                                                                          today.getMinutes()
                                                                        : today.getMinutes());

                                                                const item = {
                                                                    id: uuidv4(),
                                                                    title: val,
                                                                    description:
                                                                        ele
                                                                            .nextElementSibling
                                                                            .value,
                                                                };
                                                                const newData =
                                                                    [...data];
                                                                newData[
                                                                    boardId
                                                                ].items.push(
                                                                    item
                                                                );
                                                                setData(
                                                                    newData
                                                                );
                                                                setShowForm(
                                                                    false
                                                                );
                                                                ele.value = "";
                                                            }
                                                        }}
                                                        data-id={boardIndex}
                                                        className="font-semibold hover:bg-slate-100 transition-colors duration-100 border-t-2 border-gray-200 bg-white block mx-auto w-4/5 mb-3 mt-[-12px] p-3"
                                                    >
                                                        Add New (+)
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setSelectedBoard(
                                                            boardIndex
                                                        );
                                                        setShowForm(true);
                                                    }}
                                                    className="block mx-auto mb-3 mt-5 transition-colors duration-100 hover:bg-slate-100 w-4/5 bg-white p-3"
                                                >
                                                    <span className="font-semibold">
                                                        Add New (+)
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    ) : null;
}