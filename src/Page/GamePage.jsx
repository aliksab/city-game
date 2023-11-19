import React, { useEffect, useState, useRef } from "react";
import { bot } from "../utils/bot";
import { updateTimer } from "../utils/timer";
import LossPage from "./LossPage";
import WinPage from "./WinPage";
import Progressbar from "../components/Progressbar";
import Input from "../components/Input";
import Header from "../components/Header";

const GamePage = ({ setGame }) => {
    const [timer, setTimer] = useState("02:00");
    const [timerValue, setTimerValue] = useState(120);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [role, setRole] = useState("user");
    const bottomRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTimer({ timerValue, setTimerValue, setTimer, intervalId });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerValue]);

    useEffect(() => {
        setTimerValue(120);
        if (role === "bot") {
            bot({ message, setRole, setMessage });
        }
        if (bottomRef.current !== null) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [role]);

    let finishScreen;
    if (role === "user") {
        finishScreen = <LossPage {...{ message, setGame }} />;
    } else {
        finishScreen = <WinPage {...{ message, setGame }} />;
    }

    return timerValue > 0 ? (
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl">
            <Header>
                <p>{role === "user" ? "Ваш ход" : "Оппонент ходит"}</p>
                <p>{timer}</p>
            </Header>
            <Progressbar timerValue={timerValue} />
            <div className="px-6 h-80 flex ">
                {message.length === 0 ? (
                    <p className="text-gray-400 text-center h-fit self-center mx-auto">
                        Первый участник вспоминает города...
                    </p>
                ) : (
                    <>
                        <ul className="flex flex-col w-full mt-2 overflow-auto">
                            {message.map((el, ind) =>
                                el.owner === "user" ? (
                                    <li
                                        className="ml-auto py-1.5 px-3 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg bg-violet-500 right-0"
                                        key={ind}
                                    >
                                        {el.text}
                                    </li>
                                ) : (
                                    <li
                                        className="mr-auto py-1.5 px-3 rounded-tl-lg rounded-tr-lg rounded-br-lg bg-violet-50 right-0"
                                        key={ind}
                                    >
                                        {el.text}
                                    </li>
                                )
                            )}
                            <div ref={bottomRef}></div>
                        </ul>
                    </>
                )}
            </div>
            <p className="text-sm text-gray-400 text-center">
                Всего перечислено городов: {message.length}
            </p>
            <div className="p-4">
                <Input
                    message={message}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    setMessage={setMessage}
                    setRole={setRole}
                    role={role}
                />
            </div>
        </div>
    ) : (
        finishScreen
    );
};

export default GamePage;
