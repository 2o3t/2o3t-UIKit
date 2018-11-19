<template>
    <div :class="$style.root">
        <h1 :class="$style.center" ot v-ot-bind="$otColors.title">UIKIT</h1>
        <p :class="[$style.center, $style.desc]" ot v-ot-bind="$otColors.desc" disabled>视觉UI组件库</p>
        <ot-row-group :fixable="false">
            <ot-card :class="$style.card" v-for="(item, index) in _applications" :key="index" round height="16em">
                <ot-link slot="top" target="_blank" :href="`//2o3t.github.io/${item.name}`">
                    <h3 ot v-ot-bind="$otColors.title" :class="$style.title">{{ item.name }}</h3>
                    <div ot v-ot-bind="$otColors.desc">{{ item.description }}</div>
                </ot-link>
                <div slot="bottom" ot v-ot-bind="$otColors.desc" :class="[$style.bottom, $style.desc]" disabled>
                    <ot-icon icon="code" lib="font-ot">{{ item.language }}</ot-icon>
                    <ot-icon :class="$style.time" icon="time-circle" lib="font-ot">{{ item.updated_at | DateFormat }}</ot-icon>
                </div>
            </ot-card>
        </ot-row-group>
        <div :class="$style.devide"></div>
        <h1 :class="$style.center" ot v-ot-bind="$otColors.title">OTHERS</h1>
        <p :class="[$style.center, $style.desc]" ot v-ot-bind="$otColors.desc" disabled>其他一些工具库</p>
        <ot-row-group :fixable="false">
            <ot-card :class="$style.card" v-for="(item, index) in _others" :key="index" round>
                <ot-link slot="top" disabled>
                    <h3 ot v-ot-bind="$otColors.title" :class="$style.title">{{ item.name }}</h3>
                    <div ot v-ot-bind="$otColors.desc">{{ item.description }}</div>
                </ot-link>
                <div slot="bottom" ot v-ot-bind="$otColors.desc" :class="[$style.bottom, $style.desc]" disabled>
                    <ot-icon icon="code" lib="font-ot">{{ item.language }}</ot-icon>
                    <ot-icon :class="$style.time" icon="time-circle" lib="font-ot">{{ item.updated_at | DateFormat }}</ot-icon>
                </div>
            </ot-card>
        </ot-row-group>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    otDefaultColors() {
        return {
            title: {
                normal: [ 'def-f-n' ],
            },
            desc: {
                normal: [ 'def-f' ],
                disabled: [ 'def-f-dis' ],
            },
        };
    },
    data() {
        return {
            url: 'https://api.github.com/users/2o3t/repos',
            result: null,
            ignores: [
                '2o3t-Templates',
                '2o3t-UIKit-Website',
                '2o3t.github.io',
            ],
            names: [
                '2o3t-ui',
                '2o3t-IconFont',
                '2o3t-CLI',
            ],
        };
    },
    computed: {
        _applications() {
            const result = this.result || {};
            return this.names.map(name => {
                return result[name] || {
                    name,
                };
            });
        },
        _others() {
            const ignores = this.ignores;
            const names = this.names;
            const result = this.result || {};
            return Object.keys(result).filter(name => {
                return !names.includes(name) && !ignores.includes(name);
            }).map(name => {
                return result[name] || {
                    name,
                };
            });
        },
    },
    methods: {
        async getRepos() {
            const url = this.url;
            const { data } = await axios.get(url);
            const result = {};
            data.forEach(item => {
                result[item.name] = item;
            });
            return result;
        },
    },
    async mounted() {
        this.result = await this.getRepos();
    },
};
</script>

<style lang="scss" module>
.root {

    .card {
        min-width: 0;
        width: 30%;
        margin: 1%;
        min-height: 16em;
        transition: all .4s;

        @media screen and (max-width: 767px) {
            width: 98%;
        }

        &:hover {
            transform: translateY(-2%);
            box-shadow: 1px 4px 10px 2px #CCC;
        }
    }

    .bottom {
        font-size: 0.8em;
    }

    .time {
        float: right;
    }

    .title {
        margin: 1em 0;
    }

    .center {
        text-align: center;
    }

    .desc[ot] {
        cursor: auto;
    }

    .devide {
        height: 10em;
    }
}
</style>
