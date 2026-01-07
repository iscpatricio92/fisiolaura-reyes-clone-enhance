import { useEffect, useState } from 'react';

export const useDoctoraliaWidget = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scriptId = 'doctoralia-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://platform.docplanner.com/js/widget.js';
      script.async = true;
      script.onload = () => setIsReady(true);
      document.body.appendChild(script);
    } else {
      setIsReady(true);
    }
  }, []);

  return isReady;
};