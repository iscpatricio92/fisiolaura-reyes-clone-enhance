import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook para manejar navegación con hash y tracking en GA4
 * Actualiza la URL con el hash cuando se navega a una sección (click o scroll)
 * y trackea los cambios como pageviews en Google Analytics
 */
export const useHashNavigation = () => {
  const location = useLocation();
  const hasTrackedInitialHash = useRef(false);
  const currentHashRef = useRef<string>('');
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    // Función para obtener el nombre de la sección desde el hash
    const getSectionName = (hash: string): string => {
      const sectionMap: Record<string, string> = {
        '#inicio': 'Inicio',
        '#sobre-mi': 'Sobre mí',
        '#servicios': 'Servicios',
        '#precios': 'Precios',
        '#opiniones': 'Opiniones',
        '#faqs': 'FAQs',
        '#contacto': 'Contacto',
      };
      return sectionMap[hash] || hash.substring(1);
    };

    // Función para manejar clicks en enlaces con hash
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (!link || !link.hash || link.hash === '#') return;

      const hash = link.hash;
      const targetId = hash.substring(1); // Remover el #
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        
        // Actualizar la URL con el hash usando history.pushState
        // Esto permite que GA4 trackee el cambio como una nueva página
        const newUrl = `${location.pathname}${hash}`;
        window.history.pushState(null, '', newUrl);

        // Hacer scroll suave al elemento
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });

        // Trackear como pageview en GA4 después de un pequeño delay
        // para asegurar que el scroll se complete
        const sectionName = getSectionName(hash);
        setTimeout(() => {
          trackPageView(newUrl, `${document.title} - ${sectionName}`);
        }, 300);
      }
    };

    // Agregar listener a todos los clicks en enlaces con hash
    document.addEventListener('click', handleHashClick, true);

    return () => {
      document.removeEventListener('click', handleHashClick, true);
    };
  }, [location.pathname]);

  // Manejar cambios de hash en la URL (navegación del navegador, back/forward)
  useEffect(() => {
    const getSectionName = (hash: string): string => {
      const sectionMap: Record<string, string> = {
        '#inicio': 'Inicio',
        '#sobre-mi': 'Sobre mí',
        '#servicios': 'Servicios',
        '#precios': 'Precios',
        '#opiniones': 'Opiniones',
        '#faqs': 'FAQs',
        '#contacto': 'Contacto',
      };
      return sectionMap[hash] || hash.substring(1);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#') {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Scroll suave al elemento
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });

          // Trackear como pageview
          const fullPath = `${location.pathname}${hash}`;
          const sectionName = getSectionName(hash);
          setTimeout(() => {
            trackPageView(fullPath, `${document.title} - ${sectionName}`);
          }, 300);
        }
      }
    };

    // Si hay un hash al cargar la página, hacer scroll y trackear (solo una vez)
    if (window.location.hash && !hasTrackedInitialHash.current) {
      hasTrackedInitialHash.current = true;
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        handleHashChange();
      }, 500);
    }

    // Listener para cambios de hash (back/forward del navegador)
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location.pathname]);

  // Detectar scroll y actualizar hash cuando una sección entra en el viewport
  useEffect(() => {
    // Solo activar en la página principal
    if (location.pathname !== '/') return;

    const getSectionName = (hash: string): string => {
      const sectionMap: Record<string, string> = {
        '#inicio': 'Inicio',
        '#sobre-mi': 'Sobre mí',
        '#servicios': 'Servicios',
        '#precios': 'Precios',
        '#opiniones': 'Opiniones',
        '#faqs': 'FAQs',
        '#contacto': 'Contacto',
      };
      return sectionMap[hash] || hash.substring(1);
    };

    // Obtener todas las secciones con IDs
    const sections = [
      { id: 'inicio', hash: '#inicio' },
      { id: 'sobre-mi', hash: '#sobre-mi' },
      { id: 'servicios', hash: '#servicios' },
      { id: 'precios', hash: '#precios' },
      { id: 'opiniones', hash: '#opiniones' },
      { id: 'faqs', hash: '#faqs' },
      { id: 'contacto', hash: '#contacto' },
    ];

    // Función para actualizar hash y trackear
    const updateHashAndTrack = (hash: string, sectionName: string) => {
      // Evitar actualizar si ya estamos en ese hash
      if (currentHashRef.current === hash) return;

      currentHashRef.current = hash;
      const newUrl = `${location.pathname}${hash}`;
      
      // Actualizar URL sin hacer scroll (ya estamos scrolleando)
      window.history.replaceState(null, '', newUrl);

      // Trackear en GA4 con un pequeño delay para evitar múltiples trackings
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        trackPageView(newUrl, `${document.title} - ${sectionName}`);
        scrollTimeoutRef.current = null;
      }, 500);
    };

    // Crear IntersectionObserver para cada sección
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Solo actualizar si la sección está visible y es la más prominente
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              // Verificar que esta sección esté más arriba en el viewport que otras
              const rect = entry.boundingClientRect;
              const isTopSection = rect.top >= 0 && rect.top < window.innerHeight * 0.5;

              if (isTopSection && !isScrollingRef.current) {
                const sectionName = getSectionName(section.hash);
                updateHashAndTrack(section.hash, sectionName);
              }
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7], // Múltiples thresholds para mejor detección
          rootMargin: '-20% 0px -50% 0px', // Solo considerar cuando está en la parte superior del viewport
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Detectar cuando el usuario está scrolleando
    let scrollTimer: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      isScrollingRef.current = true;
      
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        isScrollingRef.current = false;
        scrollTimer = null;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, [location.pathname]);
};
