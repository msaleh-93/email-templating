import { join } from "path";

import hotelConfirmation from "~/templates/hotelConfirmation";

export async function writeTemplates(pathname: string) {
  const promises: Promise<any>[] = [];
  for (const builder of BUILDERS) {
    const templateString = builder.template().toString();
    promises.push(Bun.write(join(pathname, builder.filename), templateString));
  }

  await Promise.allSettled(promises);
}

const BUILDERS = [hotelConfirmation];
