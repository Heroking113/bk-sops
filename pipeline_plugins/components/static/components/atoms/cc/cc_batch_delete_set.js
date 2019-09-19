/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
 * Edition) available.
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
(function () {
    $.atoms.cc_batch_delete_set = [
        {
            tag_code: "biz_cc_id",
            type: "select",
            attrs: {
                name: gettext("业务"),
                hookable: true,
                remote: true,
                remote_url: $.context.get('site_url') + 'pipeline/cc_get_business_list/',
                remote_data_init: function (resp) {
                    return resp.data;
                },
                disabled: !$.context.canSelectBiz(),
                validation: [
                    {
                        type: "required"
                    }
                ]
            },
            methods: {
                _tag_init: function () {
                    this.value = $.context.canSelectBiz() ? $.context.get('bk_biz_id') : ''
                }
            }
        },
        {
            tag_code: "cc_set_select",
            type: "tree",
            attrs: {
                name: gettext("集群"),
                hookable: true,
                remote: true,
                remote_url: function () {
                    url = $.context.canSelectBiz() ? $.context.get('site_url') + 'pipeline/cc_search_topo/set/normal/' + $.context.get('bk_biz_id') + '/' : '';
                    return url;
                },
                remote_data_init: function (resp) {
                    return resp.data;
                },
                validation: [
                    {
                        type: "required"
                    }
                ]
            },
            events: [
                {
                    source: "biz_cc_id",
                    type: "init",
                    action: function () {
                        cc_id = this.get_parent && this.get_parent().get_child('biz_cc_id').value;
                        this.columns = [];
                        if (cc_id !== '') {
                            this.remote_url = $.context.get('site_url') + 'pipeline/cc_search_topo/set/normal/' + cc_id + '/';
                            this.remoteMethod();
                        }
                    }
                },
                {
                    source: "biz_cc_id",
                    type: "change",
                    action: function (value) {
                        this._set_value('');
                        this.items = [];
                        if (value !== '') {
                            this.remote_url = $.context.get('site_url') + 'pipeline/cc_search_topo/set/normal/' + value + '/';
                            this.remoteMethod();
                        }
                    }
                }
            ],
            methods: {}
        }
    ]
})();