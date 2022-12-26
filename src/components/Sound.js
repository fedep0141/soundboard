import React, { useState, useEffect } from "react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }
    );

    useEffect(() => {
        // (async () => {
        //     // await navigator.mediaDevices.getUserMedia({audio: true});   
        //     // let devices = await navigator.mediaDevices.enumerateDevices();   
        //     // console.log(devices); 
        // })();
        audio.setSinkId("937afa048ee05659a96ca1ab63f673ca54c58e78e1754bcd13f7125530571589");
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    });

    return [playing, toggle];
};

const Sound = ({ url }) => {

    const [playing, toggle] = useAudio(url);

    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    );
};

export default Sound