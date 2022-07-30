import { LitElement } from 'lit';
/**
 * A Comments Component For NEXT WEB Theme
 */
export declare class NxComments extends LitElement {
    private animateController;
    /**
     * email 评论者邮箱
     */
    private email;
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
     * messagePopup 信息弹窗
     * @param message 信息内容
     */
    private messagePopup;
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
    /**
     * getAvatarFromEmail 获取头像链接
     * @param email 用户邮箱
     */
    getAvatarFromEmail(email: string): string;
    /**
     * returnCommentsItemsAndChildrens 返回评论列表
     * @param data 评论数据
     * @param children 是否有子评论
     */
    returnCommentsItemsAndChildrens(data: any, children?: Boolean): any;
    PageLessThenTotalPage(): Promise<boolean>;
    /**
     * getComments 获取评论列表
     */
    private getComments;
    /**
     * commentList 评论列表
     */
    private commentList;
    /**
     * commentForm 评论表单
     * @param actionUrl 评论提交的url
     * @param id 评论id
     * @returns 评论表单
     */
    private commentForm;
    render(): import("lit").TemplateResult<1>;
    private changeCommentListPage;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'nx-comments': NxComments;
    }
}
