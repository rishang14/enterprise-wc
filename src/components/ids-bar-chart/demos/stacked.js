import IdsBarChart from '../ids-bar-chart';
import componentsJSON from '../../../assets/data/components.json';

// eslint-disable-next-line no-unused-vars
const lineData2 = [{
  data: [{
    name: 'Jan',
    value: 1
  }, {
    name: 'Feb',
    value: 2
  }, {
    name: 'Mar',
    value: 3
  }, {
    name: 'Apr',
    value: 5
  }, {
    name: 'May',
    value: 7
  }, {
    name: 'Jun',
    value: 10
  }],
  name: 'Component A',
  shortName: 'Comp A',
  abbreviatedName: 'A',
}];

const url = componentsJSON;
const setData = async () => {
  const res = await fetch(url);
  const data = await res.json();

  const chart = document.querySelector('#index-example');
  if (chart) {
    chart.data = data;
  }
};

setData();
