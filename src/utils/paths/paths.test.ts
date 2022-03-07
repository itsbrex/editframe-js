import { generatePath } from "./";

describe("generatePath", () => {
  describe('with pattern="/"', () => {
    it("returns correct url with no params", () => {
      const pattern = "/";

      expect(generatePath(pattern)).toBe("/");
    });

    it("returns correct url with params", () => {
      const pattern = "/";
      const params = { bar: 123, foo: "tobi" };

      expect(generatePath(pattern, params)).toBe("/");
    });
  });

  describe('with pattern="/:foo/somewhere/:bar"', () => {
    it("throws with no params", () => {
      const pattern = "/:foo/somewhere/:bar";

      expect(() => {
        generatePath(pattern);
      }).toThrow('Expected "foo" to be a string');
    });

    it("throws with some params", () => {
      const pattern = "/:foo/somewhere/:bar";
      const params = { foo: "tobi", quux: 999 };

      expect(() => {
        generatePath(pattern, params);
      }).toThrow('Expected "bar" to be a string');
    });

    it("returns correct url with params", () => {
      const pattern = "/:foo/somewhere/:bar";
      const params = { bar: 123, foo: "tobi" };

      expect(generatePath(pattern, params)).toBe("/tobi/somewhere/123");
    });

    it("returns correct url with additional params", () => {
      const pattern = "/:foo/somewhere/:bar";
      const params = { bar: 123, foo: "tobi", quux: 999 };

      expect(generatePath(pattern, params)).toBe("/tobi/somewhere/123");
    });
  });

  describe("with no path", () => {
    it("matches the root URL", () => {
      expect(generatePath()).toBe("/");
    });
  });

  describe('simple pattern="/view/:id"', () => {
    it("handle = on params", () => {
      const pattern = "/view/:id";
      const params = { id: "Q29tcGxhaW50OjVhZjFhMDg0MzhjMTk1MThiMTdlOTQ2Yg==" };

      expect(generatePath(pattern, params)).toBe(
        "/view/Q29tcGxhaW50OjVhZjFhMDg0MzhjMTk1MThiMTdlOTQ2Yg=="
      );
    });
  });
});
