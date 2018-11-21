<template>
    <div :class="$style.root">
        <div :class="$style.banner">
            <div :class="$style.box">
                <ot-icon :class="$style.logo" v-bind="$otColors.logo" icon="logo" lib="font-ot" size="20em"></ot-icon>
                <p ot v-ot-bind="$otColors.logo" :class="$style.text">2O3T-UIKIT</p>
                <p ot v-ot-bind="$otColors.desc" disabled>基于模块化的解决方案，服务于个人产品的设计体系，让开发者专注于更好的用户体验。</p>
                <ot-link :class="$style.btn" href="//2o3t.github.io/2o3t-ui/">
                    <ot-button size="big" circle>GET STARTED</ot-button>
                </ot-link>
                <ot-link :class="$style.btn" href="//github.com/2o3t/">
                    <ot-button icon="github-fill" lib="font-ot" size="big" circle>GITHUB</ot-button>
                </ot-link>
            </div>
        </div>
        <div :class="$style.content">
            <application></application>
        </div>
        <h-footer></h-footer>
    </div>
</template>

<script>
import Application from './Application';
import HFooter from './Footer';
export default {
    otDefaultColors() {
        return {
            selected: [ 'pri-bg-sel', 'selected' ],
            logo: {
                normal: [ 'def-f' ],
            },
            desc: {
                disabled: [ 'def-f-dis' ],
            },
        };
    },
    components: {
        Application,
        HFooter,
    },
};
</script>

<style lang="scss" module>
.root {

    .banner {
        position: relative;
        height: 100vh;
        width: 100%;
        text-align: center;

        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .logo {
            line-height: 1;
        }

        .text {
            font-size: 5em;
            font-weight: bolder;
            margin: 0;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        .btn {
            margin: 2em 1em;
            display: inline-block;
        }
    }

    .content {
        max-width: 1080px;
        margin: auto;
    }
}
</style>
