/**
 * @jest-environment jsdom
 */
import IdsButton from '../../src/components/ids-button/ids-button';
import IdsContainer from '../../src/components/ids-container/ids-container';
import expectEnumAttributeBehavior from '../helpers/expect-enum-attribute-behavior';
import processAnimFrame from '../helpers/process-anim-frame';

describe('IdsButton Component', () => {
  let btn: any;

  beforeEach(async () => {
    const elem: any = new IdsButton();
    elem.id = 'test-button';
    elem.text = 'Test Button';
    document.body.appendChild(elem);
    btn = document.querySelector('ids-button');
  });

  afterEach(async () => {
    document.body.innerHTML = '';
    btn = null;
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');
    btn.remove();
    btn = new IdsButton();
    document.body.appendChild(btn);

    expect(document.querySelectorAll('ids-button').length).toEqual(1);
    expect(errors).not.toHaveBeenCalled();

    expect(btn.shouldUpdate).toBeTruthy();
  });

  it('renders correctly', () => {
    const elem: any = new IdsButton();
    elem.cssClass = 'test-class';
    elem.disabled = true;
    elem.icon = 'add';
    elem.text = 'test';
    elem.state.type = 'icon';
    document.body.appendChild(elem);
    elem.template();
    expect(elem.outerHTML).toMatchSnapshot();
  });

  it('renders icons on the opposite side correctly', () => {
    const elem: any = new IdsButton();
    elem.id = 'test-button';
    elem.icon = 'settings';
    elem.iconAlign = 'end';
    elem.text = 'Settings';
    document.body.appendChild(elem);
    elem.template();
    expect(elem.outerHTML).toMatchSnapshot();
  });

  it('exposes its inner button component', () => {
    expect(btn.button).toBeDefined();
    expect(btn.button instanceof HTMLElement).toBeTruthy();
  });

  it('focuses the inner button component when told to focus', () => {
    btn.focus();

    expect(btn.shadowRoot.activeElement.isEqualNode(btn.button));
  });

  it('can be disabled/enabled', () => {
    btn.disabled = true;

    expect(btn.hasAttribute('disabled')).toBeTruthy();
    expect(btn.disabled).toBeTruthy();
    expect(btn.button.hasAttribute('disabled')).toBeTruthy();
    expect(btn.state.disabled).toBeTruthy();

    btn.disabled = false;

    expect(btn.hasAttribute('disabled')).toBeFalsy();
    expect(btn.disabled).toBeFalsy();
    expect(btn.button.hasAttribute('disabled')).toBeFalsy();
    expect(btn.state.disabled).toBeFalsy();
  });

  it('can disabled padding', () => {
    btn.noPadding = true;

    expect(btn.container.classList.contains('no-padding')).toBeTruthy();
    expect(btn.getAttribute('no-padding')).toEqual('true');

    btn.noPadding = false;

    expect(btn.container.classList.contains('no-padding')).toBeFalsy();
    expect(btn.getAttribute('no-padding')).toBeFalsy();
  });

  it('can set rtl correctly', async () => {
    const container: any = new IdsContainer();
    btn = new IdsButton();
    btn.text = 'test';
    container.appendChild(btn);
    document.body.appendChild(container);
    expect(btn.container.classList.contains('rtl')).toBeFalsy();
    await container.setLanguage('ar');
    await processAnimFrame();
    expect(btn.locale.isRTL()).toEqual(true);
  });

  it('can be focusable or not', () => {
    btn.tabIndex = -1;

    expect(btn.hasAttribute('tabindex')).toBeFalsy();
    expect(btn.tabIndex).toEqual(-1);
    expect(btn.button.getAttribute('tabindex')).toEqual('-1');
    expect(btn.state.tabIndex).toEqual(-1);

    btn.tabIndex = 0;

    expect(btn.hasAttribute('tabindex')).toBeFalsy();
    expect(btn.tabIndex).toEqual(0);
    expect(btn.button.getAttribute('tabindex')).toEqual('0');
    expect(btn.state.tabIndex).toEqual(0);

    btn.setAttribute('tabindex', '-1');

    expect(btn.hasAttribute('focusable')).toBeFalsy();
    expect(btn.tabIndex).toEqual(-1);
    expect(btn.button.getAttribute('tabindex')).toEqual('-1');
    expect(btn.state.tabIndex).toEqual(-1);

    btn.setAttribute('tabindex', '0');

    expect(btn.hasAttribute('tabindex')).toBeTruthy();
    expect(btn.tabIndex).toEqual(0);
    expect(btn.button.getAttribute('tabindex')).toEqual('0');
    expect(btn.state.tabIndex).toEqual(0);

    // Handles incorrect values
    btn.tabIndex = 'fish';

    expect(btn.hasAttribute('tabindex')).toBeFalsy();
    expect(btn.tabIndex).toEqual(0);
    expect(btn.button.getAttribute('tabindex')).toEqual('0');
    expect(btn.state.tabIndex).toEqual(0);

    btn.tabIndex = -2;

    expect(btn.hasAttribute('tabindex')).toBeFalsy();
    expect(btn.tabIndex).toEqual(0);
    expect(btn.button.getAttribute('tabindex')).toEqual('0');
    expect(btn.state.tabIndex).toEqual(0);
  });

  it('can add extra CSS classes to the button', () => {
    btn.cssClass = 'one two three';

    expect(btn.getAttribute('css-class')).toBe('one two three');
    expect(btn.cssClass.includes('two')).toBeTruthy();
    expect(btn.button.classList.contains('one')).toBeTruthy();

    btn.cssClass = ['four', 'five', 'six'];

    expect(btn.getAttribute('css-class')).toBe('four five six');
    expect(btn.cssClass.includes('four')).toBeTruthy();
    expect(btn.button.classList.contains('four')).toBeTruthy();

    // Setting to empty removes the attribute and the Button element classes
    btn.cssClass = '';

    expect(btn.hasAttribute('css-class')).toBeFalsy();
    expect(btn.cssClass.includes('four')).toBeFalsy();
    expect(btn.button.classList.contains('four')).toBeFalsy();
  });

  it('can change its type', () => {
    btn.type = 'primary';

    expect(btn.getAttribute('type')).toBe('primary');
    expect(btn.type).toBe('primary');
    expect(btn.button.classList.contains('btn-primary')).toBeTruthy();
    expect(btn.state.type).toBe('primary');

    btn.type = 'secondary';

    expect(btn.getAttribute('type')).toBe('secondary');
    expect(btn.type).toBe('secondary');
    expect(btn.button.classList.contains('btn-secondary')).toBeTruthy();
    expect(btn.state.type).toBe('secondary');

    btn.type = 'tertiary';

    expect(btn.getAttribute('type')).toBe('tertiary');
    expect(btn.type).toBe('tertiary');
    expect(btn.button.classList.contains('btn-tertiary')).toBeTruthy();
    expect(btn.state.type).toBe('tertiary');

    // Default buttons don't have additional styles
    btn.type = 'default';

    expect(btn.getAttribute('type')).toBe(null);
    expect(btn.type).toBe('default');
    expect(btn.button.classList.contains('default')).toBeFalsy();
    expect(btn.state.type).toBe('default');

    // Setting a bad type will make the type become the "default"
    btn.type = 'not-real';

    expect(btn.getAttribute('type')).toBe(null);
    expect(btn.type).toBe('default');
    expect(btn.button.classList.contains('default')).toBeFalsy();
    expect(btn.state.type).toBe('default');
  });

  it('can change its text via attribute', () => {
    expect(btn.text).toEqual('Test Button');
    expect(btn.state.text).toEqual('Test Button');

    btn.text = 'Awesome';

    expect(btn.text).toEqual('Awesome');
    expect(btn.state.text).toEqual('Awesome');

    btn.text = '';

    expect(btn.text).toEqual('');
    expect(btn.state.text).toEqual('');
  });

  it('can add/remove its icon', () => {
    btn.icon = 'settings';

    expect(btn.getAttribute('icon')).toBe('settings');
    expect(btn.icon).toBe('settings');
    expect(btn.querySelector('ids-icon').icon).toBe('settings');

    btn.icon = '';

    expect(btn.hasAttribute('icon')).toBeFalsy();
    expect(btn.icon).not.toBeDefined();
    expect(btn.querySelector('ids-icon')).toBe(null);
  });

  it('can align its icon differently', () => {
    btn.icon = 'settings';
    btn.iconAlign = 'end';

    expect(btn.button.classList.contains('align-icon-end')).toBeTruthy();

    btn.iconAlign = 'start';

    expect(btn.button.classList.contains('align-icon-start')).toBeTruthy();

    // Can't set a bad one
    btn.iconAlign = 'fish';

    expect(btn.button.classList.contains('align-icon-start')).toBeTruthy();
    expect(btn.button.classList.contains('align-icon-fish')).toBeFalsy();
  });

  it('can be an "icon-only" button', () => {
    btn.icon = 'settings';
    btn.text = '';

    expect(btn.getAttribute('icon')).toBe('settings');
    expect(btn.icon).toBe('settings');
    expect(btn.querySelector('ids-icon').icon).toBe('settings');
    expect(btn.button.classList.contains('ids-icon-button')).toBeTruthy();
    expect(btn.button.classList.contains('ids-button')).toBeFalsy();
  });

  it('can reliably set the "square" attribute', () => {
    btn.icon = 'settings';
    btn.square = true;

    expect(btn.hasAttribute('square')).toEqual(true);
    expect(btn.square).toEqual(true);

    btn.square = false;
    expect(btn.hasAttribute('square')).toEqual(false);
    expect(btn.square).toEqual(false);
  });

  it('can rerender', () => {
    btn.text = 'New';
    btn.icon = 'check';
    btn.disabled = true;
    btn.tabIndex = -1;
    btn.type = 'secondary';
    btn.cssClass = ['awesome'];
    btn.iconAlign = 'end';

    expect(btn.text).toEqual('New');
  });

  it('can set width', () => {
    // with pixels
    const pixelWidth = '200px';
    btn.width = pixelWidth;
    expect(btn.width).toEqual(pixelWidth);
    expect(btn.style.width).toEqual('');
    expect(btn.button.style.width).toEqual(pixelWidth);

    // with percentage
    const percentWidth = '90%';
    btn.width = percentWidth;
    expect(btn.width).toEqual(percentWidth);
    expect(btn.style.width).toEqual(percentWidth);
    expect(btn.button.style.width).toEqual('');

    // reset
    btn.width = '';
    expect(btn.button.style.width).toEqual('');
  });

  it('can set hidden', () => {
    expect(btn.hidden).toEqual(false);
    expect(btn.getAttribute('hidden')).toBeFalsy();
    btn.hidden = true;
    expect(btn.getAttribute('hidden')).toEqual('');
    expect(btn.hidden).toEqual(true);
    btn.hidden = false;
    expect(btn.getAttribute('hidden')).toBeFalsy();
    expect(btn.hidden).toEqual(false);
  });

  it('can set noMargins', () => {
    expect(btn.noMargins).toBeFalsy();
    btn.noMargins = true;
    expect(btn.getAttribute('no-margins')).toEqual('');
    expect(btn.noMargins).toEqual(true);
    btn.noMargins = false;
    expect(btn.getAttribute('no-margins')).toBeFalsy();
    expect(btn.noMargins).toEqual(false);
  });

  it('can get the icon element', () => {
    btn.icon = 'add';
    expect(btn.iconEl.nodeName).toEqual('IDS-ICON');
  });

  it('supports setting mode', () => {
    btn.mode = 'dark';
    expect(btn.container.getAttribute('mode')).toEqual('dark');
  });

  it('supports setting version', () => {
    btn.version = 'classic';
    expect(btn.container.getAttribute('version')).toEqual('classic');
  });

  it('supports setting color variants', async () => {
    await expectEnumAttributeBehavior({
      elem: btn,
      attribute: 'color-variant',
      values: ['alternate'],
      defaultValue: null
    });
  });
});