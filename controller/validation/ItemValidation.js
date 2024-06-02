// ------regex for text fields-----
const ITEM_CODE_REGEX = /^I\d{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX =/^[0-9]{2,}([.][0-9]{2})?$/;
const ITEM_QUANTITY_REGEX = /^\d+(\.\d+)?/;