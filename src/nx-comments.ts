import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('nx-comments')
export class NxComments extends LitElement {

  /**
   * 评论当前文章或页面的id
   */
  @property({ type: String })
  postId: string = "";

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
  apiUrl!: string

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
   * 随机生成一个验证码
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

  render() {
    return html`
      <div id="nx-comments" class="nx-comments-wrap" >
        <section id="respond" role="form" class="nx-comments-respond">
          <div class="nx-comments-inner">

            <div class="nx-comments-visitor">
            <noscript>
              <p class="nx-comments-visitor-message">
                <strong>Please enable JavaScript to view the comments.</strong>
              </p>
            </noscript>
            <img src=${this.visitorAvatarUrl} data-src="${this.visitorAvatarUrl}" class="nx-comments-visitor-avatar" alt="visitor-default-avatar" height="42" width="42">
            </div>

            <form action="${this.apiUrl}/comment" method="post" class="nx-comments-form">

              <div class="nx-comments-form-author-info">
                <input type="text" name="author" id="nx-comments-author" value=${this.getUserCookie("authorName")} placeholder="Your name" required aria-required tabindex="1" size="20">
                <input type="email" name="email" id="nx-comments-email" value=${this.getUserCookie("authorEmail")} placeholder="Your email" required aria-required tabindex="2" size="20">
                <input type="url" name="url" id="nx-comments-url" value=${this.getUserCookie("authorUrl")} placeholder="Your website" tabindex="3" size="20">
              </div>

              <div class="nx-comments-form-textarea">
              <textarea id="nx-comments-commentarea" class="" name="comment" cols="45" rows="1" maxlength="65525" aria-required="true" required="required" tabindex="4" placeholder="Write your comment here..."></textarea>
              </div>

              <ul class="nx-comments-form-submit">
                <li class="nx-comments-form-captcha" style="${!this.needCaptcha && "display:none"}">
                  <input type="text" name="nx-comments-comment-validate" id="nx-comments-comment-validate" class="nx-comments-textinput nx-comments-textcenter" value="" size="10" placeholder="${this.generateCaptcha()}">
                </li>
                <li class="nx-comments-form-submit-cancel">
                  <a rel="nofollow" id="nx-comments-cancel-comment-reply-link" href="#nx-comments" style="display:none;">取消</a>
                </li>
                <li class="nx-comments-form-submit-action">
                  <button name="submit" type="submit" id="button" class="nx-comments-push-status" tabindex="5">提交</button>
                </li>
                <input type="hidden" name="nx-comments-comment-post-ID" value="${this.postId}" id="nx-comments-comment-post-ID">
                <input type="hidden" name="nx-comments-comment-parent" id="nx-comments-comment-parent" value="0">
              </ul>
            </form>

          </div>
        </section>
        <ol class="nx-comments-lists">

        </ol>
        <div class="nx-comments-pagination">

        </div>
      </div>
    `
  }


  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'nx-comments': NxComments
  }
}
