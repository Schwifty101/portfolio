import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work/arco-law", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/pre-call-brief", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/ad-ops-agent", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work/ai-voice-agent", priority: 0.7, changeFrequency: "monthly" },
    { path: "/agencies", priority: 0.9, changeFrequency: "weekly" },
    { path: "/agencies/ad-operations-automation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/agencies/pre-sales-research-automation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/agencies/onboarding-intelligence", priority: 0.8, changeFrequency: "monthly" },
    { path: "/med-spas", priority: 0.8, changeFrequency: "weekly" },
    { path: "/med-spas/ai-receptionist", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources/ad-account-leak-audit", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources/pre-call-research-checklist", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ]

  return routes.map((route) => ({
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
