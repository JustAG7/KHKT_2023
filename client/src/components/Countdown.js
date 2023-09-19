import React, { useState, useEffect } from 'react';

export default function CountDown(props) {
    // Split the date string into day, month, and year components
    const dateComponents = props.date.split("/");
    const targetDay = parseInt(dateComponents[0], 10);
    const targetMonth = parseInt(dateComponents[1], 10) - 1; // Months are zero-based
    const targetYear = parseInt(dateComponents[2], 10);

    // Create the target date object
    const targetDate = new Date(targetYear, targetMonth, targetDay);
    
    const currentDate = new Date();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
    function calculateTimeLeft() {
        const timeDifference = targetDate - currentDate;
    
        if (timeDifference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

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
        console.log(targetDate)
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex justify-center align-center w-full mt-10">
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
