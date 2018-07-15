import message from './message';
import './index.scss';
import Images from './assets/images/icon_2.jpg'
import SearchComponent from './SeachComponent.js'
import searchIcon from './images/icon_2.svg';
var renderData = new SearchComponent();
document.getElementById('seach-icon').src = searchIcon;
renderData.renderData();