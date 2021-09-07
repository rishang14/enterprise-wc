// Ids is a JavaScript project, but we define TypeScript declarations so we can
// confirm our code is type safe, and to support TypeScript users.

export class IdsPopupOpenEventsMixin {
  /** true if the component currently has open events */
  hasOpenEvents: boolean;

  /** Refreshes the currently-bound open events */
  addOpenEvents(): void;

  /** Removes the currently-bound open events */
  removeOpenEvents(): void;
}