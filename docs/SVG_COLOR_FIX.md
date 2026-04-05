# Fix SVG `stroke` / `fill` Color Issue in React Native

When using **react-native-svg** icons dynamically, you may notice that `fill` works but `stroke` does not change when passing props from a wrapper component.

This usually happens because the SVG files contain **hardcoded colors**.

---

# Problem

Example wrapper component:

```tsx
export const Icon = ({ name, size = 24, color = "#000", ...rest }: IconProps) => {
  const SvgIcon = Icons[name];

  if (!SvgIcon) return null;

  return (
    <SvgIcon
      width={size}
      height={size}
      fill={color}
      stroke={color}
      {...rest}
    />
  );
};```

To fix this we use ``SVGO to automatically replace colors.``
```bash
npm install -D svgo
```
Create svgo.config.js
```js
module.exports = {
  plugins: [
    {
      name: "convertColors",
      params: {
        currentColor: true
      }
    }
  ]
};
```

Then run:
``` bash
npx svgo -f assets/icons
```
This cleans all SVGs automatically.

