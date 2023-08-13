import React, { useState, useEffect } from 'react';

export default function CountDown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 15,
        hours: 10,
        minutes: 24,
        seconds: 35,
    });

    function dec() {
        // Decrease one second from the countdown
        setTimeLeft(prevTimeLeft => {
            const newTimeLeft = { ...prevTimeLeft };

            if (newTimeLeft.seconds > 0) {
                newTimeLeft.seconds--;
            } else {
                if (newTimeLeft.minutes > 0) {
                    newTimeLeft.minutes--;
                    newTimeLeft.seconds = 59;
                } else {
                    if (newTimeLeft.hours > 0) {
                        newTimeLeft.hours--;
                        newTimeLeft.minutes = 59;
                        newTimeLeft.seconds = 59;
                    } else {
                        if (newTimeLeft.days > 0) {
                            newTimeLeft.days--;
                            newTimeLeft.hours = 23;
                            newTimeLeft.minutes = 59;
                            newTimeLeft.seconds = 59;
                        }
                    }
                }
            }

            return newTimeLeft;
        });
    }

    useEffect(() => {
        const interval = setInterval(dec, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex justify-center align-center mt-10">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.days }}></span>
                    </span>
                    days
                </div>
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.hours }}></span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.minutes }}></span>
                    </span>
                    min
                </div>
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": timeLeft.seconds }}></span>
                    </span>
                    sec
                </div>
            </div>
        </div>
    );
}
