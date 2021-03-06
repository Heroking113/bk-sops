# 架构设计

![](../resource/img/architecture.png)

这是标准运维的逻辑架构图，可以分为四层：

- API 网关层
主要负责通过API网关和第三方平台进行交互，标准运维插件的实际执行就是通过这一层把请求分发给依赖的系统。
- 流程引擎层
负责解析上层的任务实例，映射节点插件对应的服务，并通过底层的蓝鲸API网关调用其他系统的API（如配置平台的创建集群，作业平台的快速执行脚本等），
流程引擎还包括了具体的任务执行引擎和流程控制、上下文管理等模块。
- 任务管理层
主要对应标准运维的任务编排和任务控制功能，任务编排包含基础单元插件框架和插件展示层，任务控制包括创建任务实例的模板校验和参数校验，
以及任务实例执行时给用户提供的操作接口如暂停、继续、撤销任务等。
- 接入层
包含权限控制、API接口和数据统计等。