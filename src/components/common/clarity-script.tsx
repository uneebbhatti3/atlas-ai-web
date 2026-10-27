import Script from "next/script";

import { env, isProduction } from "@/lib/env";

/**
 * Microsoft Clarity loader. Only the production deployment reports, so local, preview and
 * integration traffic never pollutes the recordings.
 */
export function ClarityScript() {
  const projectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!isProduction || !projectId) {
    return null;
  }

  // Microsoft's official snippet: it queues `clarity()` calls until the tag loads.
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script",${JSON.stringify(projectId)});`}
    </Script>
  );
}
