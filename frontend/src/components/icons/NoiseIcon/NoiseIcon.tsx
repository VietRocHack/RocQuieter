import { Volume, Volume1, Volume2 } from "lucide-react";

const NoiseIcon = ({ level, size }: { level: number; size: number }) => {
  const twindSize = `w-${size} h-${size}`;
  switch (level) {
    case 1:
      return <Volume className={`${twindSize} text-green-500`} />;
    case 2:
      return <Volume className={`${twindSize}  text-yellow-500`} />;
    case 3:
      return <Volume1 className={`${twindSize}  text-orange-500`} />;
    case 4:
      return <Volume2 className={`${twindSize}  text-red-500`} />;
    case 5:
      return <Volume2 className={`${twindSize}  text-red-700`} />;
    default:
      return null;
  }
};

export default NoiseIcon;
