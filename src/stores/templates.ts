import Handlebars from "handlebars";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { eventsSub } from "~/utils/events";

const BASE_URL = "http://localhost:3210",
  HBS = ".hbs";

interface TemplatesStore {
  templates: Array<string>;
  selected?: string;
  data?: Record<string, unknown>;
  refreshing: boolean;
  hbsTemplate?: HandlebarsTemplateDelegate;
  getData(): unknown;
  setData(data: unknown): void;
  selectTemplate(selected: string): Promise<void>;
  refresh(): Promise<void>;
}

export const useTemplates = create<TemplatesStore>()(
  persist(
    (set, get, api) => {
      let syncing = false,
        active = !document.hidden || document.hasFocus();

      async function sync() {
        if (!active || syncing) return;
        syncing = true;
        const templates = await getTemplates();
        const { selected, data } = get();
        const isMatch = !!selected && templates.includes(selected);
        const isHbs = isMatch && selected.endsWith(HBS);
        const update: Partial<TemplatesStore> = {
          templates,
          hbsTemplate: isHbs ? await getHbsTemplate(selected) : undefined,
          selected: isMatch ? selected : templates[0],
        };

        if (isHbs)
          update.data = { ...data, [selected]: await getData(selected) };

        set(update);
        syncing = false;
        // TODO make the delay double every time there is not change with a max close to 1min
        setTimeout(sync, 1000);
      }

      sync();

      api.subscribe(({ data, selected }, { data: oldData }) => {
        if (
          syncing ||
          !selected ||
          !selected.endsWith(HBS) ||
          data?.[selected] === oldData?.[selected]
        )
          return;
        setData(selected, data?.[selected] || {});
      });

      function handleFocusChange() {
        if (document.hidden || !document.hasFocus()) active = false;
        else {
          active = true;
          sync();
        }
      }

      // Listen for all relevant events
      eventsSub(document).visibilitychange(handleFocusChange);
      eventsSub(window).focus(handleFocusChange).blur(handleFocusChange);
      handleFocusChange();

      return {
        templates: [],
        refreshing: false,
        async selectTemplate(selected) {
          const { templates, selected: oldSelection } = get();
          if (oldSelection !== selected && !templates.includes(selected))
            return;

          let hbsTemplate: HandlebarsTemplateDelegate | undefined;
          if (selected.endsWith(HBS)) {
            hbsTemplate = await getHbsTemplate(selected);
          }

          set({ selected, hbsTemplate });
        },
        getData() {
          const { data, selected } = get();
          if (!selected || !data) return;
          return data[selected];
        },
        setData(newData) {
          const { data, selected } = get();
          if (!selected) return;
          set({ data: { ...data, [selected]: newData } });
        },
        async refresh() {
          set({ refreshing: true });
          await sync();
          set({ refreshing: false });
        },
      };
    },
    {
      name: "templates",
      partialize: ({ selected }) => ({ selected }),
    }
  )
);

async function getTemplates() {
  const rsp = await fetch(`${BASE_URL}/api/templates`);
  const data = await rsp.json();
  return data as string[];
}

async function getHbsTemplate(filename: string) {
  const rsp = await fetch(`/templates/${filename}`);
  return Handlebars.compile(await rsp.text());
}

async function getData(template: string) {
  const rsp = await fetch(`${BASE_URL}/api/data/${template}`);
  return (await rsp.json()) as Record<string, unknown>;
}

async function setData(template: string, data: unknown) {
  fetch(`${BASE_URL}/api/data/${template}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
