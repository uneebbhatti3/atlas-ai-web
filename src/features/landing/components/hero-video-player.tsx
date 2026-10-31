"use client";

import {
  Loader2Icon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import type { HeroVideo } from "../types";
import { formatTime } from "../utils/format-time";

// Native controls cannot be recoloured, so these replace them. Icons sit on a dark scrim in both
// themes, which is why they are white and not a theme colour.
const controlClass =
  "size-11 rounded-full text-white hover:bg-brand-player hover:text-white focus-visible:border-white focus-visible:ring-white dark:hover:bg-brand-player";

// shadcn's Slider only takes a root className, so its parts are reached through their data-slots.
const sliderClass =
  "**:data-[slot=slider-range]:bg-brand-player **:data-[slot=slider-thumb]:border-white **:data-[slot=slider-thumb]:bg-brand-player **:data-[slot=slider-thumb]:has-focus-visible:ring-4 **:data-[slot=slider-thumb]:ring-white/60 **:data-[slot=slider-track]:bg-white/30 [&>div]:h-11";

function toNumber(value: number | readonly number[]): number {
  return typeof value === "number" ? value : (value[0] ?? 0);
}

function subscribeToFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

function subscribeToNothing() {
  return () => undefined;
}

interface HeroVideoPlayerProps {
  video: HeroVideo;
}

export function HeroVideoPlayer({ video }: HeroVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekLabelId = useId();
  const volumeLabelId = useId();

  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(video.duration);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const isFullscreen = useSyncExternalStore(
    subscribeToFullscreen,
    () => document.fullscreenElement !== null,
    () => false,
  );
  // iPhone Safari has no element fullscreen, so the button stays hidden there.
  const canFullscreen = useSyncExternalStore(
    subscribeToNothing,
    () => document.fullscreenEnabled,
    () => false,
  );

  // Autoplay from here, not the `autoPlay` attribute: it tries sound first and falls back to muted,
  // which an attribute cannot do, and starting on view keeps the file out of the first load.
  useEffect(() => {
    const element = videoRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        element.play().catch((error: unknown) => {
          if (!(error instanceof DOMException) || error.name !== "NotAllowedError") return;
          // Sound is blocked until the visitor interacts with the page. Volume stays at 100%, so
          // unmuting plays at full level. If this is refused too (iOS Low Power Mode), the play
          // button simply stays on screen.
          element.muted = true;
          element.play().catch(() => undefined);
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) {
      // Rejects when a pause interrupts loading, which is not a failure; real load errors reach
      // `onError`.
      element.play().catch(() => undefined);
    } else {
      element.pause();
    }
  }

  function seek(value: number | readonly number[]) {
    const next = toNumber(value);
    setTime(next);
    if (videoRef.current) videoRef.current.currentTime = next;
  }

  function changeVolume(value: number | readonly number[]) {
    const element = videoRef.current;
    if (!element) return;
    element.volume = toNumber(value);
    element.muted = false;
  }

  function toggleMuted() {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  }

  function toggleFullscreen() {
    if (isFullscreen) {
      void document.exitFullscreen();
    } else {
      void containerRef.current?.requestFullscreen();
    }
  }

  const silent = muted || volume === 0;

  return (
    <div
      ref={containerRef}
      data-playing={playing}
      className="group/player relative aspect-video w-full bg-black"
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        preload="none"
        playsInline
        aria-label={video.label}
        className="size-full cursor-pointer object-contain"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => {
          setMuted(event.currentTarget.muted);
          setVolume(event.currentTarget.volume);
        }}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onError={() => setFailed(true)}
      >
        Your browser does not support the video tag.
      </video>

      {/* Decorative: clicks fall through to the video; the keyboard path is the bar below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {buffering ? (
          <Loader2Icon className="size-10 text-white motion-safe:animate-spin" strokeWidth={1.75} />
        ) : !playing && !failed ? (
          <span className="flex size-16 items-center justify-center rounded-full bg-brand-player text-white shadow-lg md:size-20">
            <PlayIcon className="size-7 fill-current md:size-8" strokeWidth={1.75} />
          </span>
        ) : null}
      </div>

      {failed ? (
        <p
          role="alert"
          className="absolute inset-x-0 top-4 mx-auto w-fit rounded-full bg-black/70 px-4 py-2 text-sm text-white"
        >
          The video could not load. Please try again later.
        </p>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-black/90 via-black/70 to-transparent px-2 pt-10 pb-1 opacity-0 transition-opacity duration-150 group-hover/player:opacity-100 group-has-focus-visible/player:opacity-100 group-data-[playing=false]/player:opacity-100 sm:gap-2 sm:px-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label={playing ? "Pause video" : "Play video"}
          className={controlClass}
          onClick={togglePlay}
        >
          {playing ? (
            <PauseIcon className="size-5 fill-current" strokeWidth={1.75} />
          ) : (
            <PlayIcon className="size-5 fill-current" strokeWidth={1.75} />
          )}
        </Button>

        <span id={seekLabelId} className="sr-only">
          Seek, in seconds
        </span>
        <Slider
          aria-labelledby={seekLabelId}
          min={0}
          max={duration}
          step={1}
          value={[time]}
          onValueChange={seek}
          className={sliderClass}
        />

        <span className="shrink-0 px-1 text-caption text-white tabular-nums">
          {formatTime(time)} / {formatTime(duration)}
        </span>

        <Button
          variant="ghost"
          size="icon"
          aria-label={silent ? "Unmute video" : "Mute video"}
          className={controlClass}
          onClick={toggleMuted}
        >
          {silent ? (
            <VolumeXIcon className="size-5" strokeWidth={1.75} />
          ) : (
            <Volume2Icon className="size-5" strokeWidth={1.75} />
          )}
        </Button>

        {/* Below `md` the device buttons handle volume and the timeline needs the room. */}
        <div className="hidden w-20 shrink-0 md:block">
          <span id={volumeLabelId} className="sr-only">
            Volume
          </span>
          <Slider
            aria-labelledby={volumeLabelId}
            min={0}
            max={1}
            step={0.05}
            value={[volume]}
            onValueChange={changeVolume}
            className={sliderClass}
          />
        </div>

        {canFullscreen ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            className={controlClass}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <MinimizeIcon className="size-5" strokeWidth={1.75} />
            ) : (
              <MaximizeIcon className="size-5" strokeWidth={1.75} />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
