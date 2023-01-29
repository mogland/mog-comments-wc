import { Component, Fragment, JwcComponent, Prop, h } from 'jwcjs'
import md5 from 'md5'
import styles from './App.css?inline'

@Component({
  name: 'mog-comments',
  css: styles,
})
export class App extends JwcComponent {
  constructor() {
    super()
  }

  @Prop({})
  private pid: string

  @Prop({})
  private api: string

  @Prop({ default: [] })
  private list: any

  @Prop({ default: {} })
  private data: any

  private getCommentPostData() {
    return {
      ...this.data,
      pid: this.pid,
      author: this.data.name,
    }
  }

  private async postComment() {
    const data = this.getCommentPostData()
    let isFailed = false
    if (!this.pid || !this.api) {
      isFailed = true
    }
    if (!data.name || !data.email || !data.text) {
      isFailed = true
    }
    if (isFailed) {
      console.group('❌ mog-comments: Failed to post comment')
      ;['name', 'email', 'text'].forEach((key) => {
        if (!data[key]) {
          console.log(`❓ ${key} is not provided, but it is required.`)
        }
      })
      if (!this.pid) {
        console.log('❓ pid is not provided, but it is required.')
      }
      if (!this.api) {
        console.log('❓ api is not provided, but it is required.')
      }
      console.groupEnd()
      return
    }
    const res = await fetch(
      `${this.api?.replace(/\/$/, '')}/comments${
        this.data.replyID ? `/${this.data.replyID}` : ''
      }`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const json = await res.json()
    if (json?.code === 200) {
      console.group('✅ mog-comments: Comment is posted.')
      console.log(json)
      console.groupEnd()
      this.getCommentList()
    }
    this.data.text = ''
  }

  private getCommentList() {
    fetch(`${this.api?.replace(/\/$/, '')}/comments/${this.pid}`)
      .then((res) => res.json())
      .then((json) => {
        this.list = json?.data || []
        console.group('✅ mog-comments: Comment list is loaded.')
        console.log(json)
        console.log(this.list)
        console.groupEnd()
      })
      .catch((err) => {
        console.group('❌ mog-comments: Failed to get comment list')
        console.log(err)
        console.groupEnd()
      })
  }

  override connectedCallback() {
    super.connectedCallback()
    const storage = window.localStorage.getItem('mog-comments-author-info')
    if (storage) {
      this.data = JSON.parse(storage)
    }
    console.log('mog-comments: Author info is loaded from local storage.')
    this.getCommentList()
    const document = this.shadowRoot
    const PickerScript = document.getElementById(
      'emoji-picker',
    ) as HTMLScriptElement
    PickerScript.onload = () => {
      this.initEmojiPicker()
      console.log('mog-comments: Emoji picker is initialized.')
    }
  }

  private initEmojiPicker() {
    const pickerOptions = {
      onEmojiSelect: (emoji: any) => {
        const input = document.querySelector('.textarea') as HTMLTextAreaElement
        input.value += emoji.native
        input.focus()
      },
      previewPosition: 'top',
      onClickOutside: () => {
        document.getElementById('emoji-picker-c').removeChild(picker)
        document.getElementById('emoji-picker-c').classList.toggle('show')
        document.getElementById('emoji-picker-c').classList.toggle('hide')
      },
    }
    const picker = new (window as any).EmojiMart.Picker(pickerOptions)
    const document = this.shadowRoot
    const emojiButton = document.querySelector('.time') as HTMLButtonElement
    emojiButton.addEventListener('click', () => {
      document.getElementById('emoji-picker-c').classList.toggle('show')
      document.getElementById('emoji-picker-c').classList.toggle('hide')
      if (
        document.getElementById('emoji-picker-c').classList.contains('show')
      ) {
        document.getElementById('emoji-picker-c').appendChild(picker)
      } else {
        document.getElementById('emoji-picker-c').removeChild(picker)
      }
    })
  }

  private mailAvatar(mail: string) {
    const mailAvatar = (mail: string) => {
      const md5Mail = md5(mail)
      return `https://cravatar.cn/avatar/${md5Mail}`
    }
    return mailAvatar(mail)
  }

  public override render() {
    return (
      <>
        <script
          src="https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js"
          id="emoji-picker"
        ></script>
        <div class="comment-form-header">
          <div class="comment-form-header-left">
            <div class="comment-form-avatar">
              <img
                class="avatar"
                src="https://github.com/wibus-wee.png"
                alt="avatar"
              />
            </div>
            <div class="comment-form-author">
              <input
                type="text"
                class="author"
                name="comment[author]"
                aria-label="Author"
                placeholder="Author"
                aria-describedby="comment-field-error"
                aria-invalid="false"
                value={this.data?.name || ''}
                onChange={(e) => {
                  this.data.name = e.target.value
                  window.localStorage.setItem(
                    'mog-comments-author-info',
                    JSON.stringify(this.data),
                  )
                }}
              />
            </div>
            <div class="comment-form-author-email">
              <span class="author-email">
                <input
                  type="text"
                  name="comment[author_email]"
                  aria-label="Email"
                  placeholder="Email"
                  aria-describedby="comment-field-error"
                  aria-invalid="false"
                  value={this.data?.email || ''}
                  onChange={(e) => {
                    this.data.email = e.target.value
                    window.localStorage.setItem(
                      'mog-comments-author-info',
                      JSON.stringify(this.data),
                    )
                  }}
                />
              </span>
            </div>
            <div class="comment-form-author-website">
              <span class="author-email">
                <input
                  type="text"
                  name="comment[author_website]"
                  aria-label="URL"
                  placeholder="URL"
                  aria-describedby="comment-field-error"
                  aria-invalid="false"
                  value={this.data?.url || ''}
                  onChange={(e) => {
                    this.data.url = e.target.value
                    window.localStorage.setItem(
                      'mog-comments-author-info',
                      JSON.stringify(this.data),
                    )
                  }}
                />
              </span>
            </div>
          </div>
          <div class="comment-form-header-right">
            <div class="comment-form-time">
              <button class="time">Emoji 😜</button>
            </div>
            <div id="emoji-picker-c" class="hide" />
          </div>
        </div>
        <div class="comment-form-body">
          <textarea
            class="textarea"
            name="comment[body]"
            aria-label="Comment body"
            placeholder="Leave a comment"
            aria-describedby="comment-field-error"
            aria-invalid="false"
            rows={1}
            onChange={(e) => {
              this.data.text = e.target.value
            }}
            value={this.data?.text || ''}
          />
        </div>
        <div class="tabs position-right">
          <div class="" role="tablist">
            <button
              type="button"
              class="tab"
              aria-selected="true"
              tabIndex={0}
              id="send-comment"
              onClick={async (e) => {
                e.preventDefault()
                e.currentTarget.classList.add('active')
                e.currentTarget.blur()
                await this.postComment()
                  .then(() => {
                    this.data.text = ''
                  })
                  .finally(() => {
                    const document = this.shadowRoot
                    const target = document.getElementById('send-comment')
                    setTimeout(() => {
                      target.classList.remove('active')
                    }, 1000)
                  })
              }}
            >
              <span>发送</span>
            </button>
          </div>
        </div>
        <div class="comment-form-children">
          <div class="comment-list">
            {this.list?.map((item: any) => {
              return (
                <div class="comment-item">
                  <div class="comment-item-header">
                    <div class="comment-item-avatar">
                      <img
                        class="avatar"
                        src={this.mailAvatar(item.email)}
                        alt="avatar"
                      />
                    </div>
                    <div class="comment-item-info">
                      <div class="comment-item-name">
                        {item.name}
                        <div class="comment-item-reply">
                          <button class="reply">回复</button>
                        </div>
                      </div>
                      <div class="comment-item-time">
                        {new Date(item.created).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div class="comment-item-content">{item.text}</div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}
