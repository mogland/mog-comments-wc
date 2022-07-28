# NEXT Comments WC. `WIP`

>  一个为 NEXT 前端主题打造的评论区 web component
>
> A Comment Web Component for NEXT web

## Usage

```bash
npm i @nx-space/nx-comments-wc
yarn add @nx-space/nx-comments-wc
pnpm i @nx-space/nx-comments-wc
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

| Name                 | Privacy | Type                   | Default                                          | Description       | Inherited From |
| -------------------- | ------- | ---------------------- | ------------------------------------------------ | ----------------- | -------------- |
| `postId`             |         | `string`               | `""`                                             | 评论当前文章或页面的id      |                |
| `pageSize`           |         | `number`               | `10`                                             | 每页显示的评论数量         |                |
| `owoSelectorState`   |         | `Boolean \| undefined` | `true`                                           | 是否开启 OwO 选择器      |                |
| `emojiSelectorState` |         | `Boolean \| undefined` | `true`                                           | 是否开启 Emoji 选择器    |                |
| `owoUrl`             |         | `string \| undefined`  |                                                  | OwO 表情配置文件链接      |                |
| `visitorAvatarUrl`   |         | `string \| undefined`  | `'https://www.gravatar.com/avatar/?d=identicon'` | 游客默认头像链接          |                |
| `apiUrl`             |         | `string`               |                                                  | 服务端 API 链接        |                |
| `needCaptcha`        |         | `Boolean \| undefined` | `false`                                          | 是否需要算数验证（仅前端方面验证） |                |
| `captchaRange`       |         | `number`               | `100`                                            | 算数验证范围（默认 从0到100） |                |
| `page`               |         | `number`               | `1`                                              | 当前评论列表的页码         |                |
| `parent`             |         |                        | `null`                                           | 当前回复评论的父级评论       |                |

<hr/>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- wc-api:end -->

## Stack

- [Lit](https://github.com/lit/lit/) 

## License

此项目 AGPLv3 授权开源，使用此项目进行的二次创作或者衍生项目也必须开源。

## Author

nx-space © Wibus, Released under the AGPL-3.0 License. Created on 2022-7-27

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)

