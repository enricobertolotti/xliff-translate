import Vue from "vue";
import App from "./App.vue";

import store from "@/store/store";

// Use bootstrap for vue
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

// Registering global components
import svgIcon from "@/components/micro/svgIcon.vue";
import divider from "@/components/micro/divider.vue";
Vue.component("svg-icon", svgIcon);
Vue.component("divider", divider);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
