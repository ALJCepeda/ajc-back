import DecoratorManifest from "./DecoratorManifest";

export function HTTP(action:string, path:string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorManifest.recordHTTP(target.constructor, action, path, propertyKey);
  }
}

export function GET(path:string) {
  return HTTP('get', path);
}

export function POST(path:string) {
  return HTTP('post', path);
}
