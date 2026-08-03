<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI Test Captures

After any UI change, always capture screenshots of the UI and save them to `test-preview-images/` (desktop 1440×900 and mobile 390×844 when relevant). Use descriptive filenames with dates, e.g. `test-preview-images/2026-08-03-hero-marquee-1440.png`. Capture before finishing a UI task so the folder always reflects the latest UI state.
