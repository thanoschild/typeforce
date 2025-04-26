import Interface from "@/components/typing/Interface";
import Modes from "@/components/typing/Modes";

export default function Home() {
  return (
    <div className="">
      <Modes />
      <div className="flex w-full justify-center mt-20 px-12 py-8">
        <Interface />
      </div>
    </div>
  );
}
