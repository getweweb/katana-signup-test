<template>
    <div class="katana-signup">
        <!-- wwManager:start -->
        <wwSectionEditMenu :sectionCtrl="sectionCtrl"></wwSectionEditMenu>
        <!-- wwManager:end -->
        <wwObject :ww-object="section.data.background" class="background" ww-category="background"></wwObject>

        <div class="section-container">
            <div class="content">
                <div id="login-container"></div>
            </div>
            <wwLayoutColumn tag="div" ww-default="ww-columns" :ww-list="section.data.columns" class="wwobjects-wrapper" @ww-add="add($event)" @ww-remove="remove($event)">
                <wwObject v-for="columns in section.data.columns" :key="columns.uniqueId" :ww-object="columns"></wwObject>
            </wwLayoutColumn>
        </div>
    </div>
</template>

<script>
import { authOptions } from "./constants";
import { signupForm } from "./forms/signup-form";

export default {
    name: "__COMPONENT_NAME__",
    props: {
        sectionCtrl: Object
    },
    data() {
        return {};
    },
    computed: {
        section() {
            return this.sectionCtrl.get();
        }
    },
    methods: {
        initData() {
            //Init objects
            let needUpdate = false;
            if (!this.section.data.background) {
                this.section.data.background = wwLib.wwObject.getDefault({
                    type: "ww-color",
                    data: { color: "white" }
                });
                needUpdate = true;
            }
            if (_.isEmpty(this.section.data.columns)) {
                this.section.data.columns = [];
                needUpdate = true;
            }

            if (needUpdate) {
                this.sectionCtrl.update(this.section);
            }
        },
        /* wwManager:start */
        add(options) {
            if (_.isEmpty(this.section.data.columns)) {
                this.section.data.columns = [];
            }

            this.section.data.columns.splice(options.index, 0, options.wwObject);

            this.sectionCtrl.update(this.section);
        },
        remove(options) {
            if (_.isEmpty(this.section.data.columns)) {
                this.section.data.columns = [];
            }

            this.section.data.columns.splice(options.index, 1);

            this.sectionCtrl.update(this.section);
        }
        /* wwManager:end */
    },
    created() {
        this.initData();
    },
    mounted() {
        if (!window.__WW_IS_PRERENDER__) {
            signupForm(authOptions.production);
        }
    }
};
</script>

<style lang="scss" scoped>
.katana-signup {
    padding: 80px 45px;
    position: relative;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .section-container {
        display: flex;
        width: 80%;
        margin-left: 10%;
        z-index: 1;
        position: relative;

        .content {
            flex-basis: 35%;
        }

        .wwobjects-wrapper {
            padding-left: 5%;
            flex-basis: 60%;
            min-height: 100%;
        }
    }
    @media (max-width: 992px) {
        padding: 80px 30px;

        .section-container {
            flex-wrap: wrap;
            width: 100%;
            padding: 0;
            margin: 0;
            .content {
                flex-basis: 100%;
            }

            .wwobjects-wrapper {
                padding-top: 40px;
                flex-basis: 100%;
            }
        }
    }

    &::v-deep {
        .auth0-lock.auth0-lock .auth0-lock-cred-pane {
            background: transparent;
        }
        .auth0-lock.auth0-lock .auth0-lock-cred-pane-internal-wrapper {
            height: auto;
        }
        .auth0-lock.auth0-lock .auth0-lock-header {
            display: none;
        }

        .auth0-lock.auth0-lock .auth0-lock-submit {
            border-radius: 5px;
            padding: 2px;
        }
        .auth0-lock-content-wrapper {
            overflow: visible !important;
        }
    }
}
</style>
