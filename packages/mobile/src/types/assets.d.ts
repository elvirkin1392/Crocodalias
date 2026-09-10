/**
 * Metro bundles SVG as a regular asset, so importing one yields the same
 * asset reference as a PNG. expo-image renders it natively.
 */
declare module '*.svg' {
  const asset: number;
  export default asset;
}
