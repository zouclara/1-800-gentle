import { AboutRotaryDial } from "../components/AboutRotaryDial";
import { RotaryPlacard } from "../components/RotaryPlacard";

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="max-w-4xl mx-auto px-6 h-full relative py-20">
          <div className="absolute top-6 right-6 pointer-events-auto">
            <RotaryPlacard />
          </div>
        </div>
      </div>

      <AboutRotaryDial />
    </div>
  );
}
