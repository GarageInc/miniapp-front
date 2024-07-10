export async function loadImg(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject();
  });
}

export async function loadVideo(src: string) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    video.onended = (e) => {
      const target = e.currentTarget as HTMLVideoElement;
      target.pause();
      target.remove();
    };
    video.oncanplay = () => resolve(video);
  });
}

export function getVideoFormat() {
  return detectiOs() || isSafari() ? "mov" : "webm";
}

export function detectiOs() {
  if (typeof window === "undefined") return false;
  return /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
}

export function isSafari() {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.indexOf("safari") != -1 &&
    !(ua.indexOf("chrome") != -1) &&
    ua.indexOf("version/") != -1
  );
}

export function supportsHEVCAlpha() {
  if (typeof window === "undefined") return false;

  const navigator = window.navigator;
  const ua = navigator.userAgent.toLowerCase();
  const hasMediaCapabilities = !!(
    navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
  );
  const isSafari =
    ua.indexOf("safari") != -1 &&
    !(ua.indexOf("chrome") != -1) &&
    ua.indexOf("version/") != -1;
  return isSafari && hasMediaCapabilities;
}
