<style lang="less">
    @import 'main.less';
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag
                        type="dot"
                        v-for="(item, index) in pageTagsList"
                        ref="tagsPageOpened"
                        :key="item.name"
                        :name="item.name"
                        @click.native="linkTo(item)"
                        :closable="item.name==='home'?false:true"
                >{{ (item.title) }}
                </Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'tagsPageOpened',
        data() {
            return {
                currentPageName: this.$route.name,
                tagBodyLeft: 0,
                refsTag: [],
                tagsCount: 1,
                pageTagsList: [{
                    title: '数据中心',
                    path: '',
                    name: 'bigdata'
                }, {
                    title: '应用中心',
                    path: '',
                    name: 'home'
                }]
            };
        },
        computed: {
            tagsList() {
                return [{
                    title: '应用中心',
                    path: '',
                    name: 'home'
                }];
            }
        },
        methods: {
            linkTo(item) {
                this.$router.push(item.name);
            },
            handlescroll(e) {
                var type = e.type;
                let delta = 0;
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
                }
                let left = 0;
                if (delta > 0) {
                    left = Math.min(0, this.tagBodyLeft + delta);
                } else {
                    if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                        if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                            left = this.tagBodyLeft;
                        } else {
                            left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                        }
                    } else {
                        this.tagBodyLeft = 0;
                    }
                }
                this.tagBodyLeft = left;
            },
            moveToView(tag) {
                if (tag.offsetLeft < -this.tagBodyLeft) {
                    // 标签在可视区域左侧
                    this.tagBodyLeft = -tag.offsetLeft + 10;
                } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                    // 标签在可视区域
                    this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
                } else {
                    // 标签在可视区域右侧
                    this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
                }
            }
        },
        mounted() {
            this.refsTag = this.$refs.tagsPageOpened;
            this.tagsCount = this.tagsList.length;
        },
        watch: {
            '$route'(to) {
                this.currentPageName = to.name;
                this.$nextTick(() => {
                    this.refsTag.forEach((item, index) => {
                        if (to.name === item.name) {
                            let tag = this.refsTag[index].$el;
                            this.moveToView(tag);
                        }
                    });
                });
                this.tagsCount = this.tagsList.length;
            }
        }
    };
</script>
