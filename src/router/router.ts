import { IComponent } from "../components/Block";
import loginController from "../controllers/loginController";
import Route from "./route";

class Router {

  private static __instance: Router | null;

  private routes: Route[] = []
  private history = window.history
  private _currentRoute: Route | null = null
  private _rootQuery = ""

  constructor(rootQuery = ".root") {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }
  
  use( path:string, pageClass:IComponent ) {
    // let {path, pageClass} = componentAndRoute
    const route = new Route(path, pageClass, { rootQuery: this._rootQuery });
    console.log("use route", this._rootQuery, path);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      const pathName = (event.currentTarget as Window).location.pathname
      this._onRoute(pathName);
    };

    loginController.getUser().then(result => {
      console.log("userIsAuthorized", result)
      if(result) {
        this._onRoute(window.location.pathname);
      } else {
        this._onRoute("/");
      }
    })
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      throw new Error(`Path ${pathname} not found`)
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    
    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router; 