import { render } from "@testing-library/react";
import Header from "@/components/Header";
import "@testing-library/jest-dom";

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

  it("brand name is a link", () => {
    const { getByRole } = render(<Header />);

    const linkElement = getByRole("link", { name: /React Weather/i });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement.tagName).toBe("A");
  });

  it("brand name has correct href", () => {
    const { getByRole } = render(<Header />);

    const linkElement = getByRole("link", { name: /React Weather/i });

    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("all header links are under nav tag", () => {
    const { container } = render(<Header />);

    const navElement = container.querySelector("nav");

    expect(navElement).toBeInTheDocument();

    if (navElement === null) {
      throw new Error("nav element is null");
    }

    const links = navElement.querySelectorAll("a");

    expect(links.length).toBeGreaterThan(0);

    links.forEach((link) => {
      expect(navElement.contains(link)).toBeTruthy();
    });
  });
});
