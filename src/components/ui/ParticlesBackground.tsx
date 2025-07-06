import { useEffect } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    tsParticles: {
      load: (id: string, options: unknown) => void;
    };
  }
}

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const loadParticles = () => {
      if (!window.tsParticles) return;

      window.tsParticles.load('tsparticles', {
        background: {
          color: { value: 'transparent' },
        },
        particles: {
          color: {
            value: resolvedTheme === 'dark' ? '#d1d5db' : '#4b5563',
          },
          links: {
            enable: true,
            color: resolvedTheme === 'dark' ? '#9ca3af' : '#6b7280',
          },
          move: {
            enable: true,
            speed: 0.3,
          },
          number: {
            value: 60,
          },
          size: {
            value: 1,
          },
        },
        fullScreen: {
          enable: false,
        },
      });
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2.11.1/tsparticles.min.js';
    script.async = true;
    script.onload = loadParticles;

    document.body.appendChild(script);

    return () => {
      const container = document.getElementById('tsparticles');
      if (container) container.innerHTML = '';
    };
  }, [resolvedTheme]);

  return (
    <div
      id="tsparticles"
      className="fixed inset-0 -z-10 transition-colors duration-500"
    />
  );
}
