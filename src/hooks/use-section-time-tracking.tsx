import { useEffect, useRef } from 'react';
import { trackTimeOnSection } from '@/lib/analytics';

/**
 * Hook para trackear tiempo que el usuario pasa en secciones clave
 *
 * Mejores prácticas:
 * - Solo trackea si el usuario pasa más de 30 segundos (indica interés real)
 * - Solo se activa para secciones críticas (Precios, Servicios, Contacto)
 * - No afecta el rendimiento al usar IntersectionObserver
 *
 * @param sectionId - ID de la sección a trackear
 * @param sectionName - Nombre de la sección para el evento
 * @param enabled - Si está habilitado el tracking (default: true)
 */
export const useSectionTimeTracking = (
  sectionId: string,
  sectionName: string,
  enabled: boolean = true,
) => {
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(false);
  const totalTimeRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    // Crear IntersectionObserver para detectar cuando la sección es visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Sección visible - empezar a contar tiempo
            if (!isVisibleRef.current) {
              isVisibleRef.current = true;
              startTimeRef.current = Date.now();
            }
          } else {
            // Sección no visible - acumular tiempo y resetear
            if (isVisibleRef.current && startTimeRef.current) {
              const timeSpent = (Date.now() - startTimeRef.current) / 1000; // en segundos
              totalTimeRef.current += timeSpent;
              isVisibleRef.current = false;
              startTimeRef.current = null;
            }
          }
        });
      },
      {
        threshold: 0.5, // Al menos 50% visible
        rootMargin: '0px',
      },
    );

    observerRef.current.observe(sectionElement);

    // Cleanup: cuando el componente se desmonta o la sección sale de vista
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Trackear tiempo acumulado antes de limpiar
      if (isVisibleRef.current && startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;
        totalTimeRef.current += timeSpent;
      }

      // Solo trackear si el tiempo total es significativo (>30 segundos)
      if (totalTimeRef.current > 30) {
        trackTimeOnSection(sectionName, totalTimeRef.current);
      }
    };
  }, [sectionId, sectionName, enabled]);
};
