import Interface from "@/components/typing/Interface";
import Modes from "@/components/typing/Modes";

export default function Home() {
  return (
    <div>
      <Modes />
      <div className="flex w-full justify-center mt-20">
        <Interface />
      </div>
    </div>
  );
}
