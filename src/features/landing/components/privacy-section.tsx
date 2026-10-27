import { Card, CardContent } from "@/components/ui/card";

import { privacyIntro, privacyNotification, privacyPoints } from "../data/how-it-works";
import { CheckItem } from "./check-item";
import { NotificationCard } from "./mocks/notification-card";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function PrivacySection() {
  return (
    <section
      aria-labelledby="privacy-title"
      className="mx-auto grid max-w-marketing-wide grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal className="relative pb-12 lg:order-first">
        <Card className="rounded-3xl py-3 shadow-xl ring-border">
          {/* Bottom padding leaves room for the notification, so it overlaps empty space only. */}
          <CardContent className="px-6 pb-16">
            <ul className="divide-y divide-border">
              {privacyPoints.map((point) => (
                <CheckItem key={point.title} detail={point.detail}>
                  {point.title}
                </CheckItem>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div inert className="absolute bottom-0 left-2 w-72 -rotate-2 sm:-left-6">
          <NotificationCard notification={privacyNotification} />
        </div>
      </Reveal>

      <Reveal index={1} className="order-first lg:order-last">
        <SectionHeading id="privacy-title" intro={privacyIntro} />
      </Reveal>
    </section>
  );
}
