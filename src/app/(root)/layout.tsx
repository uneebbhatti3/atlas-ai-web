import { MarketingLayout } from "@/layouts/marketing/marketing-layout";

export default function RootGroupLayout({ children }: LayoutProps<"/">) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
