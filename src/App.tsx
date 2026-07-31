import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from '@/components/Header';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Shop from '@/pages/shop';
import RecordDetail from '@/pages/record-detail';
import Cart from '@/pages/cart';
import Mixtape from '@/pages/mixtape';
import BurningMan from '@/pages/burning-man';
import EscobarDJ from '@/pages/escobar-dj';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/record/:id" component={RecordDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/mixtape" component={Mixtape} />
        <Route path="/burning-man" component={BurningMan} />
        <Route path="/escobar-dj" component={EscobarDJ} />
        <Route component={NotFound} />
      </Switch>
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
