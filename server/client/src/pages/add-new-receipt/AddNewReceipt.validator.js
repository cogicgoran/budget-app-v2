export function isReceiptInfoValid(info) {
  const { marketplace, date, currency} = info;
  if ( typeof marketplace === 'string' 
  && typeof date === 'string' 
  && typeof currency === 'string'
  && marketplace.length > 0
  && date.length > 0
  && currency.length > 0
  && isFinite(new Date(date))) {
    return true;
  }
  return false;
}
