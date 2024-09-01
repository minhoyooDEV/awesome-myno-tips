import "@testing-library/jest-dom/vitest";

import * as testmodules from "vitest";

Object.keys(testmodules).forEach((key) => {
  globalThis[key] = testmodules[key];
});