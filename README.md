



## 欢迎使用 headscale admin



这是一个 `headscale` 的Web管理平台，由 `Nextjs` 构建。


### 开始开发
1. 复制 `.env.example` 保存为 `.env.local`
2. 修改 `.env.local` 文件中所必须的环境变量
3. 安装依赖 `bun install`
4. 启动服务 `bun -b run dev`



### 为什么选择Nextjs而不是纯前端方案？

- 纯前端方案一般会把 `ApiKey` 存储到前端浏览器本地，这会造成一定的安全性问题。
- 更换PC或者浏览器后需要重新验证 `ApiKey`。
- 方便后期由 `Nodejs` 通过命令的方式调用 `headscale`，从而实现API之外的功能，例如ACL编辑和版本管理、服务重启、子路由等。
- 方便后期在应用层实现独立的用户系统和权限控制，可由用户独立控制自己的设备，也可由管理员进行统一管理而不必暴露 `ApiKey`。



### 后面的规划

- 优先实现官方Api实现的内容，例如：机器、用户、标签等。
- 独立的用户和权限划分。
- 等等
