import type * as CSS from "csstype";

export const t = new Proxy(
  {} as {
    [K in TagName]: (
      attributes?: Attributes | null,
      ...children: any[]
    ) => Template;
  },
  {
    get(target, tagName: TagName) {
      if (!(tagName in target)) {
        target[tagName] = function (attributes = null, ...children) {
          return new Template(tagName, attributes, children);
        };
      }

      return target[tagName];
    },
  },
);

export const $ = {
  var(path: string) {
    return `{{${path}}}`;
  },
  if(path: string, body: any, _else?: any) {
    return new Wrapper("if", path, body, _else);
  },
  unless(path: string, body: any, _else?: any) {
    return new Wrapper("unless", path, body, _else);
  },
  each(path: string, body: any, _else?: any) {
    return new Wrapper("each", path, body, _else);
  },
  with(path: string, body: any) {
    return new Wrapper("with", path, body);
  },
  lookup(path: string, key: string) {
    return `(lookup ${path} ${key.startsWith("@") ? key : `[${key}]`})`;
  },
};

export class Template {
  constructor(
    public tagName: string,
    public attributes: Attributes | null,
    public children: any[],
  ) {}

  toString(depth = 0) {
    const tab = "\t".repeat(depth);
    let str = `${tab}<${this.tagName}`;
    if (this.attributes)
      for (const key in this.attributes) {
        const attr = this.attributes[key];
        if (attr === undefined || attr === null) continue;
        str += `\n${tab}\t${key}="`;
        if (key === "style" && typeof attr === "object") {
          const entries = Object.entries(attr);
          const styles = [];
          for (const [k, v] of entries)
            styles.push(`${k}: ${v instanceof Wrapper ? v.toAttribute() : v};`);
          str += styles.join(" ");
        } else if (attr instanceof Wrapper) str += attr.toAttribute();
        else str += attr;
        str += '"';
      }
    str += ">";
    if (VOID_ELEMENTS.includes(this.tagName)) return str;
    const l = str.length;
    for (const child of flatten(this.children)) {
      str += "\n";
      if (typeof child === "string") str += tab + "\t" + child;
      else str += child.toString(depth + 1);
    }
    if (str.length > l) str += "\n" + tab;
    return str + `</${this.tagName}>`;
  }
}

export class Wrapper {
  constructor(
    public key: string,
    public path: string,
    public body: any,
    public _else?: any,
  ) {}

  toString(depth = 0) {
    const tab = "\t".repeat(depth);
    let str = `${tab}{{~#${this.key} ${this.path}~}}`,
      child;
    for (child of flatten(this.body)) {
      str += "\n";
      if (typeof child === "string") str += tab + "\t" + child;
      else str += child.toString(depth);
    }
    if (this._else) {
      str += "\n" + tab + "{{~else~}}";
      for (child of flatten(this._else)) str += "\n";
      if (typeof child === "string") str += tab + "\t" + child;
      else str += child.toString(depth);
    }
    return str + `\n${tab}{{~/${this.key}~}}`;
  }

  toAttribute(): string {
    return `{{#${this.key} ${this.path}}}${this.body instanceof Wrapper ? this.body.toAttribute() : this.body.toString()}${this._else ? `{{else}}${this._else instanceof Wrapper ? this._else.toAttribute() : this._else.toString()}` : ""}{{/${this.key}}}`;
  }
}

export function* flatten<T>(
  children: T | T[],
  exclude: any[] = [undefined, null, false, ""],
): Generator<T> {
  if (children instanceof Array) {
    let item;
    for (item of children) {
      if (item instanceof Array) yield* flatten(item);
      else if (!exclude.includes(item)) yield item;
    }
  } else if (!exclude.includes(children)) yield children;
}

export function mapChildren<T, U>(children: T | T[], fn: (child: T) => U) {
  const result = [];
  let child;
  for (child of flatten(children)) {
    if (child instanceof Wrapper) {
      child.body = mapChildren(child.body, fn);
      if (child._else) child._else = mapChildren(child._else, fn);
    } else child = fn(child);
    result.push(...flatten(child));
  }

  return result;
}

const VOID_ELEMENTS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

type TagName = keyof HTMLElementTagNameMap | (string & {});

export interface Attributes {
  style?: Style;
  [key: string]: string | Wrapper | unknown;
}

export type Style = {
  [K in keyof CSS.PropertiesHyphen]?: CSS.PropertiesHyphen[K] | Wrapper;
};
