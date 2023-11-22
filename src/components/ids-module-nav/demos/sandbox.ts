import '../../ids-accordion/ids-accordion';
import '../../ids-accordion/ids-accordion-section';
import '../../ids-accordion/ids-accordion-header';
import '../../ids-accordion/ids-accordion-panel';
import '../../ids-button/ids-button';
import '../../ids-checkbox/ids-checkbox';
import '../../ids-dropdown/ids-dropdown';
import '../../ids-dropdown/ids-dropdown-list';
import '../../ids-header/ids-header';
import '../../ids-list-box/ids-list-box';
import '../../ids-list-box/ids-list-box-option';
import '../../ids-search-field/ids-search-field';
import '../../ids-toolbar/ids-toolbar';
import '../../ids-toolbar/ids-toolbar-section';

import type { IdsModuleNavDisplayMode } from '../ids-module-nav-common';

let menuState: IdsModuleNavDisplayMode = 'collapsed';

let doOffsetContent = true;

document.addEventListener('DOMContentLoaded', async () => {
  const moduleNav: any = document.querySelector('ids-module-nav');
  const moduleNavContent: any = document.querySelector('ids-module-nav-content');
  const moduleNavDrawer: any = document.querySelector('ids-module-nav-bar');
  const moduleNavAccordion: any = document.querySelector('ids-accordion');
  const appMenuTriggerBtn: any = document.querySelector('#module-nav-trigger');
  const displayModeDropdown: any = document.querySelector('#dd-display-mode-setting');
  const accordionOnePaneCheck: any = document.querySelector('#one-accordion-pane');
  const filterableCheck: any = document.querySelector('#is-filterable');
  const responsiveCheck: any = document.querySelector('#is-responsive');
  const pinSectionsCheck: any = document.querySelector('#pin-sections');
  const useOffsetCheck: any = document.querySelector('#use-offset-content');

  moduleNavDrawer.target = appMenuTriggerBtn;

  const updateDisplayMode = (val: IdsModuleNavDisplayMode) => {
    if (menuState !== val) {
      menuState = val;
      moduleNav.displayMode = val;
      if (displayModeDropdown.value !== val) displayModeDropdown.value = val;
      console.info('Module Nav Display Mode Updated:', val || 'hidden');
    }
  };

  // ============================
  // Setup events

  moduleNavDrawer.addEventListener('selected', (e: CustomEvent) => {
    const target = (e.target as HTMLElement);
    if (target.tagName === 'IDS-DROPDOWN') {
      console.info(`Role "${(e.detail.selectedElem as any).textContent.trim()}" was selected.`);
    }
    if (target.tagName === 'IDS-MODULE-NAV-ITEM') {
      console.info(`Module Nav Item "${(e.target as any).textContent.trim()}" was selected.`);
    }
  });

  appMenuTriggerBtn.addEventListener('click', () => {
    const alternateMode = moduleNav.isWithinMobileBreakpoint() ? false : 'collapsed';
    updateDisplayMode(menuState === 'expanded' ? alternateMode : 'expanded');
  });

  accordionOnePaneCheck.addEventListener('change', (e: CustomEvent) => {
    moduleNavAccordion.allowOnePane = e.detail.checked;
  });

  displayModeDropdown.addEventListener('change', () => {
    let selectedValue = displayModeDropdown.value;
    if (selectedValue === '') selectedValue = false;
    updateDisplayMode(selectedValue);
  });

  filterableCheck.addEventListener('change', (e: CustomEvent) => {
    moduleNavDrawer.filterable = e.detail.checked;
  });

  pinSectionsCheck.addEventListener('change', (e: CustomEvent) => {
    moduleNavDrawer.pinned = e.detail.checked;
  });

  responsiveCheck.addEventListener('change', (e: CustomEvent) => {
    const useResponsive = e.detail.checked;
    moduleNav.responsive = useResponsive;
    displayModeDropdown.disabled = useResponsive;

    useOffsetCheck.disabled = useResponsive;
    useOffsetCheck.value = useResponsive ? true : doOffsetContent;
  });

  useOffsetCheck.addEventListener('change', (e: CustomEvent) => {
    doOffsetContent = e.detail.checked;
    moduleNavContent.offsetContent = doOffsetContent;
  });

  moduleNav.addEventListener('displaymodechange', (e: CustomEvent) => {
    const newMenuState = e.detail.displayMode;
    console.info('Module Nav "displaymodechange" event handled: ', newMenuState);
    if (newMenuState !== menuState) {
      updateDisplayMode(newMenuState);
    }
  });

  // =============================
  // Set initial

  moduleNav.displayMode = menuState;
  moduleNav.responsive = true;
  moduleNavContent.offsetContent = doOffsetContent;
  moduleNavDrawer.filterable = true;
});