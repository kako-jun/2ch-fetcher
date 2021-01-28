import fetchWithProxy from "fetch-with-proxy";
import * as chardet from "chardet";
import * as iconv from "iconv-lite";

// const sslRootCAs = require("ssl-root-cas/latest");
// sslRootCAs.inject();

export async function fetch(url: string) {
  let buf: ArrayBuffer;
  try {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    const res: Response = await fetchWithProxy(url);
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
    buf = await res.arrayBuffer();
  } catch (error) {
    // do nothing.
    throw error;
  }

  const encoding = chardet.detect(new Uint8Array(buf));
  if (encoding) {
    const html = iconv.decode(Buffer.from(buf), encoding);
    return html;
  }

  return "";
}
