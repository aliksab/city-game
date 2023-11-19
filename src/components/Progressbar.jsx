import React, { useEffect, useState } from "react";

const Progressbar = ({ timerValue }) => {
    const initialTimer = 120;
    const initialSize = 576;
    const [size, setSize] = useState(initialSize);

    useEffect(() => {
        if (timerValue > 0) {
            const sizeRatio = timerValue / initialTimer;
            const newSize = initialSize * sizeRatio;
            setSize(newSize);
        }
    }, [timerValue]);

    return (
        <div className="h-1 bg-gray-200 w-full">
            <div
                className="h-1 bg-violet-300 z-2"
                style={{ width: `${size}px` }}
            />
        </div>
    );
};

export default Progressbar;
