import { CloudSunIcon } from "lucide-react";

export default function Weather() {
  return (
    <section className="flex gap-2 items-center">
      <CloudSunIcon size={17} />
      <p>25º Celsius</p>
    </section>
  );
}
