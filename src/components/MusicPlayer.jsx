import React, { useState, useRef } from 'react';
import '../style/mediaPlayer.css'

const MusicPlayer = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    { id: 1, name: 'Autumn Leaves ', url: '/audio/Autumn Leaves.mp3' },
    { id: 2, name: 'Passion Hole', url: '/audio/The Dream Land.mp3' },
    { id: 3, name: 'The Dream', url: '/audio/cristo.mp3' },
  ];

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // reset audio position
    }
    setIsPlaying(false); // Reset play state
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (selectedTrack) {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-container">
      <h1 className='titles-track'>Seleziona una traccia musicale</h1>

      <div>
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleTrackSelect(track)}
            disabled={selectedTrack?.id === track.id}
            className='title-track'
          >
            {track.name}
          </button>
        ))}
      </div>

      <div>
        {selectedTrack && (
          <>
            <h2 className='track-selected'>{selectedTrack.name}</h2>
            <button onClick={handlePlayPause}>
              {isPlaying ? 'Pausa' : 'Play'}
            </button>
            <audio ref={audioRef} src={selectedTrack.url} />
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
