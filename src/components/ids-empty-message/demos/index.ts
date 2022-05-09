// Supporting components
import '../ids-empty-message';
import '../../ids-card/ids-card';
import '../../ids-toast/ids-toast';
import '../../ids-button/ids-button';

// Listing Page
import '../../ids-demo-app/ids-demo-listing';
import indexYaml from './index.yaml';

const demoListing: any = document.querySelector('ids-demo-listing');
if (demoListing) {
  demoListing.data = indexYaml.examples;
}
