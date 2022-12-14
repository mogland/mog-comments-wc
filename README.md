# Mog Comments WC. V0.1.0

>  一个为 Mog 前端主题打造的评论区 web component
>
> A Comment Web Component for NEXT web

<img src="https://img.shields.io/github/package-json/v/nx-space/nx-comments-wc" referrerpolicy="no-referrer" alt="version"><a href="https://wakatime.com/badge/user/5c293fcd-9bec-4609-946b-c06b5fbf192c/project/5d18f975-b56c-4884-83ab-84e46a3a76cb"><img src="https://wakatime.com/badge/user/5c293fcd-9bec-4609-946b-c06b5fbf192c/project/5d18f975-b56c-4884-83ab-84e46a3a76cb.svg" alt="wakatime"></a>

## Usage

```bash
# pnpm manager (recommended)
pnpm i @nx-space/nx-comments-wc
# npm manager
npm i @nx-space/nx-comments-wc
# yarn manager
yarn add @nx-space/nx-comments-wc
```

### By CDN

See [demo/index.html](./demo/index.html)

```html
<!-- jsDelivr CDN -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nx-space/nx-comments-wc@latest"></script>

<nx-comments></nx-comments>
```

### By npm

```ts
// main.ts
import '@nx-space/nx-comments-wc';
```

```html
<nx-comments></nx-comments>
```

## API

### Example

```html
<nx-comments owo=true apiUrl="https://api.example.com/api/v1/comments" pageSize=10 page=1 postId=".."></nx-comments>
```

<!-- wc-api:start -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
### `src/nx-comments.ts`:

#### class: `NxComments`

##### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

##### Fields

| Name                 | Privacy | Type                   | Default                                                        | Description       | Inherited From |
| -------------------- | ------- | ---------------------- | -------------------------------------------------------------- | ----------------- | -------------- |
| `postId`             |         | `string`               | `"62d5235ff357ec0d12b68ea6"`                                   | 评论当前文章或页面的id      |                |
| `pageSize`           |         | `number`               | `10`                                                           | 每页显示的评论数量         |                |
| `owoSelectorState`   |         | `Boolean \| undefined` | `true`                                                         | 是否开启 OwO 选择器      |                |
| `emojiSelectorState` |         | `Boolean \| undefined` | `true`                                                         | 是否开启 Emoji 选择器    |                |
| `owoUrl`             |         | `string \| undefined`  |                                                                | OwO 表情配置文件链接      |                |
| `visitorAvatarUrl`   |         | `string \| undefined`  | `` `https://cravatar.cn/avatar/${this.email}?s=86&d=mm&r=g` `` | 游客默认头像链接          |                |
| `apiUrl`             |         | `string`               | `'http://127.0.0.1:3333'`                                      | 服务端 API 链接        |                |
| `needCaptcha`        |         | `Boolean \| undefined` | `false`                                                        | 是否需要算数验证（仅前端方面验证） |                |
| `captchaRange`       |         | `number`               | `100`                                                          | 算数验证范围（默认 从0到100） |                |
| `page`               |         | `number`               | `1`                                                            | 当前评论列表的页码         |                |
| `parent`             |         |                        | `null`                                                         | 当前回复评论的父级评论       |                |

##### Events

| Name                       | Type          | Description | Inherited From |
| -------------------------- | ------------- | ----------- | -------------- |
| `change-comment-list-page` | `CustomEvent` |             |                |

<hr/>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- wc-api:end -->

## Develop

```bash
pnpm ci # it can install dependencies with lock file
```

## Custom Styles

全部类名与ID几乎都以 `nx-comments-` 开头，防止和其他组件冲突。

## Stack

- [Lit](https://github.com/lit/lit/) 

## Reference

This Project refered to: 

- Inspire -- A WordPress Theme
- [wc-github-corners](https://github.com/YunYouJun/wc-github-corners) -- By YunYouJun

## License

此项目 AGPLv3 授权开源，使用此项目进行的二次创作或者衍生项目也必须开源。

## Author

MogLand © Wibus, Released under the AGPL-3.0 License. Created on 2022-7-27

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)

