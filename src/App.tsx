import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Lazy load legal pages - they are rarely visited and don't need to be in initial bundle
const AvisoPrivacidad = lazy(() => import('@/pages/AvisoPrivacidad'));
const PoliticaCancelacion = lazy(() => import('@/pages/PoliticaCancelacion'));
const TerminosCondiciones = lazy(() => import('@/pages/TerminosCondiciones'));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/aviso-privacidad"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <AvisoPrivacidad />
            </Suspense>
          }
        />
        <Route
          path="/politica-cancelacion"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <PoliticaCancelacion />
            </Suspense>
          }
        />
        <Route
          path="/terminos-condiciones"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <TerminosCondiciones />
            </Suspense>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <WhatsAppFloatingButton />
    <PWAUpdatePrompt />
  </TooltipProvider>
);

export default App;
