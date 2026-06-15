import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
  // Register plugins you want at app level
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger);
  }

  return {
    gsap,
    ScrollTrigger,
  };
}
