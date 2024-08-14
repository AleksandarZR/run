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
    currentTime: number;
    secounds: number;
}

var checkpoints = new Array<CPoint>();
var intervalID: number | undefined | NodeJS.Timeout;
var start = 0;

export default function Home() {
    // const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timeLapse, setTimeLapse] = useState("00:00:00");
    // const [intervalID, setIntervalID] = useState(0);
    const { secondsToHms } = useTime();

    const addCheckPointEventHandler = () => {
        let length = checkpoints.length;
        let timeSpan = 0;
        let currentTime = Math.round((new Date()).getTime() / 1000);
        console.log(currentTime);

        if (length === 0) {
            timeSpan = currentTime - start;
        } else {
            timeSpan = currentTime - checkpoints[length - 1].currentTime;

            console.log("timeSpan: " + timeSpan);
            console.log("checkpoints[length-1].secounds " + checkpoints[length - 1].secounds);
        }

        let cpoint: CPoint = {
            key: length + 1,
            id: length + 1,
            sequenceNumber: length + 1,
            currentTime: currentTime,
            secounds: timeSpan
        }

        checkpoints.push(cpoint);

    }

    const startEventHandler = (): void => {
        let dateStartTime: Date = new Date();
        start = dateStartTime.getTime() / 1000;
        console.log("start: " + start);
        console.log("start: " + Math.round(start));
        start = Math.round(start);

        intervalID = setInterval(repeatingFunctionCallback, 1000);
    }

    const stopEventHandler = (): void => {
        let dateEndTime: Date = new Date();
        console.log(dateEndTime); //getTime returns ms
        setEndTime(dateEndTime.getTime() / 1000);

        clearInterval(intervalID);
        // intervalID = null;
    }

    const repeatingFunctionCallback = (): void => {
        let currentTime: Date = new Date();
        let currentSecounds = currentTime.getTime() / 1000;
        let timeLapse = currentSecounds - start;
        setTimeLapse(secondsToHms(timeLapse));
    }

    return (
        <main className={styles.main}>
            <div className={styles.timeLapse}>Ukupno vreme trčanja: <span className={styles.spanTimeLapse}>{timeLapse}</span></div>
            <div className={styles.buttonAddCheckpoint} onClick={addCheckPointEventHandler}>ZAVRŠI KRUG</div>

            <div className={styles.checkpointsGrid}>
               <div className={styles.gridHeader}>
                   <div className={styles.headerLeft}>Redni broj kruga:</div>
                    <div className={styles.headerLeft}>Vreme:</div>
                </div> 
                {checkpoints.map((c: any) => (
                    <Checkpoint key={c.id} id={c.id} sequenceNumber={c.sequenceNumber} secounds={c.secounds} />
                    // <div key={c.id} className={styles.gridColumn1}>{c.sequenceNumber}</div>
                ))}
            </div>

            <div className={styles.buttonsContainer}>
                <div className={styles.buttonStart} onClick={startEventHandler}>START</div>
                <div className={styles.buttonStop} onClick={stopEventHandler}>STOP</div>
            </div>

        </main>
    );
}
