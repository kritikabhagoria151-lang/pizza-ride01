import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import MenuPage from '@/pages/MenuPage';
import WhyUs from '@/pages/WhyUs';
import GalleryPage from '@/pages/GalleryPage';
import LocationPage from '@/pages/LocationPage';
import ChatBot from '@/components/ChatBot';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/why-us" component={WhyUs} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/location" component={LocationPage} />
      <Route component={NotFound} />
    </Switch>
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