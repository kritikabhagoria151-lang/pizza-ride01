import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import ChatBot from '@/components/ChatBot';
import Seo from '@/components/Seo';

const MenuPage = lazy(() => import('@/pages/MenuPage'));
const WhyUs = lazy(() => import('@/pages/WhyUs'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const LocationPage = lazy(() => import('@/pages/LocationPage'));
const NotFound = lazy(() => import('@/pages/not-found'));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="min-h-screen grid place-items-center text-muted-foreground" role="status" aria-live="polite">
      Loading…
    </div>
  );
}

function Router() {
  return (
    <>
      <Seo />
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/why-us" component={WhyUs} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/location" component={LocationPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
        <ChatBot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;