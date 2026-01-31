export default function ProfileAvatar({
  image,
  onClick,
}: {
  image?: string;
  onClick: () => void;
}) {
  return (
    <img
      src={image || "/avatar.png"}
      onClick={onClick}
      className="h-9 w-9 rounded-full cursor-pointer border border-white/20"
    />
  );
}
