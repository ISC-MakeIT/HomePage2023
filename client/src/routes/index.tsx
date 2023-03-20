import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../components/pages';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
