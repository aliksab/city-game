import { cities } from "../data/cities";

export const bot = ({ message, setRole, setMessage }) => {
    let letter = message[message.length - 1];

    const botAnswerTimer = Math.round(Math.random() * 15 * 1000);
    setTimeout(() => {
        botAnswer();
    }, botAnswerTimer);

    const botAnswer = () => {
        const history = message.map((el) => el.text);
        if (letter.owner === "user") {
            let word = letter.text.slice(-1).toUpperCase();
            if (word === "Ъ" || word === "Ь") {
                word = letter.text.slice(-2, -1).toUpperCase();
            }

            let index = cities.findIndex(
                (el) => !history.includes(word) && el[0] === word
            );
            console.log(!history.includes(word));
            if (index !== -1) {
                let city = cities[index];
                cities.splice(index, 1);
                const messageObj = {
                    text: city,
                    owner: "bot"
                };
                setMessage((prevMessages) => [...prevMessages, messageObj]);
                setRole("user");
            } else {
                console.log("Бот не нашел город");
            }
        }
    };
};
