import Vue from 'vue';
import App from './App.vue';

// import 'font-awesome/css/font-awesome.min.css';
import '2o3t-icon-font/dist/font-ot.css';

import '2o3t-ui/dist/OTUI.css';
import OTUI from '2o3t-ui';

const color = window.localStorage && window.localStorage.getItem('ot-color') || null;
Vue.use(OTUI, {
    global: true,
    color,
});

Vue.config.productionTip = false;

import router from '@router';

// test
import Shared from '@/shared';
Vue.use(Shared);
import Filters from '@/filters';
Vue.use(Filters);

const app = new Vue({
    router,
    render: h => h(App),
    /* 这句非常重要，否则预渲染将不会启动 */
    mounted() {
        // 解决移动端 hover 问题
        if (document) {
            document.body.addEventListener('touchstart', function() { });
        }
        document.dispatchEvent(new Event('render-event'));
    },
});

router.onReady(() => {
    app.$mount('#app');
});

