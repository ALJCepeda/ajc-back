class HTTPCache {
  routes: Map<string, Map<string, any>> = new Map();

  getRouteMap(url:string) {
    if(!this.routes.has(url)) {
      this.routes.set(url, new Map());
    }

    return this.routes.get(url) as Map<string, any>;
  }

  saveGet(url:string, query:any, resp:any) {
    const routeMap = this.getRouteMap(url);
    const queryStr = JSON.stringify(query);
    routeMap.set(queryStr, resp);
  }
}

