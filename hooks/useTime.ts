export default function useTime() {
    function secondsToHms(d: number): string {
        d = Number(d);
        let h: number = Math.floor(d / 3600);
        let m: number = Math.floor((d % 3600) / 60);
        let s: number = Math.floor((d % 3600) % 60);

        let hDisplay: string =
            h < 10 ? "0" + h : "" + h;
        let mDisplay: string =
            m < 10 ? "0" + m : "" + m;
        let sDisplay: string =
            s < 10 ? "0" + s : s.toString();

        return hDisplay + ":" + mDisplay + ":" + sDisplay;
    }

    return {
        secondsToHms
    }
}
