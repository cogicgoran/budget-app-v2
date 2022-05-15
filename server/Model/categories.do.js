const InvalidCategoryColorBorder = require("../Exceptions/categories/InvalidCategoryColorBorder");
const InvalidCategoryColorMain = require("../Exceptions/categories/InvalidCategoryColorMain");
const InvalidCategoryIconException = require("../Exceptions/categories/InvalidCategoryIconException");
const InvalidCategoryNameTypeException = require("../Exceptions/categories/InvalidCategoryNameTypeException");
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
    if(!isTypeString(name)) throw new InvalidCategoryNameTypeException();
    if(name.length === 0 ) throw new InvalidCategoryNameTypeException();
    this.name = name;
  }
  
  #validateIconName = (iconName) => {
    if(!isTypeString(iconName)) throw new InvalidCategoryIconException();
    if(!iconNames.includes(iconName)) throw new InvalidCategoryIconException();
    this.iconName = iconName;
  }
  
  #validateColorMain = (colorMain) => {
    if(!isTypeString(colorMain)) throw new InvalidCategoryColorMain();
    if(!categoryMainColors.includes(colorMain)) throw new InvalidCategoryColorMain();
    this.colorMain = colorMain;
  }
  
  #validateColorBorder = (colorBorder) => {
    if(!isTypeString(colorBorder)) throw new InvalidCategoryColorBorder();
    if(!categoryMainBorderColors.includes(colorBorder)) throw new InvalidCategoryColorBorder();
    this.colorBorder = colorBorder;
  }
}

module.exports = { CategoryDO };