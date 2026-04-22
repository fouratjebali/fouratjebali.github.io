declare module 'aos' {
  interface AOSSettings {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    offset?: number;
    disable?: boolean | string;
    startEvent?: string;
    throttleDelay?: number;
    debounceDelay?: number;
    disableMutationObserver?: boolean;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    maxOnce?: boolean;
  }

  interface AOS {
    init(options?: AOSSettings): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}
