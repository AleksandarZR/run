'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import Checkpoint from "../components/checkpoint";
import useTime from "../hooks/useTime";

interface CPoint {
    key: number;
    id: number;
    sequenceNumber: number;
    secounds: number;
}

var checkpoints = new Array<CPoint>();
var intervalID: string | number | NodeJS.Timeout | null | undefined;
var start = 0;

export default function Home() {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timeLapse, setTimeLapse] = useState("00:00:00");
    // const [intervalID, setIntervalID] = useState(0);
    const { secondsToHms } = useTime();

    const addCheckPointEventHandler = () => {
        let length = checkpoints.length;
        let timeSpan = 0;

        if (length === 0) {
            timeSpan = (new Date()).getTime()/1000 - start;
        } else {
            timeSpan = (new Date()).getTime()/1000 - checkpoints[length-1].secounds;
        }

        let cpoint: CPoint = { 
            key: length + 1,
            id: length + 1,
            sequenceNumber: length + 1,
            secounds: timeSpan
        }

        checkpoints.push(cpoint);

    }

    const startEventHandler = () => {
        let dateStartTime: Date = new Date();
        console.log(dateStartTime);
        console.log("dateStartTime.getTime()/1000: " + dateStartTime.getTime()/1000);
        let t = dateStartTime.getTime()/1000;
        setStartTime(t); //getTime returns ms
        console.log("startTime: " + startTime);
        start = dateStartTime.getTime()/1000;
        console.log("start: " + start);

        intervalID = setInterval(repeatingFunctionCallback, 1000);
    }

    const stopEventHandler = () => {
        let dateEndTime: Date = new Date();
        console.log(dateEndTime); //getTime returns ms
        setEndTime(dateEndTime.getTime()/1000);

        clearInterval(intervalID);
        intervalID = null;
    }

    const repeatingFunctionCallback = () => {
        let currentTime: Date = new Date();
        let currentSecounds = currentTime.getTime()/1000;
        let timeLapse = currentSecounds - start;
        console.log("current secounds: " + currentSecounds);
        console.log("start time secounds: " + startTime);
        console.log("start: " + start);
        setTimeLapse(secondsToHms(timeLapse));
    }

    return (
        <main className={styles.main}>
            <div className={styles.timeLapse}>Time lapse: <span className={styles.spanTimeLapse}>{timeLapse}</span></div>
            <div className={styles.buttonAddCheckpoint} onClick={addCheckPointEventHandler}>ADD CHECKPOINT</div>

            <div className={styles.checkpoints}>
                {checkpoints.map((c: any) => (
                    <Checkpoint key={c.id} id={c.id} sequenceNumber={c.sequenceNumber} secounds={c.secounds} />
                ))}
            </div>

            <div className={styles.buttonsContainer}>
                <div className={styles.buttonStart} onClick={startEventHandler}>START</div>
                <div className={styles.buttonStop} onClick={stopEventHandler}>STOP</div>
            </div>

        </main>
    );
}
