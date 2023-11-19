import Button from "../components/Button";
import Content from "../components/Content";

const WinPage = ({ message, setGame }) => {
    const handleClick = () => {
        setGame(true);
    };
    return (
        <Content>
            <div className="p-10 gap-y-8 flex flex-col border-b-[2px] text-center text-xl">
                <p className="">
                    Поздравляем тебя с победой! <br />
                    Твой противник не вспомнил нужный город!
                </p>
                <p className="font-medium text-3xl text-green-600">{"00:00"}</p>
                <p className="">
                    Всего было перечислено городов: {message.length} <br />
                    Очень не плохой результат!
                </p>
                <div>
                    <p className="">Последний город названный победителем</p>
                    <p className="font-medium">
                        {message.length !== 0
                            ? message[message.length - 1].text
                            : "Город не назван"}
                    </p>
                </div>
                <Button toggleButton={handleClick}>Начать новую игру</Button>
            </div>
        </Content>
    );
};

export default WinPage;
