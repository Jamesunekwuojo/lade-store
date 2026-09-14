"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { VolumeX } from "lucide-react";

const TARGET_VOLUME = 0.35; // Gentle background volume (35%)
const FADE_IN_DURATION_MS = 2200; // 2.2s smooth fade-in
const FADE_OUT_DURATION_MS = 1200; // 1.2s smooth fade-out
const INTERVAL_MS = 40;
const STORAGE_KEY = "lade_audio_disabled";

export function SoundAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  /**
   * Smooth Volume Fade-In (2.2s)
   */
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    setIsFading(true);
    setIsPlaying(true);
    hasStartedRef.current = true;
    audio.volume = 0.001;

    audio
      .play()
      .then(() => {
        const steps = FADE_IN_DURATION_MS / INTERVAL_MS;
        const volStep = (TARGET_VOLUME - 0.001) / steps;

        fadeIntervalRef.current = setInterval(() => {
          if (!audioRef.current) return;
          const nextVol = Math.min(TARGET_VOLUME, audioRef.current.volume + volStep);
          audioRef.current.volume = nextVol;

          if (nextVol >= TARGET_VOLUME) {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            setIsFading(false);
          }
        }, INTERVAL_MS);
      })
      .catch((err) => {
        // Autoplay policy prevented playback until first user interaction
        console.log("Audio autoplay waiting for user interaction:", err?.name);
        setIsPlaying(false);
        setIsFading(false);
        hasStartedRef.current = false;
      });
  }, []);

  /**
   * Smooth Volume Fade-Out (1.2s)
   */
  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    setIsFading(true);
    const startVol = audio.volume;
    const steps = FADE_OUT_DURATION_MS / INTERVAL_MS;
    const volStep = startVol / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const nextVol = Math.max(0, audioRef.current.volume - volStep);
      audioRef.current.volume = nextVol;

      if (nextVol <= 0.001) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audioRef.current.volume = 0;
        audioRef.current.pause();
        setIsFading(false);
        setIsPlaying(false);
      }
    }, INTERVAL_MS);
  }, []);

  // Initialize audio element and handle first-visit autoplay + interaction unlock
  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    // Check if user previously opted to disable audio
    const isExplicitlyDisabled = localStorage.getItem(STORAGE_KEY) === "true";

    if (!isExplicitlyDisabled) {
      // 1. Try immediate smooth fade-in
      fadeIn();

      // 2. Fallback: If browser autoplay policy blocks unprompted audio, unlock on first user gesture (scroll, tap, click, key)
      const handleFirstGesture = () => {
        if (!hasStartedRef.current && localStorage.getItem(STORAGE_KEY) !== "true") {
          fadeIn();
        }
        cleanupListeners();
      };

      const cleanupListeners = () => {
        window.removeEventListener("pointerdown", handleFirstGesture);
        window.removeEventListener("click", handleFirstGesture);
        window.removeEventListener("touchstart", handleFirstGesture);
        window.removeEventListener("scroll", handleFirstGesture);
        window.removeEventListener("keydown", handleFirstGesture);
      };

      window.addEventListener("pointerdown", handleFirstGesture, { passive: true, once: true });
      window.addEventListener("click", handleFirstGesture, { passive: true, once: true });
      window.addEventListener("touchstart", handleFirstGesture, { passive: true, once: true });
      window.addEventListener("scroll", handleFirstGesture, { passive: true, once: true });
      window.addEventListener("keydown", handleFirstGesture, { passive: true, once: true });

      return () => {
        cleanupListeners();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current = null;
        }
      };
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [fadeIn]);

  /**
   * Toggle Button Handler
   */
  const toggleSound = () => {
    if (!isPlaying) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      fadeIn();
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
      fadeOut();
    }
  };

  return (
    <div
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 transition-all duration-300"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={toggleSound}
        disabled={isFading}
        aria-label={
          isPlaying
            ? "Mute LADÉ EMPIRE background atmosphere soundscape"
            : "Play LADÉ EMPIRE African heritage acoustic soundscape (Smooth Fade-In)"
        }
        className={`group relative flex items-center gap-2.5 sm:gap-3 py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-95 ${
          isPlaying
            ? "bg-[var(--card)]/90 border-[var(--accent)]/60 text-foreground shadow-[0_4px_20px_rgba(201,162,77,0.18)]"
            : "bg-[var(--background)]/85 border-[var(--border)] hover:border-[var(--accent)]/40 text-[var(--muted-foreground)] hover:text-foreground"
        }`}
      >
        {/* Equalizer Wave / Icon */}
        <div className="flex items-center gap-[3px] h-4 w-4 justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2px] bg-[var(--accent)] rounded-full animate-[music-bar_1.2s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-[var(--accent)] rounded-full animate-[music-bar_0.9s_ease-in-out_infinite_0.2s]" />
              <span className="w-[2px] bg-[var(--accent)] rounded-full animate-[music-bar_1.4s_ease-in-out_infinite_0.4s]" />
              <span className="w-[2px] bg-[var(--accent)] rounded-full animate-[music-bar_1.1s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 transition-colors group-hover:text-foreground" />
          )}
        </div>

        {/* Text Label */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-[var(--accent)]">
            Atmosphere
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-medium text-foreground/85 whitespace-nowrap">
            {isFading
              ? isPlaying
                ? "Fading In..."
                : "Fading Out..."
              : isPlaying
              ? "Audio: On"
              : "Audio: Off"}
          </span>
        </div>
      </button>
    </div>
  );
}

export default SoundAtmosphere;
