// Components/Skeleton.tsx
export default function Skeleton({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  return (
    <div
      className="bg-gray-300 animate-pulse rounded-xl"
      style={{ width: width, height: height }}
    ></div>
  );
}
