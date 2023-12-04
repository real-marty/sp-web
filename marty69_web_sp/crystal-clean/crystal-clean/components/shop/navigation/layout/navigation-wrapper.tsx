import BackgroundVideo from "../video";
import TextSnapping from "../../../tooling/animations/text-snapping";

export default function NavigationWrapper({
  children,
}: {
  readonly children?: any;
}) {
  return (
    <div className="relative h-[100vh] bg-zinc-950 overflow-hidden">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute z-0 inset-0 overflow-hidden ">
        <BackgroundVideo />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-950 opacity-90"
      />
      <TextSnapping
        content="CLEAN"
        styling="absolute top-[10%] -rotate-12 -left-[20%] select-none"
      />

      <TextSnapping
        content="CLEAN"
        styling="absolute top-[85%] md:top-[75%] -rotate-12 -right-[20%] select-none"
      />
      {children}
    </div>
  );
}
