import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BaseButton from "~/components/ui/BaseButton.vue";

describe("BaseButton", () => {
  it("renders with default props", async () => {
    const wrapper = await mountSuspended(BaseButton, {
      slots: {
        default: "Click me",
      },
    });
    expect(wrapper.text()).toContain("Click me");
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("renders as NuxtLink when href is provided without external", async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        href: "/about",
      },
      slots: {
        default: "About",
      },
    });
    expect(wrapper.find("a").exists()).toBe(true);
  });

  it("renders as external link when external is true", async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        href: "https://example.com",
        external: true,
      },
      slots: {
        default: "External",
      },
    });
    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener noreferrer");
  });

  it("applies variant classes correctly", async () => {
    const primaryWrapper = await mountSuspended(BaseButton, {
      props: { variant: "primary" },
      slots: { default: "Primary" },
    });
    expect(primaryWrapper.find(".base-btn--primary").exists()).toBe(true);

    const accentWrapper = await mountSuspended(BaseButton, {
      props: { variant: "accent" },
      slots: { default: "Accent" },
    });
    expect(accentWrapper.find(".base-btn--accent").exists()).toBe(true);

    const outlineWrapper = await mountSuspended(BaseButton, {
      props: { variant: "outline" },
      slots: { default: "Outline" },
    });
    expect(outlineWrapper.find(".base-btn--outline").exists()).toBe(true);
  });

  it("applies size classes correctly", async () => {
    const smWrapper = await mountSuspended(BaseButton, {
      props: { size: "sm" },
      slots: { default: "Small" },
    });
    expect(smWrapper.find(".base-btn--sm").exists()).toBe(true);

    const lgWrapper = await mountSuspended(BaseButton, {
      props: { size: "lg" },
      slots: { default: "Large" },
    });
    expect(lgWrapper.find(".base-btn--lg").exists()).toBe(true);
  });

  it("applies disabled state correctly", async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { disabled: true },
      slots: { default: "Disabled" },
    });
    expect(wrapper.find(".base-btn--disabled").exists()).toBe(true);
    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });
});
