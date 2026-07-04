import { services } from "@/lib/data/services";

const SITE_URL = "https://www.outpro.india";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/services", "/portfolio", "/contact", "/blog", "/careers", "/partners"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.7,
    })
  );

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
