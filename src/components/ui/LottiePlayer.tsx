import Lottie from 'lottie-react';
import { ComponentProps } from 'react';

type LottieAnimationData = ComponentProps<typeof Lottie>['animationData'];

interface LottiePlayerProps {
  animationData: LottieAnimationData;
  className?: string;
  loop?: boolean;
}

export default function LottiePlayer({
  animationData,
  className,
  loop = true,
}: LottiePlayerProps) {
  return <Lottie animationData={animationData} loop={loop} className={className} />;
}
