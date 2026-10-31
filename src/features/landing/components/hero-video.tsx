import { Card } from "@/components/ui/card";

import { heroVideo } from "../data/hero";
import { HeroVideoPlayer } from "./hero-video-player";

export function HeroVideo() {
  return (
    <figure className="flex w-full max-w-5xl flex-col items-center gap-4">
      <Card className="w-full gap-0 overflow-hidden rounded-xl py-0 shadow-lg ring-border">
        <HeroVideoPlayer video={heroVideo} />
      </Card>
      <figcaption className="text-center text-sm text-muted-foreground">
        {heroVideo.caption}
      </figcaption>
    </figure>
  );
}
