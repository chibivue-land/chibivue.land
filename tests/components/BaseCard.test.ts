import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BaseCard from "~/components/ui/BaseCard.vue";

describe("BaseCard", () => {
  it("renders slot content", async () => {
    const wrapper = await mountSuspended(BaseCard, {
      slots: {
        default: "<p>Card content</p>",
      },
    });
    expect(wrapper.text()).toContain("Card content");
  });

  it("applies padding classes correctly", async () => {
    const smWrapper = await mountSuspended(BaseCard, {
      props: { padding: "sm" },
      slots: { default: "Small padding" },
    });
    expect(smWrapper.find(".base-card--padding-sm").exists()).toBe(true);

    const mdWrapper = await mountSuspended(BaseCard, {
      props: { padding: "md" },
      slots: { default: "Medium padding" },
    });
    expect(mdWrapper.find(".base-card--padding-md").exists()).toBe(true);

    const lgWrapper = await mountSuspended(BaseCard, {
      props: { padding: "lg" },
      slots: { default: "Large padding" },
    });
    expect(lgWrapper.find(".base-card--padding-lg").exists()).toBe(true);
  });

  it("applies hover class when hover prop is true", async () => {
    const wrapper = await mountSuspended(BaseCard, {
      props: { hover: true },
      slots: { default: "Hoverable" },
    });
    expect(wrapper.find(".base-card--hover").exists()).toBe(true);
  });

  it("applies tilt class when tilt prop is true", async () => {
    const wrapper = await mountSuspended(BaseCard, {
      props: { tilt: true },
      slots: { default: "Tiltable" },
    });
    expect(wrapper.find(".base-card--tilt").exists()).toBe(true);
  });

  it("does not apply hover class when hover prop is false", async () => {
    const wrapper = await mountSuspended(BaseCard, {
      props: { hover: false },
      slots: { default: "No hover" },
    });
    expect(wrapper.find(".base-card--hover").exists()).toBe(false);
  });
});
