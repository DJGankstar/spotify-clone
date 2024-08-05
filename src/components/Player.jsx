import React, { useContext } from 'react'
import {assets, songsData} from "../assets/assets";
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {

  const {seekBar, seekBg, playStatus, play, pause} = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black justify-between items-center text-white px-4 flex">
        <div className="hidden lg:flex items-center gap-4">
          <img className="w-12" src={songsData[0].image} alt="song artwork"/>
          <div>
            <p>{songsData[0].name}</p>    
            <p>{songsData[0].desc.slice(0, 12)}</p>    
          </div> 
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
          <div className="flex gap-4">
            <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle"/>
            <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="previous"/>
            {playStatus?<img onClick = {pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="play"/>:<img onClick = {play} className="w-4 cursor-pointer" src={assets.play_icon} alt="play"/>}
            <img className="w-4 cursor-pointer" src={assets.next_icon} alt="next"/>
            <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="loop"/>
          </div>
          <div className="flex items-center gap-5">
            <p>1:06</p>
            <div ref = {seekBg} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                <hr ref = {seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full"/>
            </div>
            <p>3:20</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
            <img className="w-4" src={assets.plays_icon} alt="plays"/>
            <img className="w-4" src={assets.mic_icon} alt="microphone"/>
            <img className="w-4" src={assets.queue_icon} alt="queue"/>
            <img className="w-4" src={assets.speaker_icon} alt="speaker"/>
            <img className="w-4" src={assets.volume_icon} alt="volume"/>
            <div className="w-20 bg-slate-50 h-1 rounded"></div>
            <img className="w-4" src={assets.mini_player_icon} alt="mini player"/>
            <img className="w-4" src={assets.zoom_icon} alt="zoom"/>
        </div>           
    </div>
  )
}

export default Player
