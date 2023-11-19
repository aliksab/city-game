export const updateTimer = ({
    timerValue,
    setTimerValue,
    setTimer,
    intervalId
}) => {
    const min = Math.floor(timerValue / 60);
    const sec = timerValue % 60;
    setTimer(`${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`);
    setTimerValue((prev) => prev - 1);
    if (timerValue <= 0) {
        clearInterval(intervalId);
        setTimer("Время вышло!");
    }
};
