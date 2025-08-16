export default function Riyal({
  width = 15,
  height = 15,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <img
      src="/assets/images/riyal.png"
      alt="riyal"
      width={width}
      height={height}
    />
  );
}
