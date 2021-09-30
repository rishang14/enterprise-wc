/**
 * @jest-environment jsdom
 */
import '../helpers/resize-observer-mock';

import IdsColorPicker from '../../src/components/ids-color-picker/ids-color-picker';

describe('Ids Color Picker Component', () => {
  let colorpicker;

  const createFromTemplate = (innerHTML) => {
    colorpicker?.remove();
    const template = document.createElement('template');
    template.innerHTML = innerHTML;
    colorpicker = template.content.childNodes[0];
    document.body.appendChild(colorpicker);
    return colorpicker;
  };

  beforeEach(async () => {
    colorpicker = new IdsColorPicker();
    document.body.appendChild(colorpicker);
  });

  afterEach(async () => {
    document.body.innerHTML = '';
    colorpicker = null;
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');
    colorpicker.remove();
    const elem = new IdsColorPicker();
    document.body.appendChild(elem);
    expect(document.querySelectorAll('ids-color-picker').length).toEqual(1);
    expect(errors).not.toHaveBeenCalled();
    elem.remove();
  });

  it('renders with readonly', () => {
    colorpicker = createFromTemplate(`<ids-color-picker id="color-picker-1" readonly="true" value="#941E1E" label="Readonly Color Picker"></ids-color-picker>`);
    expect(colorpicker.readonly).toBeTruthy();
  });

  it('renders with disabled', () => {
    colorpicker = createFromTemplate(`<ids-color-picker id="color-picker-1" disabled="true" value="#941E1E" label="Readonly Color Picker"></ids-color-picker>`);
    expect(colorpicker.disabled).toBeTruthy();
  });

  it('renders with advanced', () => {
    colorpicker = createFromTemplate(`<ids-color-picker id="color-picker-1" advanced="true" value="#941E1E" label="Readonly Color Picker"></ids-color-picker>`);
    expect(colorpicker.advanced).toBeTruthy();
  });

  it('has a value attribute', () => {
    colorpicker.value = '#000000';
    expect(colorpicker.getAttribute('value')).toEqual('#000000');
    colorpicker.value = '';
    expect(colorpicker.getAttribute('value')).toEqual('#000000');
  });

  it('has a disabled attribute', () => {
    colorpicker.disabled = false;
    expect(colorpicker.getAttribute('disabled')).toEqual(null);

    colorpicker.disabled = true;
    expect(colorpicker.getAttribute('disabled')).toEqual('true');
  });

  it('has a readonly attribute', () => {
    colorpicker.readonly = false;
    expect(colorpicker.getAttribute('readonly')).toBeFalsy();

    colorpicker.readonly = true;
    expect(colorpicker.getAttribute('readonly')).toEqual('true');
  });

  it('has a label attribute', () => {
    colorpicker.label = 'Ids Color Picker';
    expect(colorpicker.getAttribute('label')).toEqual('Ids Color Picker');
  });
});
