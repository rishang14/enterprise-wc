import {
  IdsElement,
  customElement,
  scss,
  attributes,
  mix
} from '../../core';

import styles from './ids-accordion-header.scss';
import {
  IdsColorVariantMixin,
  IdsThemeMixin,
  IdsEventsMixin
} from '../../mixins';

import { IdsStringUtils } from '../../utils/ids-string-utils';

// Expander Types
const EXPANDER_TYPES = ['caret', 'plus-minus'];

// Default Icons
const DEFAULT_ICON_OFF = 'caret-down';

// Submenu Style Icons
const ICON_MINUS = 'plusminus-folder-closed';
const ICON_PLUS = 'plusminus-folder-open';

/**
 * IDS Accordion Header Component
 * @type {IdsAccordionHeader}
 * @inherits IdsElement
 * @mixes IdsColorVariantMixin
 * @mixes IdsEventsMixin
 * @mixes IdsThemeMixin
 * @part header - the accordion header root element
 * @part icon - the accordion header icon element
 */
@customElement('ids-accordion-header')
@scss(styles)
class IdsAccordionHeader extends mix(IdsElement).with(
    IdsColorVariantMixin,
    IdsEventsMixin,
    IdsThemeMixin
  ) {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.#setDisplayIcon(this.icon);
  }

  /**
   * Return the attributes we handle as getters/setters
   * @returns {Array} The attributes in an array
   */
  static get attributes() {
    return [
      ...super.attributes,
      attributes.MODE,
      attributes.VERSION,
      attributes.EXPANDED,
      attributes.EXPANDER_TYPE,
      attributes.ICON,
      attributes.SELECTED
    ];
  }

  /**
   * @returns {Array<string>} List of available color variants for this component
   */
  availableColorVariants = ['app-menu', 'sub-app-menu'];

  /**
   * Inner template contents
   * @returns {string} The template
   */
  template() {
    return `
      <div class="ids-accordion-header" tabindex="0" part="header">
        <ids-icon class="ids-accordion-display-icon" part="display-icon"></ids-icon>
        <slot></slot>
        ${this.templateExpanderIcon()}
      </div>
    `;
  }

  /**
   * Expander Icon template contents
   * @returns {string} the Expander Icon template
   */
  templateExpanderIcon() {
    return `
      <ids-icon class="ids-accordion-expander-icon" icon=${DEFAULT_ICON_OFF} part="expander-icon"></ids-icon>
    `;
  }

  /**
   * @readonly
   * @returns {HTMLElement} this header's panel
   */
  /* istanbul ignore next */
  get panel() {
    return this.parentElement;
  }

  /**
   * @returns {boolean} true if this header's pane wrapper is expanded
   */
  /* istanbul ignore next */
  get expanded() {
    return this.panel.expanded;
  }

  /**
   * @param {boolean} val true if this header should appear expanded
   */
  set expanded(val) {
    const trueVal = IdsStringUtils.stringToBool(val);
    /* istanbul ignore next */
    this.container.classList[trueVal ? 'add' : 'remove']('expanded');
    this.#refreshExpanderIconType();
  }

  /**
   * @returns {string} the current expander type
   */
  get expanderType() {
    return this.getAttribute(attributes.EXPANDER_TYPE);
  }

  /**
   * @param {string} val the type of expander to use
   */
  set expanderType(val) {
    const currentVal = this.expanderType;
    let trueVal = EXPANDER_TYPES[0];
    /* istanbul ignore next */
    if (EXPANDER_TYPES.includes(val)) {
      trueVal = val;
    }

    if (currentVal !== trueVal) {
      this.setAttribute(attributes.EXPANDER_TYPE, val);
      this.toggleExpanderIcon(this.expanded);
    }
  }

  /**
   * Focuses this accordion header
   * @returns {void}
   */
  focus() {
    this.container.focus();
  }

  /**
   * @param {string} val the type of display icon to show
   */
  set icon(val) {
    if (this.icon !== val) {
      if (typeof val !== 'string' || !val.length) {
        this.removeAttribute('icon');
      } else {
        this.setAttribute('icon', `${val}`);
      }
      this.#setDisplayIcon(val);
    }
  }

  /**
   * @returns {string} the currently-displayed icon, if applicable
   */
  get icon() {
    return this.getAttribute('icon');
  }

  /**
   * @param {string} iconType the new icon type
   */
  #setDisplayIcon(iconType) {
    this.container.querySelector('.ids-accordion-display-icon').icon = iconType;
    this.container.classList[(iconType && iconType.length) ? 'add' : 'remove']('has-icons');
  }

  /**
   * @returns {boolean} true if this accordion header should appear "selected"
   */
  get selected() {
    return IdsStringUtils.stringToBool(this.getAttribute(attributes.SELECTED));
  }

  /**
   * @param {boolean} val true if this accordion header should appear "selected"
   */
  set selected(val) {
    const currentValue = this.selected;
    const isValueTruthy = IdsStringUtils.stringToBool(val);

    if (currentValue !== isValueTruthy) {
      if (isValueTruthy) {
        this.setAttribute(attributes.SELECTED, `${val}`);
      } else {
        this.removeAttribute(attributes.SELECTED);
      }
      this.#refreshSelected(isValueTruthy);

      if (isValueTruthy) {
        this.triggerEvent('selected', this, { bubbles: true });
      }
    }
  }

  /**
   * Refreshes the visual "Selected" state
   * @param {boolean} isSelected true if the Accordion Header should appear "Selected"
   */
  #refreshSelected(isSelected) {
    this.container.classList[isSelected ? 'add' : 'remove']('selected');

    const textNode = this.querySelector('ids-text, span');
    /* istanbul ignore next */
    if (textNode) {
      textNode.fontWeight = isSelected ? 'bold' : '';
    }
  }

  /**
   * Toggles the display of an expander icon
   * @param {boolean} val true if the expander icon should be displayed
   */
  toggleExpanderIcon(val) {
    if (IdsStringUtils.stringToBool(val)) {
      this.#showExpanderIcon();
    } else {
      this.#hideExpanderIcon();
    }
  }

  /**
   * Renders the expander icon, either adding it to the DOM or updating if it exists.
   * @returns {void}
   */
  #showExpanderIcon() {
    /* istanbul ignore next */
    const appendLocation = this.colorVariant?.indexOf('sub-') === 0 ? 'afterbegin' : 'beforeend';
    const expander = this.container.querySelector('.ids-accordion-expander-icon');

    /* istanbul ignore next */
    if (!expander) {
      // Apply the expander button in front of the text
      // for any variants prefixed with `sub-`.
      const expanderIcon = this.templateExpanderIcon();
      this.container.insertAdjacentHTML(appendLocation, expanderIcon);
    } else {
      this.container[appendLocation === 'afterbegin' ? 'prepend' : 'append'](expander);
    }

    this.#refreshExpanderIconType();
  }

  /**
   * Removes the expander icon from the DOM.
   * @returns {void}
   */
  #hideExpanderIcon() {
    this.container.querySelector('.ids-accordion-expander-icon')?.remove();
  }

  /**
   * Changes the visual style of the expander icon
   * @returns {void}
   */
  #refreshExpanderIconType() {
    const icon = this.container.querySelector('.ids-accordion-expander-icon');
    /* istanbul ignore next */
    if (!icon) {
      return;
    }

    let iconType = DEFAULT_ICON_OFF;
    /* istanbul ignore next */
    if (this.expanderType === 'plus-minus') {
      iconType = this.expanded ? ICON_PLUS : ICON_MINUS;
    }
    icon.icon = iconType;
  }
}

export default IdsAccordionHeader;
