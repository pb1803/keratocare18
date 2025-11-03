import { useState } from "react";
import visionBefore from "@/assets/vision-before.jpg";
import visionAfter from "@/assets/vision-after.jpg";

const VisionSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX, e.currentTarget);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">See The Difference</h2>
          <p className="text-center text-muted-foreground mb-12">
            Experience how keratoconus vision transforms with specialty contact lenses
          </p>

          <div
            className="relative rounded-2xl overflow-hidden shadow-lg select-none cursor-col-resize"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full) */}
            <div className="relative w-full aspect-[4/3]">
              <img
                src={visionAfter}
                alt="After treatment - Crystal clear vision with specialty contact lenses"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                After - Crystal Clear
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={visionBefore}
                alt="Before treatment - Keratoconus distorted vision"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-4 left-4 bg-destructive text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                Before - Distorted & Blurry
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-0.5 h-6 bg-primary"></div>
                  <div className="w-0.5 h-6 bg-primary"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium pointer-events-none">
              <span className="hidden sm:inline">Drag to compare</span>
              <span className="sm:hidden">Swipe to compare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSlider;
