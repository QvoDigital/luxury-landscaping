/**
 * Where the video files live.
 *
 * Wix's static drop hosting silently refuses .mp4 files — every image from the same upload
 * serves, every video 404s — so videos come from the jsDelivr CDN in front of this site's
 * public GitHub repo instead. The pin is a commit hash, not a branch: jsDelivr caches
 * hash-pinned files immutably, so a later push can never half-update a live page. When a
 * video file changes, push it, then update the hash here.
 *
 * Posters and photographs stay as local root-relative paths — Wix serves those fine, and
 * they must render even if the CDN is unreachable.
 */
const VIDEO_COMMIT = '431af6f';
export const VIDEO_BASE = `https://cdn.jsdelivr.net/gh/QvoDigital/luxury-landscaping@${VIDEO_COMMIT}/public/photos/demo`;
