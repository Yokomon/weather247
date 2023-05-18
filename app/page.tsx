import CityPicker from "@/components/CityPicker";
import { Card, Divider, Text, Subtitle } from "@tremor/react";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-10 bg-gradient-to-br from-slate-400 flex items-center justify-center to-gray-200">
      <Card className="max-w-4xl mx-auto bg-gradient-radial from-slate-100 to-slate-300">
        <Text className="text-3xl sm:text-5xl text-center font-semibold mb-8 text-slate-500">
          Weather 247
        </Text>
        <Subtitle className="text-base sm:text-xl text-center">
          Powered by OpenAI, Next.js 13.4, Tailwind CSS 3.3, Tremor 2.6 + More
        </Subtitle>
        <Divider className="my-4 sm:my-10" />
        <Card className=" bg-gradient-radial from-slate-300 to-gray-400">
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}
