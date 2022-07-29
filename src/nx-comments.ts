import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { until } from 'lit/directives/until.js';

/**
 * A Comments Component For NEXT WEB Theme
 */
@customElement('nx-comments')
export class NxComments extends LitElement {

  /**
   * 评论当前文章或页面的id
   */
  @property({ type: String })
  postId: string = "62d5235ff357ec0d12b68ea6";

  /**
   * 每页显示的评论数量
   */
  @property({ type: Number })
  pageSize: number = 10;

  /**
   * 是否开启 OwO 选择器
   */
  @property({ type: Boolean })
  owoSelectorState?: Boolean = true

  /**
   * 是否开启 Emoji 选择器
   */
  @property({ type: Boolean })
  emojiSelectorState?: Boolean = true

  /**
   * OwO 表情配置文件链接
   */
  @property({ type: String || undefined })
  owoUrl?: string

  /**
   * 游客默认头像链接
   */
  @property({ type: String })
  visitorAvatarUrl?: string = 'https://www.gravatar.com/avatar/?d=identicon'

  /**
   * 服务端 API 链接
   */
  @property({ type: String })
  apiUrl: string = 'http://127.0.0.1:3333'

  /**
   * 是否需要算数验证（仅前端方面验证）
   */
  @property({ type: Boolean })
  needCaptcha?: Boolean = false

  /**
   * 算数验证范围（默认 从0到100）
   */
  @property({ type: Number })
  captchaRange: number = 100


  /**
   * 当前评论列表的页码
   */
  @property({ type: Number })
  page: number = 1

  /**
   * 当前回复评论的父级评论
   */
  @property({ type: String })
  parent = null as any

  /**
   * 随机生成验证码
   */
  generateCaptcha() {
    return `${Math.floor(Math.random() * this.captchaRange)} + ${Math.floor(Math.random() * this.captchaRange)} = ?`;
  }

  /**
   * validateCaptcha 校验验证码
   * @returns Boolean
   */
  validateCaptcha() {
    const captcha = document.getElementById("nx-comments-comment-validate") as HTMLInputElement;
    const captchaCaculate = (captcha.value as string).split("+").map(item => parseInt(item)).reduce((a, b) => a + b);
    if (captcha) {
      const captchaValue = captcha.value;
      if (captchaValue) {
        const captchaValueNumber = parseInt(captchaValue);
        if (captchaValueNumber === captchaCaculate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  /**
   * getUserCookie 获取nx-comments中user字段的某一个值
   * @param name cookie名称
   * @returns cookie值
   */
  getUserCookie(name: string) {
    // 先获取nx-comments的cookie
    let nxCommentsCookie = document.cookie.split(";").find(item => item.trim().startsWith("nx-comments="));
    if (nxCommentsCookie) {
      nxCommentsCookie = nxCommentsCookie.trim().split("=")[1];
      let userCookie = JSON.parse(nxCommentsCookie).userCookie;
      if (userCookie) {
        return userCookie[name];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getAvatarFromEmail(email: string) {
    return `https://cravatar.cn/avatar/${email}?s=86&d=mm&r=g`
  }

  returnCommentsItemsAndChildrens(data: any, children: Boolean = false) {
    let res: any = {};
    let result: any = [];
    data.forEach((item: any) => {
      res = html`
      <ol class="nx-comments-list ${children ? "nx-comments-list-children" : ""}" id="nx-comments-list-${item.id}">
          <li id="nx-comments-item-li-${item.id}" class="nx-comments-item">
            <div class="nx-comments-list-body-item" id="nx-comments-item-${item.id}">
              <div class="nx-comments-list-body-item-avatar">
              
                <a href=${item.url} rel="nofollow" target="_blank">
                  <noscript>
                    &lt;img src=${this.getAvatarFromEmail(item.email)} width="42" height="42" class="nx-comments-visitor-avatar"
                    alt="${item.author}"&gt;
                  </noscript>
                  <img src="${this.getAvatarFromEmail(item.email)}" data-src="${this.getAvatarFromEmail(item.email)}" width="42"
                    height="42" class="nx-comments-visitor-avatar" alt="${item.author}">
                </a>
              </div>

              <div class="nx-comments-list-body-item-contain-main">
                <div class="nx-comments-list-body-item-comment-meta">

                  <div class="nx-comments-list-body-item-comment-author" itemprop="author">
                    <a href="${item.url}" rel="nofollow" target="_blank" class="nx-comments-list-body-item-author-name">
                      ${item.author}
                    </a>
                    <span class="nx-comments-list-body-item-comment-reply" style="cursor: pointer;" @click=${() => {
                      // 从shadow dom中获取评论列表
                      this.shadowRoot!.getElementById(`nx-comments-respond-${item.id}`)!.style.display = "block";
                    }}>@TA</span>
                  </div>
                  <time class="nx-comments-list-body-item-comment-time" itemprop="datePublished" datetime="${item.created}">
                    ${item.created}
                  </time>
                </div>

                <div class="nx-comments-list-body-item-comment-content" itemprop="description">
                  ${item.text}
                </div>
              </div>
              ${
                this.commentForm(`/comment/reply/${item.id}`, item.id)
              }
            ${item.children.length > 0 && this.returnCommentsItemsAndChildrens(item.children, true) || ``}
            </div>
          </li>
          
        </ol>
      `
      result = result.concat(res);
    });
    return data.length ? result : ``;
  }


  async PageLessThenTotalPage() {
    const comments = await this.getComments()
    return this.page < comments.pagination.total_page
  }

  // 根据当前页码获取评论
  private getComments = async () => {
    return fetch(`${this.apiUrl}/comment/ref/${this.postId}?size=${this.pageSize}&page=${this.page}`)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.error(err)
        return
      })
  }
  @state()
  private commentList = async () => {
    return await this.getComments().then((res: any) => {
      return (res && res.data) && (
        html`<ol class="nx-comments-lists">
          ${this.returnCommentsItemsAndChildrens(res.data)}
        </ol>`
      ) || html``
    })
  }

  private commentForm = (actionUrl: string = `/comment`, id?: string) => {
    return html`
    <section id="nx-comments-respond${`-${id}` || ""}" role="form" class="nx-comments-respond" style="${ id ? `display: none;` : "" }">
    <div class="nx-comments-inner">
  
      <div class="nx-comments-visitor">
        <noscript>
          <p class="nx-comments-visitor-message">
            <strong>Please enable JavaScript to view the comments.</strong>
          </p>
        </noscript>
        <img src=${this.visitorAvatarUrl} data-src="${this.visitorAvatarUrl}" class="nx-comments-visitor-avatar"
          alt="visitor-default-avatar" height="42" width="42">
      </div>
      <form action="${this.apiUrl}${actionUrl}" method="post" id="nx-comments-form">
  
        <div class="nx-comments-form-author-info">
          <input type="text" name="author" id="nx-comments-author" value=${this.getUserCookie("authorName")}
            placeholder="Your name" required aria-required tabindex="1" size="20">
          <input type="email" name="email" id="nx-comments-email" value=${this.getUserCookie("authorEmail")}
            placeholder="Your email" required aria-required tabindex="2" size="20">
          <input type="url" name="url" id="nx-comments-url" value=${this.getUserCookie("authorUrl")}
            placeholder="Your website" tabindex="3" size="20">
        </div>
  
        <div class="nx-comments-form-textarea">
          <textarea id="nx-comments-commentarea" class="" name="comment" cols="45" rows="1" maxlength="65525"
            aria-required="true" required="required" tabindex="4" placeholder="Write your comment here..."></textarea>
        </div>
  
        <ul class="nx-comments-form-submit">
          <li class="nx-comments-form-captcha" style="${!this.needCaptcha && " display:none"}">
            <input type="text" name="nx-comments-comment-validate" id="nx-comments-comment-validate"
              class="nx-comments-textinput nx-comments-textcenter" value="" size="10"
              placeholder="${this.generateCaptcha()}">
          </li>
          <li class="nx-comments-form-submit-cancel">
            <a rel="nofollow" id="nx-comments-cancel-comment-reply-link" class="nx-comments-form-botton"  href="#nx-comments"
              style="${id ? "" : "display:none;"}" @click=${() => {
                this.shadowRoot!.getElementById(`nx-comments-respond-${id}`)!.style.display = "none";
              }}>取消</a>
          </li>
          <li class="nx-comments-form-submit-action">
            <button name="submit" type="submit" id="nx-comments-push-button"
              class="nx-comments-form-botton nx-comments-push-status" tabindex="5">提交</button>
          </li>
          <input type="hidden" name="nx-comments-comment-post-ID" value="${this.postId}" id="nx-comments-comment-post-ID">
          <input type="hidden" name="nx-comments-comment-parent" id="nx-comments-comment-parent" value="0">
        </ul>
      </form>
    </div>
  </section>
    `
  }

  override render() {
    return html`
      <div id="nx-comments" class="nx-comments-wrap" >

            ${this.commentForm()}
      
        ${until(this.commentList(), html`<span>Loading...</span>`)}


      <div class="nx-comments-pagination" >
        <div class="nx-comments-paging">
          ${this.page > 1 && html`
              <a class="nx-comments-paging-prev" @click=${() => { this.changeCommentListPage("prev") }}>上一页</a>
            ` || html``
          }
          <a class="nx-comments-paging-now">${this.page}</a>
          <a class="nx-comments-paging-next" @click=${() => { this.changeCommentListPage("next") }}>下一页</a>
        </div>
      </div>
        `
  }

  private changeCommentListPage(event: string) {
    event === "prev" ? this.page-- : this.page++
    this.dispatchEvent(new CustomEvent("change-comment-list-page"))
  }

  static styles = css`

  .nx-comments-wrap {
    font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", STHeiti, "WenQuanYi Micro Hei", Helvetica, Arial, sans-serif;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    font-weight: 500;
  }

  .nx-comments-wrap ol {
    list-style: none !important;
  }

  .nx-comments-wrap a {
    text-decoration: none !important;
  }

  .nx-comments-wrap a:hover {
    outline: 0 !important;
    text-decoration: none !important;
  }
  .nx-comments-wrap li {
    list-style: none !important;
  }
  
  .nx-comments-wrap {
    position: relative;
  }
  
  .nx-comments-respond {
    position: relative;
    z-index: 1;
    background-color: #fafafa;
  }
  
  .nx-comments-respond .nx-comments-inner {
    max-width: 800px;
    margin: auto;
    padding: 30px;
  }
  
  .nx-comments-visitor {
    position: relative;
    float: left;
  }
  
  .nx-comments-visitor-avatar {
    height: auto;
    border-radius: 100%;
    display: block;
    object-fit: cover;
  }
  
  #nx-comments-form {
    margin-left: 50px;
  }
  
  .nx-comments-form-author-info {
    display: block;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .nx-comments-form-author-info input {
    float: left;
    width: 32%;
    margin-right: 2%;
  }
  
  .nx-comments-form-author-info input#nx-comments-url {
    float: left;
    width: 32%;
    margin-right: 2%;
  }
  
  .nx-comments-form-textarea {
    position: relative;
    width: 100%;
  }
  
  .nx-comments-form-textarea textarea {
    font-size: 13px;
    line-height: 18px;
    width: 100%;
    min-height: 90px;
    overflow: hidden;
    transition: all .15s ease-in-out;
  }
  
  #nx-comments-form input,
  #nx-comments-form textarea {
    box-shadow: none;
    border: 1px solid #e1e8ed;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 12px;
    resize: none;
    color: #657786;
    -webkit-appearance: none;
    outline: 0;
  }

  #nx-comments-form input:focus,
  #nx-comments-form textarea:focus {
    border-color: #ccc;
  }
  
  .nx-comments-form-submit {
    font-size: 14px;
    text-align: right;
  }
  
  input#nx-comments-comment-validate {
    float: left;
    padding: 7px 8px;
    text-align: center;
  }
  
  .nx-comments-form-submit-cancel {
    margin-right: .2em;
    display: inline-block;
    vertical-align: middle;
  }
  
  .nx-comments-form-submit-cancel a {
    padding: 10px 22px;
    font-size: 15px;
  }
  
  .nx-comments-form-botton {
    opacity: .8;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-align: center;
    line-height: 1;
    padding: 10px 14px;
    margin: 0;
    display: inline-block;
    appearance: none;
    cursor: pointer;
    border: 0;
    border-radius: 999em;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition-property: all;
    transition-property: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    background: linear-gradient(left, rgba(137, 140, 123, 0.99), rgba(137, 140, 123, 0.99) 100%);
    background: -o-linear-gradient(left, rgba(137, 140, 123, 0.99), rgba(137, 140, 123, 0.99) 100%);
    background: -ms-linear-gradient(left, rgba(137, 140, 123, 0.99), rgba(137, 140, 123, 0.99) 100%);
    background: -moz-linear-gradient(left, rgba(137, 140, 123, 0.99), rgba(137, 140, 123, 0.99) 100%);
    background: -webkit-linear-gradient(left, rgba(137, 140, 123, 0.99), rgba(137, 140, 123, 0.99) 100%);
  }
  
  .nx-comments-form-submit-action {
    display: inline-block;
    vertical-align: middle;
  }
  
  #nx-comments-push-button.nx-comments-push-status {
    padding: 10px 22px;
    font-size: 15px;
  }
  
  .nx-comments-lists {
    position: relative;
  }
  
  .nx-comments-item {
    overflow: hidden;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid #f5f8fa;
  }
  
  .nx-comments-list-body-item {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 30px;
  }
  
  .nx-comments-list-body-item-avatar {
    position: relative;
    z-index: 1;
    float: left;
    padding: 8px 0;
    background-color: #fff;
  }
  
  .nx-comments-list-body-item-contain-main {
    margin-left: 52px;
  }
  
  .nx-comments-list-body-item-comment-meta {
    line-height: 1;
    padding-top: 8px;
  }
  
  .nx-comments-list-body-item-comment-author {
    font-size: 14px;
  }

  .nx-comments-list-body-item-author-name {
    color: #000;
    outline: 0;
  }

  .nx-comments-list-body-item-comment-reply {
    display: none;
    cursor: pointer;
    float: right;
    transition: all .2s ease-in-out !important;
    font-size: 12px;
    color: #fff;
    padding: 1px 5px;
    border-radius: 3px;
    line-height: 1.5;
    background: #898c7b;
    background: #898c7b; 
  }

  .nx-comments-list-body-item-contain-main:hover .nx-comments-list-body-item-comment-reply {
    display: block;
  }
  
  
  .nx-comments-list-body-item-comment-time {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #657786;
  }
  
  .nx-comments-list-body-item-comment-content {
    padding: 20px 20px 19px 0;
    font-size: 13px;
    color: #111;
  }

  .nx-comments-list ol, .nx-comments-list li {
    padding: 0;
  }
  
  .nx-comments-list-children li {
    border: 0;
  }

  .nx-comments-list .nx-comments-list-body-item::before {
      // content: "";
      width: 2px;
      background: rgb(137, 140, 123);
      left: 18px;
      height: 500%;
      padding-bottom: 10px;
      top: -100%;
      position: absolute;
  }
  
  .nx-comments-pagination {
    position: relative;
  }
  
  .nx-comments-paging {
    display: block;
    padding: 20px 2px;
    text-align: center;
    color: #8899a6;
    border-top: 1px solid #e1e8ed;
  }
  
  .nx-comments-paging-prev,
  .nx-comments-paging-next {
    font-size: 14px;
  }
  
  .nx-comments-paging-now {
    color: #ff007f;
    font-weight: 600;
  }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'nx-comments': NxComments
  }
}
