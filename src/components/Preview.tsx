import { useRef, useState } from "react";
import { useTemplates } from "~/stores/templates";

interface Props {
  title: string;
  size: number;
  canSave?: boolean;
}

export function Preview({ title, size, canSave }: Props) {
  const selected = useTemplates((s) => s.selected);
  const srcDoc = useTemplates((s) => {
    try {
      return s.hbsTemplate?.(s.getData());
    } catch (error) {
      console.error(error);
    }
  });

  const ref = useRef<HTMLAnchorElement>(null);
  const [filename, setFilename] = useState(selected);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-8 flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center">{title}</h2>
        {canSave && srcDoc ? (
          <div className="flex gap-2">
            <input
              className="width px-2 bg-white dark:bg-gray-900 rounded-md"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <button
              className="h-8 px-4 bg-indigo-300 dark:bg-indigo-700 rounded-md flex items-center justify-center font-bold cursor-pointer"
              onClick={() => {
                const a = ref.current;
                if (!a) return;
                const blob = new Blob([srcDoc], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Save
            </button>
          </div>
        ) : null}
        <a ref={ref} hidden />
      </div>
      <iframe
        width={size}
        src={srcDoc ? undefined : `/templates/${selected}`}
        srcDoc={srcDoc}
        className="bg-gray-600 rounded-lg flex-1"
      />
    </div>
  );
}
