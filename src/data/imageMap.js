// Maps exact product IDs ($oid) to product photos stored locally in
// public/images/products/ (sourced from Wikimedia Commons / Flickr, CC-licensed).
// Falls back to category images, then a safe placeholder — the UI never breaks.

export const imageMap = {
  '6aa39d40479776591ab94c5c': '/images/products/amd-ryzen-5-7600.jpg',
  '6aa39d5a479776591ab94c5e': '/images/products/nvidia-rtx-4060.png',
  '6aa39d69479776591ab94c60': '/images/products/corsair-vengeance-ddr5.jpg',
  '6aa39d40479776591ab94c5d': '/images/products/intel-i5-12400f.jpg',
  '6aa39d40479776591ab94c5f': '/images/products/intel-i7-12700k.jpg',
  '6aa39d40479776591ab94c66': '/images/products/amd-ryzen-5-8600g.png',
  '6aa39d40479776591ab94c65': '/images/products/intel-i9-14900k.png',
  '6aa39d40479776591ab94c63': '/images/products/intel-i3-12100f.jpg',
  '6aa39d7c479776591ab94c8f': '/images/products/nvidia-rtx-4070.jpg',
  '6aa39d7c479776591ab94c91': '/images/products/nvidia-rtx-3050.jpg',
  '6aa39d7c479776591ab94c63': '/images/products/keychron-k2.jpg',
  '6aa39d7c479776591ab94c64': '/images/products/royal-kludge-rk84.jpg',
  '6aa39d7c479776591ab94c73': '/images/products/razer-basilisk-v3.jpg',
  '6aa39d7c479776591ab94c77': '/images/products/acer-nitro-vg240y.jpg',
  '6aa39d7c479776591ab94c78': '/images/products/samsung-odyssey-g5.jpg',
  '6aa39d7c479776591ab94c7c': '/images/products/hyperx-cloud-stinger-2.jpg',
  '6aa39d7c479776591ab94c7d': '/images/products/logitech-g435.jpg',
  '6aa39d7c479776591ab94c82': '/images/products/logitech-c270.jpg',
  '6aa39d40479776591ab94c88': '/images/products/sony-dualsense.png',
  '6aa39d40479776591ab94c89': '/images/products/xbox-wireless-controller.jpg',
  '6aa39d9b479776591ab94c66': '/images/products/raspberry-pi-5-8gb.jpg',
  '6aa39d9b479776591ab94c67': '/images/products/raspberry-pi-5-4gb.jpg',
  '6aa39d9b479776591ab94c68': '/images/products/raspberry-pi-zero-2w.jpg',
  '6aa39d9b479776591ab94c69': '/images/products/jetson-orin-nano-8gb.jpg',
  '6aa39d9b479776591ab94c6a': '/images/products/jetson-orin-nano-4gb.jpg',
  '6aa39d9b479776591ab94c6b': '/images/products/arduino-uno-r4-wifi.jpg',
  '6aa39d9b479776591ab94c6c': '/images/products/arduino-nano-esp32.jpg',
  '6aa39d9b479776591ab94c6d': '/images/products/esp32-devkit-v1.jpg',
  '6aa39d9b479776591ab94c6f': '/images/products/bbc-microbit-v2.jpg',
  '6aa39d9b479776591ab94c70': '/images/products/orange-pi-5b.jpg'
};

export const categoryFallbackImage = {
  'PC Components': '/images/categories/pc-components.jpg',
  Peripherals: '/images/categories/peripherals.jpg',
  'Developer / AI Hardware': '/images/categories/ai-hardware.jpg'
};

export const PLACEHOLDER_IMAGE = '/images/placeholder.svg';
