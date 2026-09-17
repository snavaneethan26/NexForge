const ABBREVIATIONS = new Set([
  'ram',
  'cpu',
  'gpu',
  'usb',
  'hdmi',
  'vram',
  'psu',
  'tdp',
  'dpi',
  'rgb',
  'os',
  'io',
  'ssd',
  'hdd',
  'npu',
  'tops',
  'adc',
  'gpio',
  'csi',
  'fps',
  'ips',
  'va'
]);

export function formatSpecificationKey(key) {
  const str = String(key);
  if (ABBREVIATIONS.has(str.toLowerCase())) return str.toUpperCase();
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
