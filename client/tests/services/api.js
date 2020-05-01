import parseUrl from "parse-url";

import { API } from "./../../src/services/api";

describe("api cache", () => {
  let api;
  beforeEach(() => {
    api = new API();
  });

  it("should match route to rule", () => {
    const regex = /\/blogs\/[\w-]+/;
    api.addRule(regex, { isMap: true });

    const { rule, options } = api.matchRule("/blogs/1");
    expect(rule).toBe(regex);
    expect(options).toEqual({ isMap: true });
  });

  it("should generate key based on request", () => {
    const requestKey = api.cachedHandler.requestKey({
      method: "post",
      href: "/blogs/entries",
      query: { company: 10 },
      data: ["blog1", "blog2"]
    });

    expect(requestKey).toBe("65251c1a3c2154e4cd6b2a4032a786da");
  });

  it("should generate key based on mapped request", () => {
    const requestKey = api.mappedHandler.requestKey({
      method: "post",
      href: "/blogs/entries",
      query: { company: 10 },
      data: ["blog1", "blog2"]
    });

    expect(requestKey).toBe("115e263c7c1fc17c9fae0023c57cbfaa");
  });

  it("should perform request and cache response", done => {
    spyOn(api, "axios").and.callFake(() => Promise.resolve({ data: "resp" }));

    const regex = /\/blogs\/[\w-]+/;
    const request = {
      method: "get",
      href: "/blogs/1"
    };

    api.addRule(regex);
    api.request(request).then(resp => {
      const requestKey = api.cachedHandler.requestKey(request);
      expect(api.cachedHandler.get(requestKey)).toEqual("resp");
      done();
    });
  });

  it("should cache based on url and params", done => {
    spyOn(api, "axios").and.callFake(args => {
      if (args.query === "params") {
        return Promise.resolve({ data: "withParams" });
      }

      return Promise.resolve({ data: "withoutParams" });
    });

    const regex = /\/blogs\/[\w-]+/;
    api.addRule(regex);

    const request1 = { method: "get", href: "/blogs/1" };
    const request2 = { method: "get", href: "/blogs/1", query: "params" };
    Promise.all([api.request(request1), api.request(request2)]).then(() => {
      const request1Key = api.cachedHandler.requestKey(request1);
      expect(api.cachedHandler.get(request1Key)).toEqual("withoutParams");

      const request2Key = api.cachedHandler.requestKey(request2);
      expect(api.cachedHandler.get(request2Key)).toEqual("withParams");
      done();
    });
  });

  it("should cache based on the map response", done => {
    spyOn(api, "axios").and.callFake(() =>
      Promise.resolve({
        data: {
          id1: "Blog 1",
          id9: "Blog 9",
          id23: "Blog 23",
          id73: "Blog 73"
        }
      })
    );

    const regex = /\/blogs\/entries/;
    api.addRule(regex, { isMap: true });

    api.post("/blogs/entries", ["id1", "id9", "id23", "id73"]).then(() => {
      const requestKey = api.mappedHandler.requestKey({
        method: "post",
        href: "/blogs/entries",
        body: ["id1", "id9", "id23", "id73"]
      });

      expect(api.mappedHandler.get(requestKey, ["id1", "id23"])).toEqual(
        new Map([["id1", "Blog 1"], ["id23", "Blog 23"]])
      );

      expect(
        api.mappedHandler.get(requestKey, ["id9", "id73", "id99"])
      ).toEqual(new Map([["id9", "Blog 9"], ["id73", "Blog 73"]]));

      done();
    });
  });

  it("should fetch missing entries", done => {
    spyOn(api, "axios").and.callFake(() =>
      Promise.resolve({
        data: {
          id3: "Blog 3",
          id4: "Blog 4"
        }
      })
    );

    const request = {
      method: "post",
      href: "/blogs/entries",
      data: ["id1", "id2", "id3", "id4"]
    };

    const requestKey = api.mappedHandler.requestKey(request);
    api.mappedHandler.set(requestKey, {
      id1: "Blog 1",
      id2: "Blog 2"
    });

    const regex = /\/blogs\/entries/;
    api.addRule(regex, { isMap: true });
    api.request(request).then(resp => {
      expect(api.axios).toHaveBeenCalledWith({
        method: "post",
        url: "/blogs/entries",
        query: undefined,
        data: ["id3", "id4"]
      });

      expect(resp).toEqual(
        new Map([
          ["id1", "Blog 1"],
          ["id2", "Blog 2"],
          ["id3", "Blog 3"],
          ["id4", "Blog 4"]
        ])
      );
      done();
    });
  });

  it("should immediately return result if already cached", done => {
    spyOn(api, "axios");

    const request = {
      method: "get",
      href: "/blogs/1",
      params: "params"
    };
    const regex = /\/blogs\/[\w-]+/;
    const requestKey = api.cachedHandler.requestKey(request);

    api.addRule(regex);
    api.cachedHandler.set(requestKey, "cachedResponse");

    api.request(request).then(resp => {
      expect(resp).toEqual("cachedResponse");
      expect(api.axios).not.toHaveBeenCalled();
      done();
    });
  });

  xit("should cache based on mapped field", done => {
    spyOn(api, "axios").and.returnValue(
      Promise.resolve({
        data: [
          {
            id: "blog1",
            message: "This is first blog",
            uris: ["firstblog", "blogouno"]
          },
          {
            id: "blog2",
            message: "This is second blog",
            uris: ["secondblog", "blogodos"]
          }
        ]
      })
    );
    const request = {
      method: "post",
      href: "/blogs/entries"
    };

    const requestKey = api.mappedHandler.requestKey(request);
    api.addRule("/blogs/entries", { mapField: "uris" });

    api.request(request).then(resp => {
      const data = api.mappedHandler.get(requestKey, { capture: "firstblog" });
      expect(data).toBe(true);
      done();
    });
  });
});
