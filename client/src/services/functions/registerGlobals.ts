// https://webpack.js.org/guides/dependency-management/#require-context
import { VueConstructor } from 'vue/types/vue';

function registerGlobalComponents(Vue:VueConstructor) {
  const requireComponent = require.context('./../../global/components', true, /[\w-]+\.vue$/);
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split('-')
      .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join('');

    console.log(`Registered Component: ${componentName}`);
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}

function registerGlobalFilters(Vue:VueConstructor) {
  const requireFilters = require.context('./../../global/filters', true, /[\w-]+\.ts$/);

  requireFilters.keys().forEach(fileName => {
    const filterConfig = requireFilters(fileName);
    const filterName = fileName.replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split('-')
      .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join('');

    console.log(`Registered Filter: ${filterName}`);
    Vue.filter(filterName, filterConfig.default || filterConfig);
  });
}

export default function registerGlobals(Vue:VueConstructor) {
  registerGlobalComponents(Vue);
  registerGlobalFilters(Vue);
}
