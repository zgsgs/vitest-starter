import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../App.vue";
import { sleep } from "../../test/utils";
import { posts, comments } from "../../test/mocks/server/handlers";

describe("App.vue", () => {
  it("should render success", async () => {
    const wrapper = mount(App);

    await sleep(200);

    expect(wrapper.html()).toMatchSnapshot();

    // 断言文章列表标题是否存在
    expect(wrapper.text()).contain("文章列表");

    // 断言文章列表数
    expect(wrapper.findAll(".post-item").length).toBe(posts.length);
  });

  it("should load comments succeed when click load comments button", async () => {
    const wrapper = mount(App);

    const loadCommentsBtn = wrapper.find(".load-comment-button");

    // 断言该按钮是否存在
    expect(loadCommentsBtn.exists()).toBe(true);

    // 触发点击事件
    loadCommentsBtn.trigger("click");

    await sleep(200);

    expect(wrapper.findAll(".comment-item").length).toBe(comments.length);
  });
});
