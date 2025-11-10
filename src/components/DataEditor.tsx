import { githubDarkTheme, githubLightTheme, JsonEditor } from "json-edit-react";
import { useState } from "react";
import { useTemplates } from "~/stores/templates";

import { useTheme } from "~/stores/theme";
import { cn } from "~/utils";

export default function DataEditor() {
  const theme = useTheme((s) =>
    s.appTheme === "dark" ? githubDarkTheme : githubLightTheme
  );
  const data = useTemplates((s) => s.getData());
  const setData = useTemplates((s) => s.setData);
  const [plainText, setPlainText] = useState(false);
  const [dataString, setDataString] = useState(() =>
    JSON.stringify(data, null, 4)
  );

  return (
    <>
      <div className={cn("flex-1 rounded-lg", { "overflow-auto": !plainText })}>
        {plainText ? (
          <textarea
            className="size-full px-3 py-4 bg-white dark:bg-[#0d1117] rounded-lg resize-none"
            placeholder="JSON Data"
            value={dataString}
            onChange={(e) => setDataString(e.target.value)}
          />
        ) : (
          <JsonEditor
            data={data}
            setData={setData}
            theme={theme}
            className="h-full overflow-auto"
          />
        )}
      </div>
      <div className="flex gap-2">
        <label className="flex gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={plainText}
            onChange={(e) => {
              const checked = e.target.checked;
              try {
                if (checked) setDataString(JSON.stringify(data, null, 4));
                else setData(JSON.parse(dataString));
                setPlainText(checked);
              } catch (error) {
                console.error(error);
              }
            }}
          />
          <span>Plain Text</span>
        </label>
      </div>
    </>
  );
}
