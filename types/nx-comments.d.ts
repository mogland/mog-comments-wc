import { LitElement } from 'lit';
/**
 * A Comments Component For NEXT WEB Theme
 */
export declare class NxComments extends LitElement {
    /**
     * 评论当前文章或页面的id
     */
    postId: string;
    /**
     * 每页显示的评论数量
     */
    pageSize: number;
    /**
     * 是否开启 OwO 选择器
     */
    owoSelectorState?: Boolean;
    /**
     * 是否开启 Emoji 选择器
     */
    emojiSelectorState?: Boolean;
    /**
     * OwO 表情配置文件链接
     */
    owoUrl?: string;
    /**
     * 游客默认头像链接
     */
    visitorAvatarUrl?: string;
    /**
     * 服务端 API 链接
     */
    apiUrl: string;
    /**
     * 是否需要算数验证（仅前端方面验证）
     */
    needCaptcha?: Boolean;
    /**
     * 算数验证范围（默认 从0到100）
     */
    captchaRange: number;
    /**
     * 当前评论列表的页码
     */
    page: number;
    /**
     * 当前回复评论的父级评论
     */
    parent: any;
    /**
     * 随机生成验证码
     */
    generateCaptcha(): string;
    /**
     * validateCaptcha 校验验证码
     * @returns Boolean
     */
    validateCaptcha(): boolean;
    /**
     * getUserCookie 获取nx-comments中user字段的某一个值
     * @param name cookie名称
     * @returns cookie值
     */
    getUserCookie(name: string): any;
    getAvatarFromEmail(email: string): string;
    returnCommentsItemsAndChildrens(data: any): any;
    PageLessThenTotalPage(): Promise<boolean>;
    private getComments;
    private commentList;
    render(): import("lit").TemplateResult<1>;
    changeCommentListPage(page: number): void;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'nx-comments': NxComments;
    }
}
