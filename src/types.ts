export type ShortcutObj = {
  shift: Boolean;
  key: string;
  keyCode: string;
  numpad: Boolean;
};

export type StoredShortcutValue = {
  shortcutObject: ShortcutObj;
  text: string;
  created: number;
};

export type StoredShortcut = Record<string, StoredShortcutValue>;
