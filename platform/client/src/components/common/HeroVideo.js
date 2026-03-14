import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl">
      <div className="relative w-full h-96 bg-gradient-to-br from-primary-500 to-secondary-500">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-2xl font-bold mb-4">Преимущества ZalogInvest</h3>
            <ul className="text-left space-y-2">
              <li>✓ Быстрые займы под залог</li>
              <li>✓ Доходность до 20%</li>
              <li>✓ Юридическая защита</li>
            </ul>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-gray-900" />
          ) : (
            <Play className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeroVideo;

