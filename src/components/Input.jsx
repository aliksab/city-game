import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cities } from "../data/cities";

const Input = ({
    message,
    newMessage,
    setNewMessage,
    setMessage,
    setRole,
    role
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ mode: "onBlur" });

    useEffect(() => {
        if (role === "bot") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [role]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddMessage();
        }
    };

    function getLastWord(messages, iswrong) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.text) {
            if (iswrong) {
                return lastMessage.text.slice(-2, -1).toUpperCase();
            } else {
                return lastMessage.text.slice(-1).toUpperCase();
            }
        }
        return "";
    }

    const handleAddMessage = () => {
        newMessage = newMessage.trim();
        const messageObj = {
            text: newMessage,
            owner: "user"
        };

        if (message.length !== 0) {
            if (message.some((el) => Object.values(el).includes(newMessage))) {
                alert("Слово уже есть в списке");
                return;
            }
            if (getLastWord(message) === "Ъ" || getLastWord(message) === "Ь") {
                if (
                    newMessage[0].toUpperCase() !== getLastWord(message, true)
                ) {
                    alert(
                        "Город должен начинаться с буквы на которую оканчивается предыдущее"
                    );
                    return;
                }
            } else if (newMessage[0].toUpperCase() !== getLastWord(message)) {
                alert(
                    "Город должен начинаться с буквы на которую оканчивается предыдущее"
                );
                return;
            }
            if (!cities.includes(newMessage)) {
                alert("Такого города не существует");
                return;
            }
        }
        setMessage((prevMessages) => [...prevMessages, messageObj]);
        setNewMessage("");
        setRole("bot");
    };
    return (
        <div>
            <div className="bg-gray-100  flex items-center justify-between w-full h-12 p-3.5 rounded-md">
                <input
                    {...register("cityInput", {
                        required: true,
                        pattern: /^[а-яёА-ЯЁ]+$/
                    })}
                    value={newMessage}
                    onChange={handleInputChange}
                    className="bg-inherit max-w-md w-full h-full"
                    type="text"
                    placeholder={
                        !isDisabled
                            ? message.length === 0
                                ? "Напишите любой город, например: Где вы живете?"
                                : `Знаете город на букву “${
                                      getLastWord(message) === "Ъ" ||
                                      getLastWord(message) === "Ь"
                                          ? getLastWord(message, true)
                                          : getLastWord(message)
                                  }”?`
                            : "Ожидаем ответа соперника..."
                    }
                    onKeyDown={handleKeyDown}
                    disabled={isDisabled}
                />
                <button
                    onClick={handleSubmit(handleAddMessage)}
                    className={`${
                        isDisabled ? "bg-inherit" : "bg-violet-500"
                    } rounded-md p-1.5 w-8 h-8 cursor-pointer`}
                >
                    <div className="w-5 h-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_7618_580)">
                                <path
                                    d="M8.33337 11.6667L17.5 2.5"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M17.5001 2.5L12.0834 17.5C12.0468 17.5798 11.9881 17.6474 11.9143 17.6948C11.8404 17.7422 11.7545 17.7674 11.6667 17.7674C11.579 17.7674 11.493 17.7422 11.4192 17.6948C11.3453 17.6474 11.2866 17.5798 11.2501 17.5L8.33339 11.6667L2.50006 8.75C2.42027 8.71344 2.35266 8.65474 2.30526 8.58088C2.25786 8.50701 2.23267 8.4211 2.23267 8.33333C2.23267 8.24557 2.25786 8.15965 2.30526 8.08579C2.35266 8.01193 2.42027 7.95323 2.50006 7.91667L17.5001 2.5Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_7618_580">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </button>
            </div>
            {errors.cityInput && <p>Только русские буквы</p>}
        </div>
    );
};

export default Input;
