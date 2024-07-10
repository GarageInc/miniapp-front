export function extractValueFromQuery(name: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function extractValueFromHash(key: string) {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);

  return params.get(key);
}

export function parseBase64(base64: string) {
  if (!base64) {
    return {};
  }

  try {
    const buff = Buffer.from(base64, "base64");
    const text = buff.toString();
    return JSON.parse(text);
  } catch (e) {
    console.error(e, base64);
    return {};
  }
}
