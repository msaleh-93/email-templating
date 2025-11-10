import { useState } from "react";

import codeFile from "~/assets/icons/file-code.svg";
import refreshIcon from "~/assets/icons/refresh-cw.svg";
import rightArrow from "~/assets/icons/right-arrow.svg";
import { useTemplates } from "~/stores/templates";
import { cn } from "~/utils";

export default function TemplateSelector() {
  const templates = useTemplates((s) => s.templates);
  const selected = useTemplates((s) => s.selected);
  const refreshing = useTemplates((s) => s.refreshing);
  const refresh = useTemplates((s) => s.refresh);
  const selectTemplate = useTemplates((s) => s.selectTemplate);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-5">
        <h2 className="text-lg font-bold">Template Files</h2>
        <div className="flex gap-2">
          <button
            className="size-8 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center"
            onClick={refresh}
          >
            <img
              src={refreshIcon}
              className={cn("size-6 transition-transform dark:invert", {
                "animate-spin": refreshing,
              })}
            />
          </button>
          <button
            className="size-8 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center"
            onClick={() => setIsOpen((val) => !val)}
          >
            <img
              src={rightArrow}
              className={cn("size-7 transition-transform dark:invert", {
                "rotate-90": !isOpen,
              })}
            />
          </button>
        </div>
      </div>

      <div className="max-h-60 flex flex-col gap-2 overflow-auto">
        {templates.map((file) =>
          isOpen || file === selected ? (
            <button
              key={file}
              className={cn(
                "w-full h-10 p-2 rounded-md text-start flex gap-1 items-center",
                file === selected
                  ? "bg-indigo-300 dark:bg-indigo-700"
                  : "bg-white dark:bg-gray-700"
              )}
              onClick={() => (isOpen ? selectTemplate(file) : setIsOpen(true))}
            >
              <img src={codeFile} className="size-6 invert" />
              <span>{file}</span>
            </button>
          ) : null
        )}
      </div>
    </>
  );
}
