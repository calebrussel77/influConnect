export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
  }
}

const pageview = () => {
  window.fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
const event = (name: string, options = {}) => {
  window.fbq('track', name, options);
};

export const fbp = Object.assign({}, { event, pageview });
