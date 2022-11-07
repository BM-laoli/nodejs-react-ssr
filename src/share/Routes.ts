import About from '../page/about';
import Home from '../page/Home';

export enum RouterAlisa {
  home = '/home',
  about = '/about',
}

const Routes = {
  [RouterAlisa.home]: Home,
  [RouterAlisa.about]: About,
};

export default Routes;
