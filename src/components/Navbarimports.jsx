import React, { useEffect } from 'react';

function LoadScripts() {
  useEffect(() => {
    const addScript = (src, integrity, crossOrigin) => {
      const script = document.createElement('script');
      script.src = src;
      script.integrity = integrity;
      script.crossOrigin = crossOrigin;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    const jqueryCleanup = addScript(
      'https://code.jquery.com/jquery-3.3.1.slim.min.js',
      'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
      'anonymous'
    );
    const popperCleanup = addScript(
      'https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js',
      'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49',
      'anonymous'
    );
    const bootstrapCleanup = addScript(
      'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js',
      'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',
      'anonymous'
    );

    // Cleanup functie
    return () => {
      jqueryCleanup();
      popperCleanup();
      bootstrapCleanup();
    };
  }, []);

  return null;
}

export default LoadScripts;
