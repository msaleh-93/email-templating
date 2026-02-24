import DataEditor from "~/components/DataEditor";
import Header from "~/components/Header";
import { Preview } from "~/components/Preview";
import TemplateSelector from "~/components/TemplateSelector";

export default function App() {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-4rem)] p-8 flex gap-5">
        <div className="w-sm flex flex-col gap-2">
          <TemplateSelector />
          <DataEditor />
        </div>
        <Preview title="Desktop View" size={640} canSave />
        <Preview title="Mobile View" size={320} />
      </main>
    </>
  );
}
