const { iconNames, categoryMainColors, categoryMainBorderColors } = require("../temp-helpers/categories");

const isTypeString = (value) => {
  return typeof value === 'string';
}

class CategoryDO {
  constructor(data){
    if(!data) throw new Error('Invalid Category Data');
    const { name, icon_name, color_main, color_border } = data;
    // TODO: throw error if there is more data then required
    this.#validate(name, icon_name?.iconName, color_main, color_border);
  }
  
  #validate = (name, iconName, colorMain, colorBorder) => {
    this.#validateName(name);
    this.#validateIconName(iconName);
    this.#validateColorMain(colorMain);
    this.#validateColorBorder(colorBorder);
  }
  
  #validateName = (name) => {
    if(!isTypeString(name)) throw new Error('Invalid name type');
    if(name.length === 0 ) throw new Error('Invalid name length');
    this.name = name;
  }
  
  #validateIconName = (iconName) => {
    if(!isTypeString(iconName)) throw new Error('Invalid icon name type');
    if(!iconNames.includes(iconName)) throw new Error('Invalid icon name');
    this.iconName = iconName;
  }
  
  #validateColorMain = (colorMain) => {
    if(!isTypeString(colorMain)) throw new Error('Invalid main color type');
    if(!categoryMainColors.includes(colorMain)) throw new Error('Invalid main color');
    this.colorMain = colorMain;
  }
  
  #validateColorBorder = (colorBorder) => {
    if(!isTypeString(colorBorder)) throw new Error('Invalid border color type');
    if(!categoryMainBorderColors.includes(colorBorder)) throw new Error('Invalid border color');
    this.colorBorder = colorBorder;
  }
}

module.exports = { CategoryDO };