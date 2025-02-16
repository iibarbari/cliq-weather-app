import { render } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("displays right brand name", () => {
    const { getByText } = render(<Header />);

    const brandName = getByText("React Weather").textContent;

    expect(brandName).toBe("React Weather");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("brand name is clickable", () => {
    const { getByText } = render(<Header />);

    const brandName = getByText("React Weather");

    expect(brandName.tagName).toBe("A");
  })

  it("brand name has correct href", () => {
    const { getByText } = render(<Header />);

    const brandName = getByText("React Weather");

    expect(brandName.getAttribute("href")).toBe("/");
  });
});
