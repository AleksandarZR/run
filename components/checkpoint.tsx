'use client'

import React, { useEffect, useState } from "react";
import styles from "./checkpoint.module.css";
import useTime from "../hooks/useTime";

interface Props {
    key: number;
    id: number;
    sequenceNumber: number;
    secounds: number;
}

export default function Checkpoint(props: Props) {
    const { secondsToHms } = useTime();

    return (
        <div className={styles.checkpointMainContainer}>
            <div className={styles.sequenceNumber}>{props.sequenceNumber}</div>
            <div className={styles.time}>{secondsToHms(props.secounds)}</div>
        </div>
    );
}