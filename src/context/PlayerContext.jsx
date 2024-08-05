import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: "00",
            minute: "00"
        },
        totalTime: {
            second: "00",
            minute: "00"
        }
    });

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current) {
                // Ensure that duration is not NaN or zero before calculating the width
                if (!isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
                    seekBar.current.style.width = (parseFloat(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                }

                setTime({
                    currentTime: {
                        second: formatTime(Math.floor(audioRef.current.currentTime % 60)),
                        minute: formatTime(Math.floor(audioRef.current.currentTime / 60))
                    },
                    totalTime: {
                        second: formatTime(Math.floor(audioRef.current.duration % 60)),
                        minute: formatTime(Math.floor(audioRef.current.duration / 60))
                    }
                });
            }
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [audioRef]);

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
