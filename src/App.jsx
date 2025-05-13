import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';
import { ModalProvider } from './contexts/ModalContext';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </NavigationScroll>
    </ThemeCustomization>
  );
}
