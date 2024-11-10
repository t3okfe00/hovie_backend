// test-setup.ts
import { register } from "ts-node";

register({
  transpileOnly: true,
  esm: true,
  experimentalSpecifierResolution: "node",
});
