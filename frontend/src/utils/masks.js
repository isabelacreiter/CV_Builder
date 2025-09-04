import IMask from "imask";

export const applyPhoneMask = (el) =>
  IMask(el, { mask: "(00) 00000-0000" });

export const applyCepMask = (el) =>
  IMask(el, { mask: "00000-000" });
