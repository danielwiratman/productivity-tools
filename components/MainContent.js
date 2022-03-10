import Card from "./MainContentComponents/Card";
import cardsData from "../data/cardsData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

export default function MainContent() {
    const [datas, setDatas] = useState(cardsData);

    const [winReady, setwinReady] = useState(false);
    useEffect(() => {
        setwinReady(true);
    }, []);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const copiedDatas = [...datas];
        const [removed] = copiedDatas.splice(source.index, 1);
        copiedDatas.splice(destination.index, 0, removed);
        console.log(datas, copiedDatas);
        setDatas(copiedDatas);
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            {winReady ? (
                <DragDropContext
                    onDragEnd={(result) => handleOnDragEnd(result)}
                    className="w-4/5"
                >
                    <Droppable droppableId="droppable1">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-2/5"
                            >
                                {datas.map((data, index) => (
                                    <Draggable
                                        key={data.id.toString()}
                                        draggableId={data.id.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='border-t-transparent border-t-[20px]'
                                            >
                                                <Card data={data} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : null}
        </div>
    );
}
