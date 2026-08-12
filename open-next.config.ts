import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// All routes are prerendered (generateStaticParams) with no revalidation —
// serve them read-only from Workers Static Assets instead of rendering in
// the Worker on every request. No queue/tag-cache needed for a static site.
export default defineCloudflareConfig({
  enableCacheInterception: true,
  incrementalCache: staticAssetsIncrementalCache,
});