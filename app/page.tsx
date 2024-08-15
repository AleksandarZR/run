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
    const [timeLapse, setTimeLapse] = useState("00:00:00");
    const [averageTime, setAverageTime] = useState("00:00:00");
    const [inProgress, setInProgress] = useState(false);
    const { secondsToHms } = useTime();

    const addCheckPointEventHandler = () => {
        if (!inProgress) {
            return;
        }

        let length = checkpoints.length;
        let timeSpan = 0;
        let currentTime = Math.round((new Date()).getTime() / 1000);

        if (length === 0) {
            timeSpan = currentTime - start;
        } else {
            timeSpan = currentTime - checkpoints[length - 1].currentTime;
        }

        let cpoint: CPoint = {
            key: length + 1,
            id: length + 1,
            sequenceNumber: length + 1,
            currentTime: currentTime,
            secounds: timeSpan
        }

        checkpoints.push(cpoint);

        calculateAverageTimePerCheckpoint();
    }

    const calculateAverageTimePerCheckpoint = (): void => {
        if (checkpoints.length < 1) {
            return;
        } else if (checkpoints.length === 1) {
            setAverageTime(secondsToHms(checkpoints[0].secounds));
        } else {
            let sum: number = 0;

            for (let i = 0; i< checkpoints.length; i++ ) {
                sum = sum + checkpoints[i].secounds;
            }

            let averageTime: number = sum/checkpoints.length;
            setAverageTime(secondsToHms(averageTime));
        }
    }

    const startEventHandler = (): void => {
        reset();

        setInProgress(true);

        let dateStartTime: Date = new Date();
        start = dateStartTime.getTime() / 1000;
        start = Math.round(start);

        intervalID = setInterval(repeatingFunctionCallback, 1000);
    }

    const stopEventHandler = (): void => {
        setInProgress(false);
        clearInterval(intervalID);
    }

    const repeatingFunctionCallback = (): void => {
        let currentTime: Date = new Date();
        let currentSecounds = currentTime.getTime() / 1000;
        let timeLapse = currentSecounds - start;
        setTimeLapse(secondsToHms(timeLapse));
    }

    const reset = (): void => {
        // Delete all checkpoints
        while (checkpoints.length > 0) {
            checkpoints.pop();
        }

        // Reset full time
        setTimeLapse("00:00:00");

        // Reset average time
        setAverageTime("00:00:00");
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.heading}>Statistika trčanja</h1>

            <div className={styles.fulllTimeContainer}>
                <div className={styles.fullTimeText}>Ukupno vreme trčanja:</div>
                <div className={styles.fullTimeValue}>{timeLapse}</div>
            </div>

            <div className={styles.averageTimeContainer}>
                <div className={styles.averageTimeText}>Prosečno vreme po krugu:</div>
                <div className={styles.averageTimeValue}>{averageTime}</div>
            </div>

            <div className={styles.buttonAddCheckpoint} onClick={addCheckPointEventHandler}>ZAVRŠI KRUG</div>

            <div className={styles.checkpointsGrid}>
                <div className={styles.gridHeader}>
                    <div className={styles.headerLeft}>Redni broj kruga</div>
                    <div className={styles.headerLeft}>Vreme</div>
                </div>
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
